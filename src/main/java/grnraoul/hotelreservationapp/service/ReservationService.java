package grnraoul.hotelreservationapp.service;

import grnraoul.hotelreservationapp.model.Hotel;
import grnraoul.hotelreservationapp.model.HotelUser;
import grnraoul.hotelreservationapp.model.Reservation;
import grnraoul.hotelreservationapp.model.Room;
import grnraoul.hotelreservationapp.repository.HotelRepository;
import grnraoul.hotelreservationapp.repository.HotelUserRepository;
import grnraoul.hotelreservationapp.repository.ReservationRepository;
import grnraoul.hotelreservationapp.repository.RoomRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private HotelUserService hotelUserService;

    @Autowired
    private RoomRepository roomRepository;

    public ResponseEntity<String> bookRoom(Integer roomId, String username, Integer hotelId, @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime checkInTime, @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime checkOutTime) {
        Optional<Room> optionalRoom = roomRepository.findById(roomId);

        if (optionalRoom.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Room room = optionalRoom.get();
        if (!room.isAvailable()) {
            return ResponseEntity.ok("Room is not available!");
        }

        LocalDateTime currentDateTime = LocalDateTime.now();
        if (checkInTime.isBefore(currentDateTime.plusHours(2))) {
            return ResponseEntity.badRequest().body("Cannot check in within two hours.");
        }

        room.setAvailable(false);
        roomRepository.save(room);

        HotelUser user = hotelUserService.getUserByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build(); // User not found
        }

        Reservation reservation = new Reservation();
        reservation.setRoom(room);
        reservation.setCheckInTime(checkInTime);
        reservation.setCheckOutTime(checkOutTime);
        reservation.setUser(user);
        reservation.setUsername(user.getUsername());

        Optional<Hotel> optionalHotel = hotelRepository.findById(hotelId);
        optionalHotel.ifPresent(reservation::setHotel);

        reservationRepository.save(reservation);

        return ResponseEntity.ok("Room booked successfully!");
    }

    public ResponseEntity<String> changeBookedRoom(Integer reservationId, Integer newRoomId, String username, @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime newCheckInTime, @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm") LocalDateTime newCheckOutTime) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(reservationId);
        Optional<Room> optionalNewRoom = roomRepository.findById(newRoomId);

        if (optionalReservation.isEmpty() || optionalNewRoom.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Reservation reservation = optionalReservation.get();
        Room newRoom = optionalNewRoom.get();

        LocalDateTime currentDateTime = LocalDateTime.now();
        if (newCheckInTime.isBefore(currentDateTime.plusHours(2))) {
            return ResponseEntity.badRequest().body("Cannot check in within two hours.");
        }

        if (!newRoom.isAvailable()) {
            return ResponseEntity.ok("New room is not available!");
        }

        if (newCheckInTime.isBefore(currentDateTime)) {
            return ResponseEntity.badRequest().body("Cannot change room for an ongoing reservation.");
        }

        reservation.getRoom().setAvailable(true);
        newRoom.setAvailable(false);
        reservation.setRoom(newRoom);
        reservation.setCheckInTime(newCheckInTime);
        reservation.setCheckOutTime(newCheckOutTime);

        HotelUser user = hotelUserService.getUserByUsername(username);
        if (user == null) {
            return ResponseEntity.notFound().build(); // User not found
        }

        reservation.setUser(user);

        reservationRepository.save(reservation);
        return ResponseEntity.ok("Room changed successfully!");
    }

    public ResponseEntity<String> cancelReservation(Integer reservationId) {
        Optional<Reservation> optionalReservation = reservationRepository.findById(reservationId);
        Optional<Hotel> optionalHotel = hotelRepository.findById(optionalReservation.get().getHotel().getId());
        Optional<Room> optionalRoom = roomRepository.findById(optionalReservation.get().getRoom().getId());
        if(optionalReservation.isPresent() && optionalHotel.isPresent() && optionalRoom.isPresent()) {
            Reservation reservation = optionalReservation.get();
            Hotel hotel = optionalHotel.get();
            Room room = optionalRoom.get();
            LocalDateTime twoHoursAhead = LocalDateTime.now().plusHours(2);
            if(reservation.getCheckInTime().isAfter(twoHoursAhead)) {
                reservationRepository.delete(reservation);
                hotel.setReservations(reservationRepository.findAll());
                room.setAvailable(true);

                return ResponseEntity.ok("Reservation cancelled successfully!");
            } else {
                return ResponseEntity.badRequest().body("Cannot cancel reservation within two hours of check-in.");
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }



}
