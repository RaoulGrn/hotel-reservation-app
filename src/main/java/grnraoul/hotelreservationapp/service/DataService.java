package grnraoul.hotelreservationapp.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import grnraoul.hotelreservationapp.model.Hotel;
import grnraoul.hotelreservationapp.model.Room;
import grnraoul.hotelreservationapp.repository.HotelRepository;
import grnraoul.hotelreservationapp.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.List;

@Service
public class DataService {
    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    public DataService(HotelRepository hotelRepository, RoomRepository roomRepository) {
        this.hotelRepository = hotelRepository;
        this.roomRepository = roomRepository;
    }

    public DataService(){}

    public void populateDatabaseFromJson(String jsonFilePath) {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            List<Hotel> hotels = objectMapper.readValue(new File(jsonFilePath), new TypeReference<List<Hotel>>() {});
            for (Hotel hotel : hotels) {
                Hotel savedHotel = hotelRepository.save(hotel);
                for (Room room : hotel.getRooms()) {
                    room.setHotel(savedHotel);
                    roomRepository.save(room);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}