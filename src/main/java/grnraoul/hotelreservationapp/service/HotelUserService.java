package grnraoul.hotelreservationapp.service;

import grnraoul.hotelreservationapp.exception.UserNotFoundException;
import grnraoul.hotelreservationapp.model.*;
import grnraoul.hotelreservationapp.repository.HotelUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class HotelUserService implements UserDetailsService {

    @Autowired
    private HotelUserRepository hotelUserRepository;

    @Autowired
    private PasswordEncoder encoder;

    public HotelUserService(HotelUserRepository hotelUserRepository, PasswordEncoder encoder) {
        this.hotelUserRepository = hotelUserRepository;
        this.encoder = encoder;
    }

    public HotelUser getUserByUsername(String username) {
        return hotelUserRepository.findByUsername(username).orElse(null);
    }

    public List<HotelUser> getAllUsers() {
        return hotelUserRepository.findAll();
    }

    public HotelUser getUserById(long id) {
        return hotelUserRepository.findById(id).orElse(null);
    }

    public HotelUser newUser(HotelUser newUser){
        return hotelUserRepository.save(newUser);
    }

    public HotelUser updateUser(HotelUser newUser, Integer id){
        return hotelUserRepository.findById(Long.valueOf(id)).map(user -> {
            user.setUsername(newUser.getUsername());
            user.setEmail(newUser.getEmail());
            return hotelUserRepository.save(user);
        }).orElseThrow(()-> new UserNotFoundException(id));
    }

    public void deleteUser(long id) {
        hotelUserRepository.deleteById(id);
    }

    public List<Reservation> getUserReservations(long userId){
        HotelUser hotelUser = getUserById(userId);

       return new ArrayList<>(hotelUser.getReservations());

    }

    public List<Feedback> getUserFeedbacks(long userId){
        HotelUser hotelUser = getUserById(userId);
        return new ArrayList<>(hotelUser.getFeedbacks());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println("In the user details service");

        return hotelUserRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("user is not valid"));
    }


}
