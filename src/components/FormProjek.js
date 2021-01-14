import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import { Form, Button, Col } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import { API } from "config/api";
import { useDropzone } from "react-dropzone";
const FormProjek = () => {
  const { id } = useParams();
   const { refetch } = useQuery("getProjek", () => API.get(`projek/${id}`));
    const [formData, setFormData] = useState({
     
     
      description: "",
      photo: "",
      //chanelId: "",
    });
    const [previewSrc, setPreviewSrc] = useState(null);

    const { description, photo } = formData;
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
 console.log(formData);
    const [
      tambah,
      { isLoading: isLoadingMutation, error: erorMutation },
    ] = useMutation(async () => {
      try {
        const formData = new FormData();
     
        formData.append("description", description);
        formData.append("photo", photo);
        //formData.append("chanelId", chanelId);

        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };

        const res = await API.post(`/projek/${id}`, formData, config);

        setFormData({
        

          description: "",
          photo: "",
          
        });

        return res;
      } catch (error) {
        console.log(error);
      }
    });

    const [files, setFiles] = useState([]);
    const {
      acceptedFiles,
      fileRejections,
      getRootProps,
      getInputProps,
    } = useDropzone({
      maxFiles: 5,
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

    const acceptedFileItems = acceptedFiles.map((file) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
      </li>
    ));

    const fileRejectionItems = fileRejections.map(({ file, errors }) => {
      return (
        <li key={file.path}>
          {file.path} - {file.size} bytes
          <ul>
            {errors.map((e) => (
              <li key={e.code}>{e.message}</li>
            ))}
          </ul>
        </li>
      );
    });
     useEffect(
       () => () => {
         // Make sure to revoke the data uris to avoid memory leaks
         files.forEach((file) => URL.revokeObjectURL(file.preview));
       },
       [files]
     );
    return (
      <Col>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            tambah();
            refetch();
          }}
        >
            <Form.Group>
              <Form.Row>
                <Col>
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input
                      {...getInputProps()}
                      name="photo"
                      onChange={(e) => {
                        handleChange(e);
                        onChangeFiles(e);
                      }}
                    />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                  <div className="row mt-3">
                    <div className="col">
                      <div {...getRootProps({ className: "dropzone2" })}>
                        <input
                          {...getInputProps()}
                          name="photo"
                          onChange={(e) => {
                            handleChange(e);
                            onChangeFiles(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div {...getRootProps({ className: "dropzone2" })}>
                        <input
                          {...getInputProps()}
                          name="photo"
                          onChange={(e) => {
                            handleChange(e);
                            onChangeFiles(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div {...getRootProps({ className: "dropzone2" })}>
                        <input
                          {...getInputProps()}
                          name="photo"
                          onChange={(e) => {
                            handleChange(e);
                            onChangeFiles(e);
                          }}
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div {...getRootProps({ className: "dropzone2" })}>
                        <input
                          {...getInputProps()}
                          name="photo"
                          onChange={(e) => {
                            handleChange(e);
                            onChangeFiles(e);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
                <Col>
                
                  <Form.Group>
                    <Form.Control
                      as="textarea"
                      rows="3"
                      placeholder="Description"
                      name="description"
                      value={description}
                      onChange={(e) => handleChange(e)}
                    />
                  </Form.Group>
                  <Button
                    variant="primary"
                    size="lg"
                    style={{
                      backgroundColor: "#2FC4B2",
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
                    Post
                  </Button>
                </Col>
              </Form.Row>
            </Form.Group>

            <Col> </Col>
          </Form>
         
      </Col>
    );
};

export default FormProjek;