import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../util/AuthContext";
import { Button } from "react-bootstrap";
import FeedbackForm from "../feedbackForm/FeedBackForm";
import { GoogleMap, Marker } from "@react-google-maps/api";

const BookRoom = () => {
  const { hotelId } = useParams();
  const [rooms, setRooms] = useState([]);
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});
  const [roomErrors, setRoomErrors] = useState({});
  const [roomSuccesses, setRoomSuccesses] = useState({});
  const [comments, setComments] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchRooms = async () => {
      const tokenData = JSON.parse(localStorage.getItem("token"));
      const token = tokenData ? tokenData.jwt : null;

      if (!token) {
        setRoomErrors({ global: "No token found. Please log in." });
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/hotels/${hotelId}/rooms`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRooms(response.data);
      } catch (error) {
        setRoomErrors({ global: "Failed to fetch rooms" });
      }
    };

    fetchRooms();
  }, [hotelId]);

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
        setRoomErrors({ global: "Error fetching hotel data" });
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [hotelId]);

  const handleInputChange = (e, roomId) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [roomId]: {
        ...formData[roomId],
        [name]: value,
      },
    });
  };

  const handleSubmit = async (roomId) => {
    const tokenData = JSON.parse(localStorage.getItem("token"));
    const token = tokenData ? tokenData.jwt : null;

    if (!token) {
      setRoomErrors({
        ...roomErrors,
        [roomId]: "No token found. Please log in.",
      });
      return;
    }

    const now = new Date();
    const checkInDate = new Date(formData[roomId]?.checkInTime);
    const checkOutDate = new Date(formData[roomId]?.checkOutTime);

    if (checkInDate <= now || checkOutDate <= now) {
      setRoomErrors({
        ...roomErrors,
        [roomId]: "Check-in and check-out times must be in the future",
      });
      return;
    }

    const formattedCheckInTime = formatDate(formData[roomId]?.checkInTime);
    const formattedCheckOutTime = formatDate(formData[roomId]?.checkOutTime);

    try {
      await axios.post(
        `http://localhost:8080/reservations/book?roomId=${roomId}&username=${user}&hotelId=${hotelId}&checkInTime=${formattedCheckInTime}&checkOutTime=${formattedCheckOutTime}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRoomSuccesses({
        ...roomSuccesses,
        [roomId]: "Room booked successfully",
      });
      setRooms((prevRooms) =>
        prevRooms.map((room) =>
          room.id === roomId ? { ...room, isAvailable: false } : room
        )
      );
    } catch (error) {
      console.error("Booking error:", error);
      setRoomErrors({ ...roomErrors, [roomId]: "Failed to book room" });
    }
  };

  const formatDate = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="p-4 rounded ml-20 -translate-y-40 md:-translate-x-10 -translate-x-20 shadow-md text-orange-400 bg-custom-gray">
      {hotel && (
        <div className="bg-custom-blue shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-center text-orange-400 mb-4">
            {hotel.name}
          </h1>
          <p className="text-gray-600 font-bold mb-6"></p>
          {hotel.latitude && hotel.longitude && (
            <div id="map" className="border-4 border-slate-500">
              <GoogleMap
                className=""
                mapContainerStyle={{ width: "100%", height: "400px" }}
                center={{
                  lat: parseFloat(hotel.latitude),
                  lng: parseFloat(hotel.longitude),
                }}
                zoom={15}
                color={"primary"}
              >
                <Marker
                  position={{
                    lat: parseFloat(hotel.latitude),
                    lng: parseFloat(hotel.longitude),
                  }}
                  label={hotel.name}
                />
              </GoogleMap>
            </div>
          )}
          <div className="m-4 p-2 sm:p-5 sm:m-6">
            <p className="text-custom-light-gray">Reviews:</p>
            {hotel.feedbacks && (
              <div>
                {hotel.feedbacks.map((feedbacks) => (
                  <ul
                    key={feedbacks.id}
                    className="border-1 rounded-xl p-2 border-custom-gray m-2"
                  >
                    <li className="text-custom-light-gray">
                      User:{" "}
                      <span className="text-orange-400">
                        {feedbacks.username}
                      </span>
                    </li>
                    <hr />
                    <li className="text-custom-light-gray">
                      Comment: {feedbacks.comment}
                    </li>
                  </ul>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {rooms.map((room) => (
        <div
          key={room.id}
          className="border-custom-blue bg-custom-gray text-orange-300 rounded-3xl border-2 p-5 mt-5"
        >
          <p className="font-bold text-3xl underline mb-2">
            Room Number: {room.id}
          </p>
          <p>Room Type: {room.type}</p>
          <p>Price: €{room.price}</p>
          <p>{room.isAvailable ? "Available" : "Unavailable"}</p>
          {room.isAvailable && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(room.id);
              }}
            >
              <label htmlFor={`checkInTime-${room.id}`} className="block mt-4">
                Check-in Time:
                <input
                  type="datetime-local"
                  id={`checkInTime-${room.id}`}
                  name="checkInTime"
                  value={formData[room.id]?.checkInTime || ""}
                  onChange={(e) => handleInputChange(e, room.id)}
                  className="w-full p-2 border text-black border-gray-300 rounded"
                  required
                />
              </label>
              <label htmlFor={`checkOutTime-${room.id}`} className="block mt-4">
                Check-out Time:
                <input
                  type="datetime-local"
                  id={`checkOutTime-${room.id}`}
                  name="checkOutTime"
                  value={formData[room.id]?.checkOutTime || ""}
                  onChange={(e) => handleInputChange(e, room.id)}
                  className="w-full p-2 border  text-black border-gray-300 rounded"
                  required
                />
              </label>
              <div className="flex justify-center align-middle">
                <Button
                  type="submit"
                  variant="dark"
                  className="mt-5 bg-orange-400 w-40"
                >
                  Book Now
                </Button>
              </div>
            </form>
          )}
          {roomSuccesses[room.id] && (
            <div className="text-green-500 mt-4">{roomSuccesses[room.id]}</div>
          )}
          {roomErrors[room.id] && (
            <div className="text-red-500 mt-4">{roomErrors[room.id]}</div>
          )}
        </div>
      ))}
      <FeedbackForm hotelId={hotelId} />
      {roomErrors.global && (
        <div className="text-red-500 mt-4">{roomErrors.global}</div>
      )}
    </div>
  );
};

export default BookRoom;
