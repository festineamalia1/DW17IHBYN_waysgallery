import React from "react";

import { Container, Row, Col, Button , Card} from "react-bootstrap";
import Desain from "assets/images/desain.svg";
import { Link } from "react-router-dom";



const CardVideo = ({
  image
}) => {
 

  
  return (
    <div>
      <Card
        style={{  marginBottom: 15 }}
      >
        <img
          src={`http://localhost:5000/uploads/${image}`}
          alt="thumbnail"
          className="foto"
          style={{
            width: 327,
            height: 228,
            objectFit: "cover",
          }}
        />
      </Card>
    </div>
  );
};
export default CardVideo;
