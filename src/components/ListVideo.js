import React, { useContext } from "react";
import SideBar from "components/SideBar";
import NavBar from "components/NavBar";
import CardVideo from "components/CardVideo";

import { Container, Row, Col, Image, Jumbotron, Button, Card } from "react-bootstrap";
import { useParams, Link, useHistory } from "react-router-dom";
import { API } from "config/api";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from "react-query";

export default function ListVideo() {
  
const history = useHistory();
const { isLoading, error, data: photos } = useQuery("getphoto", () =>
  API.get(`/photo`)
);
 return isLoading ? (
   <h1>Loading...</h1>
 ) : error ? (
   <h1>error {error.message} </h1>
 ) : (
   <div class="list-grid-prof">
     {photos.data.data.photos.map((photos, i) => (
       <div onClick={() => history.push(`/detailvid/${photos.id}`)}>
         <CardVideo image={photos.image} />
       </div>
     ))}
   </div>
 );
}

