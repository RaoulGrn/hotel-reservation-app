import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../util/AuthContext";
import { Button } from "react-bootstrap";

const UserFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const tokenData = JSON.parse(localStorage.getItem("token"));
  const userId = tokenData.user.id;
  const token = tokenData.jwt;

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/users/${userId}/feedbacks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFeedbacks(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching feedbacks. Please try again later.");
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [userId, token]);

  const handleDelete = async (hotelId, feedbackId) => {
    try {
      await axios.delete(
        `http://localhost:8080/feedbacks/delete/${userId}/${hotelId}/${feedbackId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.filter((feedback) => feedback.id !== feedbackId)
      );
    } catch (error) {
      console.error("Error deleting feedback:", error);
      setError("Failed to delete feedback. Please try again later.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container vh-100 md:mx-auto md:p-6 p-28 mx-auto md:-translate-x-0 translate-x-10 sm:m-6  ">
      <h1 className="text-3xl md:-translate-x-0 -translate-x-32 font-bold mb-4 text-orange-400">
        User Feedbacks
      </h1>
      {feedbacks.length === 0 ? (
        <div className="text-custom-light-gray">No feedbacks found.</div>
      ) : (
        <ul className="space-y-4 mb-6">
          {feedbacks.map((feedback) => (
            <li
              key={feedback.id}
              className="p-4 border rounded-lg md:-translate-x-0 -translate-x-32 flex justify-between space-x-5 bg-custom-light-gray"
            >
              <p>Comment: {feedback.comment}</p>
              <Button
                className="md:w-20 w-40 "
                variant="danger"
                onClick={() => handleDelete(feedback.hotelId, feedback.id)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserFeedbacks;
