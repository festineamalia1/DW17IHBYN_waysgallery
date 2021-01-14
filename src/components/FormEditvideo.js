import React, { useState,useRef, useContext } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { API } from "config/api";
import { useQuery, useMutation } from "react-query";
import { TaskContext } from "../context/TaskContext";
import Camera from "assets/images/Camera.svg";
const FormChanel = () => {
   const [state] = useContext(TaskContext);
   const avatarFile = useRef();
   
const handleAvatarClick = () => {
 

  avatarFile.current.click();
};
     
   const userId = state.user.id;
   const { isLoading, error, data, refetch } = useQuery("getDetail", () =>
     API.get(`/user/${userId}`)
   );

  const [formData, setFormData] = useState({
    fullName: "",

    greeting: "",
    avatar: "",
  });
  const [previewSrc, setPreviewSrc] = useState(null);
  const { fullName, greeting, avatar } = formData;
    const handleChange = (event) => {
      const updateForm = { ...formData };
      updateForm[event.target.name] =
        event.target.type === "file"
          ? event.target.files[0]
          : event.target.value;
      setFormData(updateForm);
    };
    const onChangeFiles = (e) => {
      let fileInfo = e.target.files[0];

      let reader = new FileReader();

      if (e.target.files.length === 0) {
        return;
      }

      reader.onloadend = (e) => {
        setPreviewSrc([reader.result]);
      };

      reader.readAsDataURL(fileInfo);
    };
    const [
      tambah,
      { isLoading: isLoadingMutation, error: erorMutation },
    ] = useMutation(async () => {
      try {
        const formData = new FormData();

        formData.append("fullName", fullName);
        formData.append("greeting", greeting);
      
        formData.append("avatar", avatar);

       

        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };

        const res = await API.patch(`/user/${userId}`, formData, config);

        setFormData({
          fullName: "",

          greeting: "",
          avatar: "",
        });

        return res;
      } catch (error) {
        console.log(error);
      }
    });
    
    return isLoading ? (
      <h1>Loading...</h1>
    ) : error ? (
      <h1>error {error.message} </h1>
    ) : (
      <Col>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            tambah();
            refetch();
          }}
        >
          <Form.Group>
            <div className="upload-file" onClick={handleAvatarClick}>
              <input
                type="file"
                ref={avatarFile}
                name="avatar"
                // onChange={handleAvatarChange}
                onChange={(e) => {
                  handleChange(e);
                  onChangeFiles(e);
                }}
              />

              <img className="avatar-icon" src={Camera} alt="icon" />
            </div>
            {/* <Form.File
              name="avatar"
              className="form-control"
              accept="image/*"
              onChange={(e) => {
                handleChange(e);
                onChangeFiles(e);
              }}
            />*/}
          </Form.Group>
          <Form.Group>
            <Form.Control
              placeholder="sds"
              type="text"
              class="form-control"
              name="fullName"
              value={fullName}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows="3"
              placeholder="sas"
              name="greeting"
              value={greeting}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <Button
            variant="primary"
            size="lg"
            style={{
              backgroundColor: "#2FC4B2",
            }}
            type="submit"
          >
            Post
          </Button>
        </Form>
      </Col>
    );
};

export default FormChanel;