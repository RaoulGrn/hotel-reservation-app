package grnraoul.hotelreservationapp.controller;

import grnraoul.hotelreservationapp.model.Room;
import grnraoul.hotelreservationapp.repository.RoomRepository;
import grnraoul.hotelreservationapp.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
   private RoomService roomService;

    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping("/all")
    public List<Room> getAllRooms(){

        return roomService.getAllRooms();
    }

    @GetMapping("/{roomId}")
    public Room getRoomById(@PathVariable Integer roomId) {
        return roomService.getRoomById(roomId);
    }

    @PostMapping("/add")
    public Room addRoom(@RequestBody Room room) {
        return roomService.saveRoom(room);
    }

    @DeleteMapping("/{roomId}")
    public void deleteRoom(@PathVariable Integer roomId) {
        roomService.deleteRoom(roomId);
    }
}
