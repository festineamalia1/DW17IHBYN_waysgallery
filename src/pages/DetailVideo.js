import React, { useState, useContext } from "react";
import SideBar from "components/SideBar";
import NavBar from "components/NavBar";
import ListVideo from "components/ListVideo";
import background from "assets/images/background.png";
import { useParams, Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Jumbotron, Button } from "react-bootstrap";
import Comment from "assets/images/creator1.png";
import ProfilUser from "components/ProfilCreator";
import {comments} from "fakeData/comment";
import ReactPlayer from "react-player";
import {Form} from "react-bootstrap";
import { API } from "config/api";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from "react-query";
import Detail from "assets/images/detail.svg";
export default function DetailVideo() {
  const history = useHistory();
 const { id, userId } = useParams();

  const { isLoading, error, data: photos, refetch } = useQuery(
    "getDetPhoto",
    async () => {
      const { data } = await API.get(`photo/${id}`);
      const photos = data.data;

      return photos;
    }
  ); 
     
  const [follow] = useMutation((userId) => API.post(`/follow/${userId}`));
  const createFollow = () => {
    follow(userId);
  };
   return isLoading || !photos.photos ? (
     <h1>Loading...</h1>
   ) : error ? (
     <h1>error {error.message} </h1>
   ) : (
     <div className="row mt-4">
       <div className="col">
         <div className="row">
           <div>
             <NavBar />
           </div>
         </div>
         <div className="container">
           <div className="row mt-5">
             <div className="col mt-5 pl-4">
               <div className="row mt-4 pl-4">
                 <hr></hr>
                 <img
                   src={`http://localhost:5000/uploads/${photos.photos.user.avatar}`}
                   alt="photo"
                   className="photochanel"
                   onClick={() =>
                     history.push(`/creator/${photos.photos.userId}`)
                   }
                 />

                 <div className="col pl-4">
                   <div className="row">
                     <span> {photos.photos.arts.title}</span>
                   </div>
                   <div className="row">
                     <span> {photos.photos.user.fullName}</span>
                   </div>
                 </div>
                 <div className="col-md-3">
                   <Button
                     variant="primary"
                     type="submit"
                     className="btn btn-primary "
                     style={{
                       backgroundColor: "#E7E7E7",
                       border: "none",
                       color: "#000000",
                     }}
                     onClick={() => {
                       createFollow(userId);
                     }}
                   >
                     Follow
                   </Button>{" "}
                   <Button
                     variant="primary"
                     className="btn btn-primary "
                     style={{
                       backgroundColor: "#2FC4B2",
                       border: "none",
                       color: "#FFFFFF",
                     }}
                     onClick={() =>
                       history.push(`/hire/${photos.photos.user.id}`)
                     }
                   >
                     Hire
                   </Button>
                 </div>
               </div>
               <div className="row mt-4 pl-4">
                 <img
                   src={`http://localhost:5000/uploads/${photos.photos.image}`}
                   alt="logo"
                 />
               </div>
               <div className="row mt-4 pl-4">
                 <h5>Say Hello {photos.photos.user.email}</h5>
               </div>

               <div className="row mt-4 pl-4 pr-4">
                 <p className="text-justify">
                   {photos.photos.arts.description}
                 </p>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
}
