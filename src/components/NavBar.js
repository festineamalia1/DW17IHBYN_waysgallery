import React, { useState, useRef, useContext } from "react";
import { Container, Row, Col, Button, Form, Navbar, Nav, NavDropdown, ListGroup, Overlay, Tooltip, Popover} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { TaskContext } from "context/TaskContext";
import Profil from "assets/images/usernav.png";
import Logout from "assets/images/logout.png";
import Transaction from "assets/images/transaction.png";
import { API } from "config/api";
import Logo from "assets/images/logo.png";

import { useQuery, useMutation } from "react-query";
export default function NavBar(props) {
    const [show, setShow] = useState(false);
    const [target, setTarget] = useState(null);
    const ref = useRef(null);
const history = useHistory();
    const handleClick = (event) => {
      setShow(!show);
      setTarget(event.target);
    };


    const [state, dispatch] = useContext(TaskContext);
    //const { chanelName } = state.user;
    //const { id } = state.user;

   
  const { id } = state.user;

  const { isLoading, error, data: chanels } = useQuery(
    "getDetChanel",
    async () => {
      const { data } = await API.get(`user/${id}`);
      const chanels = data.data;

      return chanels;
    }
  );
  return isLoading || !chanels.chanels ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>error {error.message} </h1>
  ) : (
    <div>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        style={{
          backgroundColor: "#F9F9F9",
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
        }}
        className="border-bottom"
      >
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">
              <div>
                {" "}
                <img src={Logo} alt="logonav" className="logonav" />
              </div>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/addvideo">
              <div className="row">
                <div className="col">
                  <Button
                    variant="primary"
                    className="btn btn-primary "
                    style={{
                      backgroundColor: "#2FC4B2",
                      border: "none",
                      color: "#FFFFFF",
                    }}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            </Nav.Link>
            <Nav>
              <div ref={ref}>
                {/*<Button onClick={handleClick}>...</Button>*/}
                <img
                  src={`http://localhost:5000/uploads/${chanels.chanels.avatar}`}
                  alt="Buku1"
                  ref={target}
                  onClick={handleClick}
                  className="ft-setting"
                />
                <Overlay
                  show={show}
                  target={target}
                  placement="bottom"
                  container={ref.current}
                  containerPadding={20}
                >
                  <Popover id="popover-contained">
                    <Popover.Content>
                      {/*
                      <Link to="/mychanel">
                        <p>Profil</p>
                      </Link>
                      <Link to="/myorder">
                        <p>order</p>
                      </Link>
                      <Link
                        onClick={() =>
                          dispatch({
                            type: "LOGOUT",
                          })
                        }
                      >
                        <p>Log Out</p>
                      </Link>
                      */}

                      <ul class="list-inline">
                        <li onClick={() => history.push(`/mychanel`)}>
                          <div className="row">
                            <div className="col-sm-3">
                              <svg
                                width="25px"
                                height="25px"
                                viewBox="0 0 16 16"
                                class="bi bi-person"
                                fill="#2FC4B2"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                                />
                              </svg>
                            </div>
                            <div className="col">
                              <h6>Profile</h6>
                            </div>
                          </div>
                        </li>
                        <li onClick={() => history.push(`/myorder`)}>
                          <div className="row">
                            <div className="col-sm-3">
                              {" "}
                              <img
                                src={Transaction}
                                className=""
                                alt="Buku1"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                }}
                              />
                            </div>
                            <div className="col">
                              <h6>Order</h6>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <hr></hr>
                      <ul class="list-inline">
                        <li
                          onClick={() =>
                            dispatch({
                              type: "LOGOUT",
                            })
                          }
                        >
                          <div className="row">
                            <div className="col-sm-3">
                              <img
                                src={Logout}
                                className=""
                                alt="Buku1"
                                style={{
                                  width: "25px",
                                  height: "25px",
                                }}
                              />
                            </div>
                            <div className="col">
                              {" "}
                              <h6>Logout</h6>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </Popover.Content>
                  </Popover>
                </Overlay>
              </div>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
