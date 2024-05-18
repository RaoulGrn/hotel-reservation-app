package grnraoul.hotelreservationapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Feedback {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private String comment;
    private String username;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private HotelUser user;

    public Feedback(Long id, String comment, String username, Hotel hotel, HotelUser user) {
        this.id = id;
        this.comment = comment;
        this.username = username;
        this.hotel = hotel;
        this.user = user;
    }

    public Feedback() {

    }



    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public Integer getHotelId(){
        return hotel.getId();
    }

    public HotelUser getUser() {
        return user;
    }

    public void setUser(HotelUser user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
