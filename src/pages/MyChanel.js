import React, { useState, useContext } from "react";
import SideBar from "components/SideBar";
import NavBar from "components/NavBar";
import Tabs from "components/Tabs"
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
export default function MyChanel() {
  const [state, dispatch] = useContext(TaskContext);

  const { id } = state.user;

  const { isLoading, error, data: chanels } = useQuery(
    "getDetChanel",
    async () => {
      const { data } = await API.get(`user/${id}`);
      const chanels = data.data;

      return chanels;
    }
  );
   return isLoading || !chanels.chanels ? (
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
         <div className="container">
           <div className="row mt-5">
             <div className="col mt-5">
               <img
                 src={`http://localhost:5000/uploads/${chanels.chanels.avatar}`}
                 alt="Buku1"
                 className="ft-creator"
               />
               <br />
               <br />
               <h5>{chanels.chanels.fullName}</h5>

               <br />
               <h1>{chanels.chanels.greeting}</h1>
               <br />
               <br />
               <br />
               <Link to="/edit">
                 <Button
                   variant="primary"
                   className="btn btn-primary "
                   style={{
                     backgroundColor: "#2FC4B2",
                     border: "none",
                     color: "#FFFFFF",
                   }}
                 >
                   Edit Profile
                 </Button>
               </Link>
             </div>
             <div className="col mt-5">
               {" "}
               <img
                 src={`http://localhost:5000/uploads/${chanels.chanels.photo[2].image}`}
                 alt="logo"
                 style={{ width: "646px", height: "484px" }}
               />
             </div>
           </div>

           <div className="row mt-5">
             <h5>My Work</h5>
           </div>
           <div className="row mt-5">
             <ListVideo image={chanels.chanels.photo[0].image} />
           </div>
         </div>
       </div>
     </div>
   );
}
