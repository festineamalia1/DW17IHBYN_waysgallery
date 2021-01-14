import React, { useState, useContext } from "react";
import SideBar from "components/SideBar";
import NavBar from "components/NavBar";
import ListVideo from "components/ListVideo";
import ListVideo2 from "components/ListVideo2";

import { Container, Row, Col, Image, Jumbotron, Button } from "react-bootstrap";
import { useParams, Link, useHistory } from "react-router-dom";
import { API } from "config/api";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from "react-query";

export default function Home() {

 const history = useHistory();

 const [isTodayPg, setTodayPg] = useState(true);
 const handleTodayPg = () => {
   isTodayPg === true ? setTodayPg(false) : setTodayPg(true);
 };

return (
  <div className="row mt-5">
    <div className="col-10">
      <div>
        <NavBar />
      </div>

      <div className="row mt-5">
        <div className="col pl-5 mt-5">
          <Button
            variant="primary"
            className="btn btn-primary btn-lg"
            style={{
              backgroundColor: "#E7E7E7",
              border: "none",
              color: "black",
              width: "150px",
            }}
            onClick={handleTodayPg}
          >
            {isTodayPg === true ? "Follow" : "Today"}
          </Button>
          <br />
          <br />
          <div>{isTodayPg ? <p>Today</p> : <p>Following</p>}</div>
          <div class="list-grid-prof">
            <div>{isTodayPg ? <ListVideo /> : <ListVideo2 />}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};


