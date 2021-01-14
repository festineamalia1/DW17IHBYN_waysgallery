import React, { useState, useContext } from "react";
import { TaskContext } from "context/TaskContext";

import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { API } from "config/api";

import { useQuery, useMutation } from "react-query";
const SignupForm = () => {
  const { id } = useParams();
    const { refetch } = useQuery("getAllUser", () => API.get("/user"));
     const [formData, setFormData] = useState({
       email: "",
       password: "",
       fullName: "",
      
     });
      const { email, password, fullName } = formData;
       const handleChange = (e) => {
         setFormData({ ...formData, [e.target.name]: e.target.value });
       };

        const [signup] = useMutation(async () => {
          try {
            const config = {
              headers: {
                "Content-Type": "application/json",
              },
            };
            const body = JSON.stringify({
              email,
              password,
              fullName,
            });
            const res = await API.post(`/register`, body, config);

            setFormData({
              email: "",
              password: "",
              fullName: "",
            });

            return res;
          } catch (error) {
            console.log(error);
          }
        });
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        signup();
        refetch();
      }}
    >
      <Form.Group controlId="Email">
        <Form.Control
          type="text"
          name="email"
          value={email}
          required
          placeholder="Email"
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>
      <Form.Group controlId="Email">
        <Form.Control
          type="password"
          name="password"
          value={password}
          required
          placeholder="Password"
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>
      <Form.Group controlId="Nama Chanel">
        <Form.Control
          type="text"
          name="fullName"
          required
          placeholder="FullName"
          value={fullName}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>

      {/* <Link to="/index"> */}
      <Button
        block
        type="submit"
        style={{
          backgroundColor: "#2FC4B2",
          border: "none",
          color: "#FFFFFF",

          height: "50px",
          borderRadius: "5px",
        }}
      >
        Sign Up
      </Button>
      {/* </Link> */}
    </Form>
  );
};
export default SignupForm;
