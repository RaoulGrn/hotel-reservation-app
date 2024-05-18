package grnraoul.hotelreservationapp.service;

import grnraoul.hotelreservationapp.model.Hotel;
import grnraoul.hotelreservationapp.model.Room;
import grnraoul.hotelreservationapp.repository.HotelRepository;
import grnraoul.hotelreservationapp.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HotelService {

    @Autowired
    HotelRepository hotelRepository;

    @Autowired
    RoomRepository roomRepository;

    public HotelService(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }

    public Hotel getHotelById(Integer id) {
        return hotelRepository.findById(id).orElse(null);
    }

    public Hotel saveHotel(Hotel hotel) {
        return hotelRepository.save(hotel);
    }

    public void deleteHotel(Integer id) {
        hotelRepository.deleteById(id);
    }

    public Hotel addRoomToHotel(Hotel hotel, Integer roomId) {
        Room room = roomRepository.findById(roomId).orElse(null);
        hotel.addRoom(room);
        return hotelRepository.save(hotel);
    }
}
