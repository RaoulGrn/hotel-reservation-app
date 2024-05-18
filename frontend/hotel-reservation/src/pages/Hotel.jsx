import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Hotel = () => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id: hotelId } = useParams();

  useEffect(() => {
    const fetchHotel = async () => {
      const token = JSON.parse(localStorage.getItem("token")).jwt || null;
      try {
        const response = await axios.get(
          `http://localhost:8080/hotels/${hotelId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHotel(response.data);
      } catch (error) {
        setError("Error fetching hotel data");
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [hotelId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      {hotel && (
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-4">{hotel.name}</h1>
          <p className="text-gray-600 mb-6">
            Location: {hotel.latitude}, {hotel.longitude}
          </p>
          <h2 className="text-2xl font-semibold mb-2">Rooms</h2>
          <ul className="space-y-4 mb-6">
            {hotel.rooms.map((room) => (
              <li key={room.id} className="p-4 border rounded-lg bg-gray-50">
                <p className="font-semibold">Room Number: {room.id}</p>
                <p>Type: {room.type}</p>
                <p>Price: ${room.price}</p>
                <p>Available: {room.available ? "Yes" : "No"}</p>
              </li>
            ))}
          </ul>
          <h2 className="text-2xl font-semibold mb-2">Feedbacks</h2>
          {hotel.feedbacks.length === 0 ? (
            <p className="text-gray-600">No feedbacks available</p>
          ) : (
            <ul className="space-y-4 mb-6">
              {hotel.feedbacks.map((feedback) => (
                <li key={feedback.id}>{feedback.comment}</li>
              ))}
            </ul>
          )}
          <h2 className="text-2xl font-semibold mb-2">Reservations</h2>
          {hotel.reservations.length === 0 ? (
            <p className="text-gray-600">No reservations available</p>
          ) : (
            <ul className="space-y-4 mb-6">
              {hotel.reservations.map((reservation) => (
                <li key={reservation.id}>
                  Room Number: {reservation.room.roomNumber}
                  <br />
                  Type: {reservation.room.type}
                  <br />
                  Price: ${reservation.room.price}
                  <br />
                  Check-in Time: {reservation.checkInTime}
                  <br />
                  Check-out Time: {reservation.checkOutTime}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default Hotel;
