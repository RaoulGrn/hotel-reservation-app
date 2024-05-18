import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function HotelCards({ hotel }) {
  const getImageUrl = (hotelId) => {
    const imageName = `${hotelId}.jpeg`;
    return `/photos/${imageName}`;
  };

  return (
    <div
      key={hotel.id}
      className="bg-custom-gray p-4 rounded-3xl shadow-2xl drop-shadow-2xl"
      style={{ minHeight: "300px" }}
    >
      <h2 className="text-lg font-bold mb-2  text-orange-400 bg-custom-blue rounded-3xl">
        {hotel.name}
      </h2>
      <div
        style={{
          height: "200px",
          overflow: "hidden",
        }}
      >
        <img
          src={getImageUrl(hotel.id)}
          alt={hotel.name}
          className="mb-4 rounded-3xl mt-3"
          style={{
            width: "100%",
            height: "80%",
            objectFit: "cover",
          }}
        />
      </div>
      <h3 className="text-md mt-2 p-4 font-bold  text-orange-400">Rooms:</h3>
      <ul className="  rounded-3xl shadow-md shadow-orange-400">
        {hotel.rooms.map((room) => (
          <li key={room.id} className="text-sm text-cyan-100 mb-1">
            Room {room.id} ({room.type}) - €{room.price} -{" "}
            {room.isAvailable ? "Available" : "Unavailable"}
          </li>
        ))}
      </ul>
      <Link to={`/hotels/${hotel.id}/book/`} className="ml-2">
        <Button
          variant={"dark"}
          className="p-1 text-1xl w-25 mt-2 bg-orange-400 text-cyan-900 shadow-2xl font-bold"
        >
          Book
        </Button>{" "}
      </Link>
    </div>
  );
}

export default HotelCards;
