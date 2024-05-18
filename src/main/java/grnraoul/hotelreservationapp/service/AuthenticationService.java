package grnraoul.hotelreservationapp.service;

import grnraoul.hotelreservationapp.model.*;
import grnraoul.hotelreservationapp.repository.HotelUserRepository;
import grnraoul.hotelreservationapp.repository.RoleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@Transactional
public class AuthenticationService {

  @Autowired
    private HotelUserRepository hotelUserRepository;

  @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private TokenService tokenService;

    public HotelUser registerUser(String username, String password, String email){
        String encodedPassword = passwordEncoder.encode(password);
        Role userRole = roleRepository.findByAuthority("USER").get();
        Set<Role> authorities = new HashSet<>();
        authorities.add(userRole);

        HotelUser newUser = hotelUserRepository.save(new HotelUser(0, username, encodedPassword,email,authorities));

        Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        String token = tokenService.generateJwt(auth);

        hotelUserRepository.save(newUser);
        return newUser;

    }

    public LoginResponseDTO loginUser(String username, String password){
        try{
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            String token = tokenService.generateJwt(auth);

            return new LoginResponseDTO(hotelUserRepository.findByUsername(username).get(), token);
        } catch (AuthenticationException e ){
            return new LoginResponseDTO(null, "");
        }
    }

}
