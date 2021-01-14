import React, { useContext } from "react";
import SideBar from "components/SideBar";
import NavBar from "components/NavBar";
import FormHire from "components/FormHire";

import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Jumbotron, Button } from "react-bootstrap";

export default function HirePage() {
  return (
    <div className="row mt-5 ">
      <div className="col ">
        <div className="row">
          <div>
            <NavBar />
          </div>
        </div>
        <div className="container">
          <div className="row mt-5 ">
            <div className="col mt-5">
              <FormHire />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
