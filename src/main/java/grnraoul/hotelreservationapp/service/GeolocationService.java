package grnraoul.hotelreservationapp.service;


import grnraoul.hotelreservationapp.model.Hotel;
import org.springframework.stereotype.Service;
import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.util.ArrayList;
import java.util.List;

@Service
public class GeolocationService {




    public static final double AVERAGE_RADIUS_OF_EARTH_KM = 6371;




    public double calculateDistance(double userLat, double userLon, double hotelLat, double hotelLon) {
        double latDistance = Math.toRadians(userLat - hotelLat);
        double lonDistance = Math.toRadians(userLon - hotelLon);
        double haversineValue = Math.sin(latDistance / 2) * Math.sin(latDistance / 2) + Math.cos(Math.toRadians(userLat)) * Math.cos(Math.toRadians(hotelLat)) * Math.sin(lonDistance/2) * Math.sin(lonDistance / 2);
        double angularDistance = 2 * Math.atan2(Math.sqrt(haversineValue), Math.sqrt(1 - haversineValue));
        return AVERAGE_RADIUS_OF_EARTH_KM * angularDistance;
    }

    public List<Hotel> findHotelsInRadius(double userLat, double userLon, double radius, List<Hotel> allHotels){
        ArrayList<Hotel> nearbyHotels = new ArrayList<>();
        for(Hotel hotel : allHotels){
            double distance = calculateDistance(userLat, userLon, hotel.getLatitude(), hotel.getLongitude());
            if(distance <= radius){
                nearbyHotels.add(hotel);
            }
        }
        return nearbyHotels;
    }
}
