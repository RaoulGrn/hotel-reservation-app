package grnraoul.hotelreservationapp.controller;

import grnraoul.hotelreservationapp.model.HotelUser;
import grnraoul.hotelreservationapp.model.LoginDTO;
import grnraoul.hotelreservationapp.model.LoginResponseDTO;
import grnraoul.hotelreservationapp.model.RegistrationDTO;
import grnraoul.hotelreservationapp.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public HotelUser registerUser(@RequestBody RegistrationDTO body){
        return authenticationService.registerUser(body.getUsername(), body.getPassword(), body.getEmail());
    }
    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody LoginDTO body){
        return authenticationService.loginUser(body.getUsername(),body.getPassword());
    }
}

