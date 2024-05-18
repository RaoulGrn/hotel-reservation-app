import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import {
  faCartShopping,
  faDoorOpen,
  faHistory,
  faHome,
  faComment,
  faStar,
  faUser,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";
import { useAuthContext } from "../../util/AuthContext.jsx";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [path, setPath] = useState("");
  const { user, logout } = useAuthContext();

  const userId = JSON.parse(localStorage.getItem("token")).user.id || null;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="sidebar-wrapper">
      <SideNav
        className={`bg-custom-gray ${
          isSidebarOpen ? "sidenav-open" : "sidenav-closed"
        } fixed`}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        onSelect={(selected) => {
          setPath(selected);
        }}
      >
        <SideNav.Toggle />
        <SideNav.Nav defaultSelected="/home">
          <NavItem eventKey="">
            <NavIcon>
              <Link to={"/"}>
                <FontAwesomeIcon icon={faHome} />
              </Link>
            </NavIcon>
            <NavText>Home</NavText>
          </NavItem>

          {user === "admin" ? (
            <NavItem eventKey="/admin">
              <NavIcon>
                <FontAwesomeIcon icon={faUser} />
              </NavIcon>
              <NavText>Admin</NavText>

              <NavItem eventKey="/admin/userlist">
                <NavText>
                  <Link to={path}>Admin Panel</Link>
                </NavText>
              </NavItem>
              <NavItem eventKey="/user/logout">
                <NavText onClick={handleLogout}>
                  LogOut{" "}
                  <FontAwesomeIcon
                    className={"text-danger"}
                    icon={faDoorOpen}
                  />
                </NavText>
              </NavItem>
            </NavItem>
          ) : (
            <NavItem eventKey="/user">
              <NavIcon>
                <FontAwesomeIcon icon={faUser} />
              </NavIcon>
              <NavText>{user}</NavText>
              <NavItem eventKey="/user/reservations">
                <NavText>
                  <Link to={`/user/${userId}/reservations`}>
                    Reservations{" "}
                    <FontAwesomeIcon className={"text-primary"} icon={faBell} />
                  </Link>
                </NavText>
              </NavItem>
              <NavItem eventKey="/user/feedbacks">
                <NavText>
                  <Link to={`/user/${userId}/feedbacks`}>
                    Feedbacks{" "}
                    <FontAwesomeIcon
                      className={"text-warning"}
                      icon={faComment}
                    />
                  </Link>
                </NavText>
              </NavItem>
              <NavItem eventKey="/user/logout">
                <NavText onClick={handleLogout}>
                  LogOut{" "}
                  <FontAwesomeIcon
                    className={"text-danger"}
                    icon={faDoorOpen}
                  />
                </NavText>
              </NavItem>
            </NavItem>
          )}
        </SideNav.Nav>
      </SideNav>
    </div>
  );
};

export default Sidebar;
