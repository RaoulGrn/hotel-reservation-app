import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBInputGroup,
  MDBBtn,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import PasswordChecklist from "react-password-checklist";
import axios from "axios";

const RegisterModal = ({ show, handleClose, setModalShow1 }) => {
  const [isFormValid, setIsFormValid] = useState(true);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prevFormValue) => ({ ...prevFormValue, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/auth/register", {
        username: formValue.username,
        email: formValue.email,
        password: formValue.password,
      });

      console.log("POST request successful", response);
      handleClose();
      setModalShow1(true);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };
  return (
    <Modal
      show={show}
      onHide={handleClose}
      style={{
        backgroundImage: "linear-gradient( #2D4059,#222831)",
      }}
    >
      <Modal.Header className={"bg-custom-gray text-success"} closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body className={"bg-custom-gray text-white"}>
        <p>Please enter your email and desired username & password.</p>
        <MDBValidation className="row g-3" isValidated>
          <MDBValidationItem className="col-md-4">
            <MDBInput
              value={formValue.name}
              name="name"
              onChange={onChange}
              id="validationCustom01"
              required
              label="Name"
            />
          </MDBValidationItem>
          <MDBValidationItem className="col-md-4">
            <MDBInput
              value={formValue.username}
              name="username"
              onChange={onChange}
              id="validationCustom02"
              required
              label="Username"
            />
          </MDBValidationItem>
          <MDBValidationItem
            feedback="Please choose an email."
            className="col-md-4"
          >
            <MDBInputGroup>
              <MDBInput
                type="email"
                value={formValue.email}
                name="email"
                onChange={onChange}
                id="validationCustom03"
                required
                label="Email"
              />
            </MDBInputGroup>
          </MDBValidationItem>
          <MDBValidationItem
            className="col-md-6"
            feedback="Please provide a valid password."
          >
            <MDBInput
              type="password"
              value={formValue.password}
              name="password"
              onChange={onChange}
              id="validationCustom03"
              required
              label="Password"
            />
          </MDBValidationItem>
          <MDBValidationItem
            className="col-md-6"
            feedback="Please rewrite password."
          >
            <MDBInput
              type="password"
              value={formValue.confirmPassword}
              name="confirmPassword"
              onChange={onChange}
              id="validationCustom05"
              required
              label="Confirm Password"
            />
          </MDBValidationItem>
          <MDBValidationItem
            className="col-12"
            feedback="You must agree before submitting."
          >
            <MDBCheckbox
              label="Agree to terms and conditions"
              id="invalidCheck"
              required
            />
          </MDBValidationItem>
          <div className="col-12">
            <MDBBtn
              onClick={handleSubmit}
              disabled={isFormValid}
              type="submit"
              className={"border-dark bg-success text-white"}
            >
              Register
            </MDBBtn>
          </div>
          <PasswordChecklist
            rules={["minLength", "specialChar", "number", "capital", "match"]}
            minLength={5}
            value={formValue.password}
            valueAgain={formValue.confirmPassword}
            onChange={(isValid) => {
              if (isValid) setIsFormValid(false);
            }}
          />
        </MDBValidation>
      </Modal.Body>
      <Modal.Footer className={"bg-custom-gray text-white"}>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export default RegisterModal;
