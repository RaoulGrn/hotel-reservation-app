import axios from "axios";
import { useState } from "react";
import { getPosition } from "../services/apiGeocoding";
import { Button } from "react-bootstrap";
import HotelCards from "../components/hotelCards/HotelCards";
import { useAuthContext } from "../util/AuthContext";

function Home() {
  const [hotels, setHotels] = useState([]);
  const [position, setPosition] = useState({ lat: "", long: "" });
  const [range, setRange] = useState("");
  const [error, setError] = useState(null);

  const fetchPosition = async () => {
    try {
      const positionObj = await getPosition();
      const positionData = {
        lat: positionObj.coords.latitude,
        long: positionObj.coords.longitude,
      };
      setPosition(positionData);
    } catch (error) {
      console.error("Error fetching position:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token")).jwt || null;
    try {
      const response = await axios.get(
        `http://localhost:8080/hotels/search?userLat=${position.lat}&userLon=${position.long}&radius=${range}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHotels(response.data);
      setError(null);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setError("Failed to fetch hotels. Please try again.");
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center text-center  p-4">
      <form
        onSubmit={handleSubmit}
        className=" bg-custom-gray -translate-y-40 md:-translate-x-0 -translate-x-10 md:w-50 ml-20 md:ml-0 w-100 p-6 rounded shadow-md space-y-4"
      >
        <div>
          <label
            htmlFor="lat"
            className="block mb-2 text-xl text-left font-bold text-orange-400"
          >
            Latitude:
          </label>
          <input
            type="text"
            id="lat"
            value={position.lat}
            onChange={(e) => setPosition({ ...position, lat: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Latitude"
            required
          />
        </div>
        <div>
          <label
            htmlFor="long"
            className="block mb-2 text-xl text-left font-bold text-orange-400"
          >
            Longitude:
          </label>
          <input
            type="text"
            id="long"
            value={position.long}
            onChange={(e) => setPosition({ ...position, long: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Longitude"
            required
          />
        </div>
        <div className="flex items-center">
          <button
            type="button"
            onClick={fetchPosition}
            className="p-2 bg-cyan-500  text-gray-100 font-bold shadow-2xl rounded"
          >
            Get Position
          </button>
        </div>
        <div>
          <label
            htmlFor="range"
            className="block mb-2 text-xl text-left font-bold text-orange-400"
          >
            Range (km):
          </label>
          <input
            type="text"
            id="range"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full p-2 bg-amber-600 font-bold shadow-2xl text-gray-100 rounded"
          >
            Search Hotels
          </button>
        </div>
      </form>
      {error && <div className="mt-4 text-red-500">{error}</div>}
      <div className="mt-8 grid grid-cols-1 -translate-y-40 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map((hotel) => (
          <HotelCards hotel={hotel} key={hotel.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
