import { Modal, Button } from "react-bootstrap";

const UserModal = ({ user, showModal, handleClose }) => {
  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      className="bg-custom-gray text-custom-light-gray "
    >
      <Modal.Header className="bg-custom-blue" closeButton>
        <Modal.Title>Username: {user.username}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-custom-blue">
        <h5>Reservations:</h5>
        <ul>
          {user.reservations.map((reservation) => (
            <li key={reservation.id}>
              Check-in: {new Date(reservation.checkInTime).toLocaleDateString()}{" "}
              - Check-out:{" "}
              {new Date(reservation.checkOutTime).toLocaleDateString()} - Room
              Number: {reservation.room.roomNumber} - Room Type:{" "}
              {reservation.room.type}
            </li>
          ))}
        </ul>
        <h5>Reviews:</h5>
        <ul>
          {user.feedbacks.length > 0 ? (
            user.feedbacks.map((feedback) => (
              <li key={feedback.id}>{feedback.comment}</li>
            ))
          ) : (
            <li>No feedbacks available</li>
          )}
        </ul>
      </Modal.Body>
      <Modal.Footer className="bg-custom-blue">
        <Button variant="dark" className="bg-orange-400" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
