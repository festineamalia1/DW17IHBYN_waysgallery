import React, { useState, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Jumbotron,
  Button,
  Table,
  Modal,
} from "react-bootstrap";
import Image1 from "assets/images/thumbnail1.png";
import Image2 from "assets/images/thumbnail2.png";
import Image3 from "assets/images/thumbnail3.png";
import { listvid } from "fakeData/video";
import { useParams, Link, useHistory } from "react-router-dom";
import View from "assets/images/view.png";
import Date from "assets/images/date.png";
import TableOfferOrder from "components/TableOfferOrder";

import { API } from "config/api";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from "react-query";
const ListMyOrder = () => {
  const [smShow, setSmShow] = useState(false);
 
 const [state] = useContext(TaskContext);
   const history = useHistory();
 const { id } = state.user;
 const { isLoading, error, data: hired, refetch } = useQuery("getorder", () =>
   API.get(`/hired2/${id}`)
 );
 const [approve] = useMutation(async (id) => {
   try {
     const config = {
       headers: {
         "Content-type": "application/json",
       },
     };
     const body = JSON.stringify({ status: "Success" });
     await API.patch(`/hired/${id}`, body, config);
     refetch();
   } catch (err) {
     console.log(err.message);
   }
 });

  const [cancel] = useMutation(async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const body = JSON.stringify({ status: "Canceled" });
      await API.patch(`/hired/${id}`, body, config);
      refetch();
    } catch (err) {
      console.log(err.message);
    }
  });

  return isLoading ? (
    <h1>Loading...</h1>
  ) : error ? (
    <h1>error {error.message} </h1>
  ) : (
    <div>
      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No</th>
              <th>Client</th>
              <th>Order</th>
              <th>Start Project</th>
              <th>End Project</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {hired.data.data.hired.map((hired, i) => (
              <tr>
                <td>{i + 1}</td>
                <td>{hired.orderto.fullName}</td>
                <td onClick={() => setSmShow(true)}>{hired.title}</td>
                <td>{hired.startDate}</td>
                <td>{hired.endDate}</td>
                <td
                  style={{
                    color:
                      hired.status === "Approved"
                        ? "#0ACF83"
                        : hired.status === "Canceled"
                        ? "#FF0742"
                        : hired.status === "Success"
                        ? "#78A85A"
                        : "#F7941E",
                  }}
                >
                  {hired.status === "Approved"
                    ? "Project Is Complete"
                    : hired.status === "Canceled"
                    ? "Cancel"
                    : hired.status === "Success"
                    ? "Success"
                    : "Waiting to be verified"}
                </td>
                {hired.status == "Approved" ? (
                  <td style={{ textAlign: "center" }}>
                    <button
                      className="btn btn-success mx-1"
                      onClick={() => history.push(`/viewprojek/${hired.id}`)}
                    >
                      view project
                    </button>
                  </td>
                ) : hired.status == "Canceled" ? (
                  <td style={{ textAlign: "center" }}>
                    <img
                      src={require("../assets/images/cancel.png")}
                      style={{ width: "30px" }}
                    />
                  </td>
                ) : hired.status == "Success" ? (
                  <td style={{ textAlign: "center" }}>
                    <img
                      src={require("../assets/images/sukses.png")}
                      style={{ width: "30px" }}
                    />
                  </td>
                ) : (
                  <td style={{ textAlign: "center" }}>
                    <img
                      src={require("../assets/images/waiting.png")}
                      style={{ width: "30px" }}
                    />
                  </td>
                )}
                <Modal
                  //size="sm"
                  show={smShow}
                  onHide={() => setSmShow(false)}
                  aria-labelledby="example-modal-sizes-title-sm"
                >
                  <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                      Title :{hired.title}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Description:{hired.description}
                    <br />
                    <br />
                    Price : {hired.price}
                  </Modal.Body>
                  <Modal.Footer>
                    <button
                      className="btn btn-danger mx-1"
                      onClick={() => cancel(hired.id)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-success mx-1"
                      onClick={() => approve(hired.id)}
                    >
                      Approve
                    </button>
                  </Modal.Footer>
                </Modal>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
export default ListMyOrder;
