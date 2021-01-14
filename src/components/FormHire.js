import React, { useState } from "react";
import { useQuery, useMutation } from "react-query";
import { Form, Button, Col } from "react-bootstrap";
import { API } from "config/api";
import { useParams, Link, useHistory } from "react-router-dom";
const FormVideo = () => {
   const { id } = useParams();
   const { refetch } = useQuery("getAllHired", () => API.get(`/hired/${id}`));
    const [formData, setFormData] = useState({
      title: "",

      description: "",
      startDate: "",
      endDate: "",
      price:"",

      //chanelId: "",
    });
   

    const {
      title,
      thumbnail,
      description,
      startDate,
      endDate,
      price,
    } = formData;
       const handleChange = (e) => {
         setFormData({ ...formData, [e.target.name]: e.target.value });
       };
        const [savehire] = useMutation(async () => {
          try {
            const config = {
              headers: {
                "Content-Type": "application/json",
              },
            };
            const body = JSON.stringify({
              title,
              thumbnail,
              description,
              startDate,
              endDate,
              price,
            });
            const res = await API.post(`/hired/${id}`, body, config);

            setFormData({
              
              title: "",
              thumbnail: "",
              description: "",
              startDate: "",
              endDate: "",
              price: "",
            });

            return res;
          } catch (error) {
            console.log(error);
          }
        });
 

    return (
      <Col>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            savehire();
            refetch();
          }}
        >
          <Form.Group>
            <Form.Control
              placeholder="Title"
              type="text"
              class="form-control"
              required
              name="title"
              value={title}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="Description"
              name="description"
              value={description}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Row>
              <Col>
                <input
                  placeholder="Start"
                  type="date"
                  className="form-control"
                  required
                  name="startDate"
                  value={startDate}
                  onChange={(e) => handleChange(e)}
                ></input>
              </Col>
              <Col>
                <Form.Group>
                  <input
                    placeholder="End"
                    type="date"
                    className="form-control"
                    required
                    name="endDate"
                    value={endDate}
                    onChange={(e) => handleChange(e)}
                  ></input>
                </Form.Group>
              </Col>
            </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Control
              placeholder="Price"
              type="text"
              class="form-control"
              required
              name="price"
              value={price}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>
          <Button
            variant="primary"
            size="lg"
            style={{
              backgroundColor: "#E7E7E7",
            }}
          >
            Cancel
          </Button>{" "}
          <Button
            variant="primary"
            size="lg"
            style={{
              backgroundColor: "#2FC4B2",
            }}
            type="submit"
          >
            Bidding
          </Button>
        </Form>
      </Col>
    );
};

export default FormVideo;