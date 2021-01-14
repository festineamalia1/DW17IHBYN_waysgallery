import React, { useContext } from "react";
import SideBar from "components/SideBar";
import NavBar from "components/NavBar";
import ListVideo from "components/CardVideo";
import background from "assets/images/background.png";
import { Link, useParams, useHistory } from "react-router-dom";
import { Container, Row, Col, Image, Jumbotron, Button } from "react-bootstrap";
import Profil from "assets/images/profil.png";
import ProfilUser from "components/ProfilCreator";
import TabsContent from "components/TabsContent";
import { API } from "config/api";
import { TaskContext } from "../context/TaskContext";
import { useQuery, useMutation } from "react-query";
import Detail from "assets/images/detail.svg";
export default function ContentCreator() {
  const history = useHistory();
  const [state, dispatch] = useContext(TaskContext);

 const { id } = useParams();

  const { isLoading, error, data: chanels } = useQuery(
    "getDetChanel",
    async () => {
      const { data } = await API.get(`user/${id}`);
      const chanels = data.data;

      return chanels;
    }
  );

   const [follow] = useMutation((id) => API.post(`/follow/${id}`));
   const addFollow = () => {
     follow(id);
   };

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
               <Button
                 variant="primary"
                 className="btn btn-primary "
                 style={{
                   backgroundColor: "#E7E7E7",
                   border: "none",
                   color: "#000000",
                 }}
                 onClick={() => {
                   addFollow();
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
                 onClick={() => history.push(`/hire/${chanels.chanels.id}`)}
               >
                 Hire
               </Button>
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
             <h5>Work</h5>
           </div>
           <div className="row mt-5">
             <ListVideo image={chanels.chanels.photo[0].image} />
           </div>
         </div>
       </div>
     </div>
   );
}
