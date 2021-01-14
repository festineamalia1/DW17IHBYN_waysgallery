import React, { useState, useContext } from "react";
import SideBar from "components/SideBar";
import NavBar from "components/NavBar";
import ListVideo from "components/CardVideo";
import background from "assets/images/background.png";
import { Link, useParams, useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Jumbotron, Button, Modal } from "react-bootstrap";
import Profil from "assets/images/profil.png";
import ProfilUser from "components/ProfilCreator";
import TabsContent from "components/TabsContent";
import { API } from "config/api";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from "react-query";
import Detail from "assets/images/detail.svg";
export default function ContentCreator() {
  const [lgShow, setLgShow] = useState(false);
  const history = useHistory();
  const [state, dispatch] = useContext(TaskContext);

  const { id } = useParams();

  const { isLoading, error, data: projek } = useQuery(
    "getDetChanel",
    async () => {
      const { data } = await API.get(`projek/${id}`);
      const projek = data.data;

      return projek;
    }
  );

  return isLoading || !projek.projek ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>error {error.message} </h1>
  ) : (
    <div className="row mt-5">
      <div className="col">
        <div className="row">
          <div>
            <NavBar />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col mt-5">
            {" "}
            <img
              src={`http://localhost:5000/uploads/${projek.projek.photos[0].photo}`}
              alt="logo"
              style={{ width: "635px", height: "478px" }}
              onClick={() => setLgShow(true)}
            />
            <Modal
              size="lg"
              show={lgShow}
              onHide={() => setLgShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <img
                  src={`http://localhost:5000/uploads/${projek.projek.photos[0].photo}`}
                  alt="logo"
                  style={{ width: "635px", height: "478px" }}
                 
                />
              </Modal.Body>
            </Modal>
          </div>
          <div className="col mt-5">
            <p>{projek.projek.description}</p>
          </div>
        </div>
        <div className="container">
          <div className="row mt-5">
            {/*<ListVideo image={chanels.chanels.photo[0].image} />*/}
          </div>
        </div>
      </div>
    </div>
  );
}
