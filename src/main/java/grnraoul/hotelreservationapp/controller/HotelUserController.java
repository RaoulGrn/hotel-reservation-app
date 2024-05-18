package grnraoul.hotelreservationapp.controller;

import grnraoul.hotelreservationapp.model.Feedback;
import grnraoul.hotelreservationapp.model.HotelUser;
import grnraoul.hotelreservationapp.model.Reservation;
import grnraoul.hotelreservationapp.service.HotelUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class HotelUserController {

    private PasswordEncoder encoder;

    @Autowired
    private HotelUserService hotelUserService;

    public HotelUserController(PasswordEncoder encoder, HotelUserService hotelUserService) {
        this.encoder = encoder;
        this.hotelUserService = hotelUserService;
    }

    @GetMapping("/all")
    public List<HotelUser> getAllUsers() {
        return hotelUserService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<HotelUser> getUserById(@PathVariable long id) {
        HotelUser user = hotelUserService.getUserById(id);
        return ResponseEntity.of(Optional.ofNullable(user));
    }

    @PostMapping("/adduser")
    HotelUser newUser(@RequestBody HotelUser newUser){
        newUser.setPassword(encoder.encode(newUser.getPassword()));
        return hotelUserService.newUser(newUser);
    }

    @PutMapping("/user/{id}")
    HotelUser updateUser(@RequestBody HotelUser newUser, @PathVariable Integer id){
        return hotelUserService.updateUser(newUser, id);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable long id) {
        hotelUserService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/reservations")
    public List<Reservation> getUserReservations(@PathVariable long id) {
        return hotelUserService.getUserReservations(id);
    }

    @GetMapping("/{id}/feedbacks")
    public List<Feedback> getUserFeedbacks(@PathVariable long id) {
        return hotelUserService.getUserFeedbacks(id);
    }
}