package grnraoul.hotelreservationapp.controller;

import grnraoul.hotelreservationapp.model.HotelUser;
import grnraoul.hotelreservationapp.service.HotelUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private HotelUserService userService;

    @GetMapping("/")
    public String helloAdminController(){
        return "Admin access level";
    }


    @GetMapping("/users")
        /* @PreAuthorize("hasRole('ROLE_USER')")*/
    List<HotelUser> getAllUsers() {
        return userService.getAllUsers();
    }
}