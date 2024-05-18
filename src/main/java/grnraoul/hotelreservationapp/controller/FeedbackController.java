package grnraoul.hotelreservationapp.controller;

import grnraoul.hotelreservationapp.model.Feedback;
import grnraoul.hotelreservationapp.model.Hotel;
import grnraoul.hotelreservationapp.model.HotelUser;
import grnraoul.hotelreservationapp.repository.FeedbackRepository;
import grnraoul.hotelreservationapp.service.FeedbackService;
import grnraoul.hotelreservationapp.service.HotelService;
import grnraoul.hotelreservationapp.service.HotelUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/feedbacks")
public class FeedbackController {
    @Autowired
    private FeedbackService feedbackService;

    @Autowired
    private HotelService hotelService;

    @Autowired
    private HotelUserService hotelUserService;

    @PostMapping("/add/{hotelId}/{userId}")
    public ResponseEntity<String> leaveFeedback(@PathVariable Integer hotelId, @PathVariable Long userId, @RequestBody Feedback feedback) {
        Hotel hotel = hotelService.getHotelById(hotelId);
        HotelUser user = hotelUserService.getUserById(userId);

        if (hotel == null || user == null) {
            return ResponseEntity.notFound().build(); // Return 404 if hotel or user not found
        }

        feedback.setHotel(hotel);
        feedback.setUser(user);
        feedback.setUsername(user.getUsername());

        feedbackService.saveFeedback(feedback);
        return ResponseEntity.ok("Feedback added successfully!");
    }

    @DeleteMapping("/delete/{userId}/{hotelId}/{feedbackId}")
    public ResponseEntity<String> deleteFeedback(@PathVariable Long userId, @PathVariable Integer hotelId, @PathVariable Integer feedbackId) {
        // Assuming you need user and hotel IDs for further validation or authorization checks
        Hotel hotel = hotelService.getHotelById(hotelId);
        HotelUser user = hotelUserService.getUserById(userId);

        if (hotel == null || user == null) {
            return ResponseEntity.notFound().build(); // Return 404 if hotel or user not found
        }

        Optional<Feedback> feedbackOptional = feedbackService.getFeedbackById(feedbackId);
        if (feedbackOptional.isPresent()) {
            Feedback feedback = feedbackOptional.get();
            feedbackService.deleteFeedback(feedbackId);
            return ResponseEntity.ok("Feedback deleted successfully!");
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
