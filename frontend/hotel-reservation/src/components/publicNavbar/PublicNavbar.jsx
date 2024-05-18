import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../util/AuthContext";
import roomRadarLogo from "../../../public/roomRadarLogo.png";
import logo from "../../../public/Logo.png";
import "./PublicNavbar.css";

const MyComponent = () => {
  const { logout } = useAuthContext();
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const handleClose = () => setModalShow(false);
  const handleClose1 = () => setModalShow1(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        className={"public-navbarz"}
        expand="lg"
        style={{
          backgroundImage: "linear-gradient( #2D4059,#222831)",
          height: "calc(100vh )",
        }}
        variant="dark"
      >
        <Container>
          <Link to="/">
            <Navbar.Brand className={"fs-1 fw-light flex"}>
              {" "}
              <span>
                <img
                  src={roomRadarLogo}
                  alt="Room Radar Logo"
                  className="h-40 w-40"
                />
              </span>
              <span>
                <img
                  src={logo}
                  alt="Logo"
                  className="h-20 w-20 translate-y-10 -translate-x-4"
                />
              </span>
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
              <Nav.Link href="#" onClick={() => setModalShow(true)}>
                <span className={"spans-two"}>Register</span>
              </Nav.Link>
              <Nav.Link
                eventKey={2}
                href="#"
                onClick={() => setModalShow1(true)}
              >
                <span className={"spans-one"}>Login</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoginModal show={modalShow1} handleClose={handleClose1} />
      <RegisterModal
        show={modalShow}
        handleClose={handleClose}
        setModalShow1={setModalShow1}
      />
    </>
  );
};

export default MyComponent;
