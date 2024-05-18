package grnraoul.hotelreservationapp.service;

import grnraoul.hotelreservationapp.model.Feedback;
import grnraoul.hotelreservationapp.model.Hotel;
import grnraoul.hotelreservationapp.repository.FeedbackRepository;
import grnraoul.hotelreservationapp.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private HotelRepository hotelRepository;

    public Feedback saveFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public void deleteFeedback(Integer feedbackId) {
        Optional<Feedback> feedbackOptional = feedbackRepository.findById(feedbackId);
        if (feedbackOptional.isPresent()) {
            Feedback feedback = feedbackOptional.get();
            feedbackRepository.delete(feedback);
            removeFeedbackFromHotel(feedback);
        }
    }

    private void removeFeedbackFromHotel(Feedback feedback) {
        Hotel hotel = feedback.getHotel();
        if (hotel != null) {
            hotel.getFeedbacks().remove(feedback);
            hotelRepository.save(hotel);
        }
    }
    public Optional<Feedback> getFeedbackById(Integer feedbackId) {
        return feedbackRepository.findById(feedbackId);
    }
}
