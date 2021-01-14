import React, { useState, useContext } from "react";
import { TaskContext } from "context/TaskContext";

import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { API, setAuthToken } from "config/api";
const LoginForm = () => {
   
const [state, dispatch] = useContext(TaskContext);
console.log(state);

const [formData, setFormData] = useState({
  email: "aaa@gmail.com",
  password: "12345678",
});
const history = useHistory();
const { email, password } = formData;

const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleLogin = async (e) => {
  e.preventDefault();
  const body = JSON.stringify({ email, password });
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await API.post("/login", body, config);

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data.data,
    });
    setAuthToken(res.data.data.token);

    try {
      const res = await API.get("/auth");

      dispatch({
        type: "USER_LOADED",
        payload: res.data.data.user,
      });

      history.push("/home");
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
      });
    }
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
    });
  }
};
  return (
    <Form onSubmit={(e) => handleLogin(e)}>
      <Form.Group controlId="email">
        <Form.Control
          type="text"
          name="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Control
          type="password"
          name="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => handleChange(e)}
        />
      </Form.Group>
      
        <Button
          block
          type="submit"
          style={{
            backgroundColor: "#2FC4B2",
            border: "none",
            color: "#FFFFFF",

            height: "50px",
            borderRadius: "5px",
            marginTop: "28px",
          }}
        >
          Sign In
        </Button>
     
    </Form>
  );
};
export default LoginForm;