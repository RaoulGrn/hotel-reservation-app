package grnraoul.hotelreservationapp.controller;


import grnraoul.hotelreservationapp.model.*;
import grnraoul.hotelreservationapp.repository.HotelRepository;
import grnraoul.hotelreservationapp.repository.HotelUserRepository;
import grnraoul.hotelreservationapp.repository.ReservationRepository;
import grnraoul.hotelreservationapp.repository.RoomRepository;
import grnraoul.hotelreservationapp.service.HotelService;
import grnraoul.hotelreservationapp.service.HotelUserService;
import grnraoul.hotelreservationapp.service.ReservationService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @Autowired
    private HotelUserService hotelUserService;
    @Autowired
    private ReservationRepository reservationRepository;


    @PostMapping("/book")
    public ResponseEntity<String> bookRoom(@RequestParam Integer roomId, @RequestParam String username, @RequestParam Integer hotelId,@RequestParam LocalDateTime checkInTime,@RequestParam LocalDateTime checkOutTime) {
        return reservationService.bookRoom(roomId, username, hotelId, checkInTime, checkOutTime);
    }
    @PutMapping("/{reservationId}/change-room")
    public ResponseEntity<String> changeBookedRoom(@PathVariable Integer reservationId, @RequestParam Integer newRoomId, @RequestParam String username,@RequestParam LocalDateTime newCheckInTime,@RequestParam LocalDateTime newCheckOutTime ) {
        return reservationService.changeBookedRoom(reservationId, newRoomId, username, newCheckInTime, newCheckOutTime);
    }




    @DeleteMapping("/{reservationId}")
    public ResponseEntity<String> cancelReservation(@PathVariable Integer reservationId) {

        return reservationService.cancelReservation(reservationId);
    }

}
