package grnraoul.hotelreservationapp.repository;

import grnraoul.hotelreservationapp.model.HotelUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HotelUserRepository extends JpaRepository<HotelUser, Long> {
    Optional<HotelUser> findByUsername(String username);
}
