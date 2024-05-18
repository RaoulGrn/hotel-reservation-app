import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../util/AuthContext";
import { Button } from "react-bootstrap";

const FeedbackForm = ({ hotelId }) => {
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { user } = useAuthContext();
  const userId = JSON.parse(localStorage.getItem("token")).user.id || null;

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    const tokenData = JSON.parse(localStorage.getItem("token"));
    const token = tokenData ? tokenData.jwt : null;

    if (!token) {
      setError("No token found. Please log in.");
      return;
    }

    try {
      await axios.post(
        `http://localhost:8080/feedbacks/add/${hotelId}/${userId}`,
        { comment: feedback },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuccess("Feedback submitted successfully");
      setFeedback("");
    } catch (error) {
      console.error("Feedback submission error:", error);
      setError("Failed to submit feedback");
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Leave Feedback</h2>
      <form onSubmit={handleFeedbackSubmit}>
        <label htmlFor="feedback" className="block font-bold text-2xl">
          Comment:
          <textarea
            id="feedback"
            name="feedback"
            value={feedback}
            onChange={handleFeedbackChange}
            className="w-full font-semibold p-2 border text-sm border-gray-300 text-gray-800 rounded"
            required
          />
        </label>
        <div className="flex justify-center">
          <Button type="submit" variant="dark" className="mt-2 bg-orange-400">
            Submit Feedback
          </Button>
        </div>
      </form>
      {success && <div className="text-green-500 mt-4">{success}</div>}
      {error && <div className="text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default FeedbackForm;
