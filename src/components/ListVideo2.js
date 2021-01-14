import React, { useState, useContext } from "react";
import { Container, Row, Col, Image, Jumbotron, Button } from "react-bootstrap";
import Image1 from "assets/images/thumbnail1.png";
import Image2 from "assets/images/thumbnail2.png";
import Image3 from "assets/images/thumbnail3.png";
import { listvid } from "fakeData/video";
import { useParams, Link, useHistory } from "react-router-dom";
import View from "assets/images/view.png";
import Date from "assets/images/date.png";
import CardVideo from "components/CardVideo";



import { API } from "config/api";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from "react-query";
const ListVideo2 = () => {
     const [state, dispatch] = useContext(TaskContext);

     const { id } = state.user;
 const history = useHistory();
 const { isLoading, error, data: follow } = useQuery("getfollow", () =>
   API.get(`/follow/${id}`)
 );
 return isLoading || !follow.data.data ? (
   <h1>Loading...</h1>
 ) : error ? (
   <h1>error {error.message} </h1>
 ) : (
   <div class="list-grid-prof">
     {follow.data.data.follow.map((follow, i) => (
       <div>
         <CardVideo image={follow.following.photo[0].image} key={i} />
       </div>
     ))}
   </div>
 );
};
export default ListVideo2;
