import { Link } from "react-router-dom";
import Username from "../username/Username";
import roomRadarLogo from "../../../public/roomRadarLogo.png"; // Import the image files
import logo from "../../../public/Logo.png";

function Header() {
  return (
    <header className="flex items-center justify-between ml-14 bg-custom-gray px-4 py-3 uppercase sm:px-6">
      <Link
        to="/"
        className="tracking-widest flex justify-between text-orange-400"
      >
        <span>
          <img
            src={roomRadarLogo}
            alt="Room Radar Logo"
            className="h-20 w-20"
          />
        </span>
        <span>
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-10 translate-y-5 -translate-x-4"
          />
        </span>
      </Link>

      <Username />
    </header>
  );
}

export default Header;
