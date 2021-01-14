import React, { useContext } from "react";
import SideBar from "components/SideBar";
import NavBar from "components/NavBar";
import FormProjek from "components/FormProjek";

import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Jumbotron, Button } from "react-bootstrap";

export default function SendProjek() {
  return (
    <div className="row mt-5">
      <div className="col">
        <div className="row">
          <div>
            <NavBar />
          </div>
        </div>
        <div className="row mt-5"></div>
        <div className="row mt-5">
          <div className="col pl-3">
            <FormProjek />
          </div>
        </div>
      </div>
    </div>
  );
}
