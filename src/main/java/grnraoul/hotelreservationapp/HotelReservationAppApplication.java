package grnraoul.hotelreservationapp;

import grnraoul.hotelreservationapp.model.Hotel;
import grnraoul.hotelreservationapp.model.HotelUser;
import grnraoul.hotelreservationapp.model.Role;
import grnraoul.hotelreservationapp.repository.HotelRepository;
import grnraoul.hotelreservationapp.repository.HotelUserRepository;
import grnraoul.hotelreservationapp.repository.RoleRepository;
import grnraoul.hotelreservationapp.service.AuthenticationService;
import grnraoul.hotelreservationapp.service.DataService;
import grnraoul.hotelreservationapp.service.GeolocationService;
import grnraoul.hotelreservationapp.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class HotelReservationAppApplication {

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    @Autowired
    TokenService tokenService;

    public static void main(String[] args) {

         SpringApplication.run(HotelReservationAppApplication.class, args);





    }
    @Bean
    CommandLineRunner run(RoleRepository roleRepository, HotelUserRepository userRepository, PasswordEncoder passwordEncode){
        return args ->{
            if (roleRepository.findByAuthority("ADMIN").isPresent()) return;

            Role adminRole = roleRepository.save(new Role("ADMIN"));
            roleRepository.save(new Role("USER"));

            Set<Role> roles = new HashSet<>();
            roles.add(adminRole);

            HotelUser admin = new HotelUser();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("passwordP1."));
            admin.setEmail("admin@example.com");
            admin.setAuthorities(roles);

            userRepository.save(admin);


            Authentication auth = new UsernamePasswordAuthenticationToken(admin, null, admin.getAuthorities());
            String token = tokenService.generateJwt(auth);

        };
    }
}
