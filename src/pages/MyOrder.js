import React, { useState, useContext } from "react";
import SideBar from "components/SideBar";
import NavBar from "components/NavBar";
import ListMyOffer from "components/ListMyOffer";
import ListMyOrder from "components/ListMyOrder";

import Tabs from "components/Tabs";
import ListVideo from "components/CardVideo";
import background from "assets/images/background.png";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Image, Jumbotron, Button } from "react-bootstrap";
import Profil from "assets/images/profil.png";
import ProfilUser from "components/ProfilCreator";
import { API } from "config/api";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from "react-query";
import TabsContent from "components/TabsContent2";
import Detail from "assets/images/detail.svg";

export default function MyOrder() {
   const [isOfferPg, setOfferPg] = useState(true);
   const handleOfferPg = () => {
     isOfferPg === true ? setOfferPg(false) : setOfferPg(true);
   };
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
                <Button
                  variant="primary"
                  className="btn btn-primary btn-lg"
                  style={{
                    backgroundColor: "#E7E7E7",
                    border: "none",
                    color: "black",
                    width: "150px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                  onClick={handleOfferPg}
                >
                  {isOfferPg === true ? "My Order" : "My Offer"}
                </Button>
                <div className="row mt-5">
                  <div>{isOfferPg ? <p>My Offer</p> : <p>My Order</p>}</div>
                </div>
                <div className="row">
                  {isOfferPg ? <ListMyOffer /> : <ListMyOrder />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}