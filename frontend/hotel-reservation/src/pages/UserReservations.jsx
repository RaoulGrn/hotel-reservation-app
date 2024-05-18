import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../util/AuthContext";

const UserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const userId = JSON.parse(localStorage.getItem("token")).user.id || null;
  const [editingReservationId, setEditingReservationId] = useState(null);
  const [formData, setFormData] = useState({
    newRoomId: "",
    newCheckInTime: "",
    newCheckOutTime: "",
  });

  useEffect(() => {
    const fetchReservations = async () => {
      const token = JSON.parse(localStorage.getItem("token")).jwt || null;
      try {
        const response = await axios.get(
          `http://localhost:8080/users/${userId}/reservations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReservations(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching reservations. Please try again later.");
        setLoading(false);
      }
    };

    fetchReservations();
  }, [userId]);

  const handleDelete = async (reservationId) => {
    const token = JSON.parse(localStorage.getItem("token")).jwt || null;
    try {
      await axios.delete(
        `http://localhost:8080/reservations/${reservationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReservations(
        reservations.filter((reservation) => reservation.id !== reservationId)
      );
    } catch (error) {
      setError("Error deleting reservation. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (reservationId) => {
    const token = JSON.parse(localStorage.getItem("token")).jwt || null;
    const formattedCheckInTime = formatDate(formData.newCheckInTime);
    const formattedCheckOutTime = formatDate(formData.newCheckOutTime);

    try {
      await axios.put(
        `http://localhost:8080/reservations/${reservationId}/change-room?newRoomId=${formData.newRoomId}&username=${user}&newCheckInTime=${formattedCheckInTime}&newCheckOutTime=${formattedCheckOutTime}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditingReservationId(null);
      // Refresh reservations
      const response = await axios.get(
        `http://localhost:8080/users/${userId}/reservations`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReservations(response.data);
    } catch (error) {
      setError("Error changing reservation. Please try again later.");
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container vh-100 md:mx-auto md:p-6 p-28 mx-auto -translate-x-5 sm:m-6  ">
      <h1 className="text-3xl font-bold mb-4 text-orange-500">
        User Reservations
      </h1>
      {reservations.length === 0 ? (
        <div className="text-custom-light-gray">No reservations found.</div>
      ) : (
        <ul className="space-y-4 mb-6">
          {reservations.map((reservation) => (
            <li
              key={reservation.id}
              className="p-4 border rounded-lg bg-custom-light-gray"
            >
              <div className="mb-4">
                <p className="font-semibold">
                  Room Number: {reservation.room && reservation.room.id}
                </p>
                <p>Type: {reservation.room && reservation.room.type}</p>
                <p>Price: ${reservation.room && reservation.room.price}</p>
                <p>Check-in Time: {reservation.checkInTime}</p>
                <p>Check-out Time: {reservation.checkOutTime}</p>
              </div>
              <div className="flex justify-evenly">
                <button
                  onClick={() => setEditingReservationId(reservation.id)}
                  className="mr-2 bg-orange-500 text-gray-100 shadow-2xl drop-shadow-2xl py-1 px-2 rounded"
                >
                  Change Reservation
                </button>
                <button
                  onClick={() => handleDelete(reservation.id)}
                  className="mr-2 bg-red-500 text-white shadow-2xl drop-shadow-2xl py-1 px-2 rounded"
                >
                  Delete Reservation
                </button>
              </div>
              {editingReservationId === reservation.id && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(reservation.id);
                  }}
                  className="mt-4"
                >
                  <label>
                    New Room ID:
                    <input
                      type="number"
                      name="newRoomId"
                      value={formData.newRoomId}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </label>
                  <label className="block mt-4">
                    New Check-in Time:
                    <input
                      type="datetime-local"
                      name="newCheckInTime"
                      value={formData.newCheckInTime}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </label>
                  <label className="block mt-4">
                    New Check-out Time:
                    <input
                      type="datetime-local"
                      name="newCheckOutTime"
                      value={formData.newCheckOutTime}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </label>
                  <button
                    type="submit"
                    className="mt-2 bg-green-500 text-white py-1 px-2 rounded"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingReservationId(null)}
                    className="mt-2 ml-2 bg-gray-500 text-white py-1 px-2 rounded"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserReservations;
