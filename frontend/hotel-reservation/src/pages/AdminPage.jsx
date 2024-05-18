import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import UserModal from "../components/userModal/UserModal";

const MyComponent = () => {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token")).jwt || null;
      const response = await axios.get("http://localhost:8080/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const token = JSON.parse(localStorage.getItem("token")).jwt || null;

      const response = await axios.delete(
        `http://localhost:8080/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      setData((prevData) => prevData.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="userinfo-container -translate-y-60 m-5 p-5">
      <span className="text-orange-400 font-bold text-lg">Admin Panel</span>

      <table className="table table-dark mt-5">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr key={index}>
              <td>
                <Button variant="link" onClick={() => handleUserClick(user)}>
                  {user.username}
                </Button>
              </td>
              <td>
                {user.username !== "admin" && (
                  <Button
                    className="bg-danger border-danger"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <UserModal
          user={selectedUser}
          showModal={showModal}
          handleClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default MyComponent;
