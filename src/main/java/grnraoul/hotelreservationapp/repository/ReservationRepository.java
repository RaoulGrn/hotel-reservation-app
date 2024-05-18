package grnraoul.hotelreservationapp.repository;

import grnraoul.hotelreservationapp.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReservationRepository extends JpaRepository<Reservation, Integer> {
}
