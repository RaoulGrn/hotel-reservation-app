package grnraoul.hotelreservationapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
public class Room {
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Integer id;

    private int roomNumber;

    private RoomType type;

    private double price;

    @JsonProperty("isAvailable")
    private boolean isAvailable;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name="hotel_id")
    private Hotel hotel;

    public Room(Integer id, int roomNumber, RoomType type, double price, boolean isAvailable, Hotel hotel) {
        this.id = id;
        this.roomNumber = roomNumber;
        this.type = type;
        this.price = price;
        this.isAvailable = isAvailable;
        this.hotel = hotel;

    }

    public Room() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getRoomNumber() {
        return roomNumber;
    }

    public void setRoomNumber(int roomNumber) {
        this.roomNumber = roomNumber;
    }

    public RoomType getType() {
        return type;
    }

    public void setType(RoomType type) {
        this.type = type;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean isAvailable) {
        this.isAvailable = isAvailable;
    }

    public Hotel getHotel() {
        return hotel;
    }

    public void setHotel(Hotel hotel) {
        this.hotel = hotel;
    }

    public void setHotelId(Integer hotelId) {
        if (this.hotel == null) {
            this.hotel = new Hotel(); // Instantiate hotel if null
        }
        this.hotel.setId(hotelId);
    }
}
