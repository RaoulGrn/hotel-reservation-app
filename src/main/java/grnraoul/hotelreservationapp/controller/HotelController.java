package grnraoul.hotelreservationapp.controller;

import grnraoul.hotelreservationapp.model.Hotel;
import grnraoul.hotelreservationapp.model.Room;
import grnraoul.hotelreservationapp.repository.HotelRepository;
import grnraoul.hotelreservationapp.repository.RoomRepository;
import grnraoul.hotelreservationapp.service.GeolocationService;
import grnraoul.hotelreservationapp.service.HotelService;
import grnraoul.hotelreservationapp.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/hotels")
public class HotelController {
    @Autowired
    private GeolocationService geolocationService;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private RoomService roomService;

    @Autowired
    private HotelService hotelService;

    @PostMapping("/{hotelId}/rooms/add")
    public ResponseEntity<String> addRoomToHotel(@PathVariable Integer hotelId, @RequestBody Room room) {
        Hotel hotel = hotelService.getHotelById(hotelId);

        if(hotel != null){
            hotel.addRoom(room);
            room.setHotel(hotel);
            roomService.saveRoom(room);
            hotelService.saveHotel(hotel);
            return ResponseEntity.ok("Room added to hotel successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public List<Hotel> getAllHotels() {
        return hotelService.getAllHotels();
    }

    @GetMapping("/search")
    public List<Hotel> searchHotelsByRadius(@RequestParam double userLat, @RequestParam double userLon, @RequestParam double radius) {
        List<Hotel> allHotels = hotelService.getAllHotels();
        return geolocationService.findHotelsInRadius(userLat, userLon, radius, allHotels);
    }

    @GetMapping("/{hotelId}/rooms")
    public List<Room> getAvailableRooms(@PathVariable Integer hotelId) {
        Optional<Hotel> optionalHotel = hotelRepository.findById(hotelId);
        return optionalHotel.map(Hotel::getRooms).orElse(Collections.emptyList());
    }

    @GetMapping("/{hotelId}")
    public Hotel getHotel(@PathVariable Integer hotelId) {
        Hotel hotel = hotelService.getHotelById(hotelId);
        return hotel;
    }
}
