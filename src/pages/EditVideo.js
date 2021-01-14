
import React, { useContext } from "react";
import SideBar from "components/SideBar";
import NavBar from "components/NavBar";
import FormEditvideo from "components/FormEditvideo";
import FormBestArt from "components/FormBestArt";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image, Jumbotron, Button } from "react-bootstrap";

export default function EditVideo() {
  return (
    <div className="row mt-5">
      <div className="col">
        <div className="row">
          <div>
            <NavBar />
          </div>
        </div>
        <div className="container">
          <div className="row mt-5">
            <div className="col mt-5">
              <FormBestArt />
            </div>
            <div className="col mt-5">
              <FormEditvideo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
