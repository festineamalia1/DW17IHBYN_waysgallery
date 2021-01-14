import React, { useState, useContext } from "react";
import { TaskContext } from "context/TaskContext";
import Login from "components/LoginForm";
import Signup from "components/SignupForm";
import Logo from "assets/images/title.svg";
import Assets from "assets/images/Assets.svg";
import { Container, Row, Col, Button, Form, Modal} from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginPage = () => {
  
  

 const [smShow, setSmShow] = useState(false);
 const [lgShow, setLgShow] = useState(false);
  
 
  return (
    <Container className="landing">
      <Row noGutters style={{ width: "100%" }}>
        <Col md={5}>
          <img
            src={Logo}
            alt="logo"
            className="logo-title"
            style={{ width: "387px", height: "294px" }}
          />
          <h2>show your work to inspire everyone</h2>
          <span>
            Ways Exhibition is a website design creators gather to share their
            work with other creators
          </span>
          <br />
          <br />
          <Button
            variant="primary"
            className="btn btn-primary btn-lg"
            style={{
              backgroundColor: "#2FC4B2",
              border: "none",
              color: "#FFFFFF",
              width: "150px",
            }}
            onClick={() => setSmShow(true)}
          >
            Join Now
          </Button>{" "}
          <Button
            className="btn btn-primary btn-lg"
            style={{
              backgroundColor: "#E7E7E7",
              border: "none",
              color: "#000000",
              width: "150px",
            }}
            onClick={() => setLgShow(true)}
          >
            Sign In
          </Button>
          <Modal
            //size="sm"
            show={smShow}
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
                Register
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Signup />
            </Modal.Body>
          </Modal>
          <Modal
            //size="lg"
            show={lgShow}
            onHide={() => setLgShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg"></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Login />
            </Modal.Body>
          </Modal>
        </Col>
        <img
          src={Assets}
          alt="logo"
          
          style={{ 
            width: "600px",
height: "600px",
}}
        />
      </Row>
    </Container>
  );
};
export default LoginPage;
