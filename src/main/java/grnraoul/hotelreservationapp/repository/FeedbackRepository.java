package grnraoul.hotelreservationapp.repository;

import grnraoul.hotelreservationapp.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepository extends JpaRepository<Feedback, Integer> {

}
