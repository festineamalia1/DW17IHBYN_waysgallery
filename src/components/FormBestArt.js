import React, { useState, useContext, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { API } from "config/api";
import { useQuery, useMutation } from "react-query";
import { TaskContext } from "../context/TaskContext";
import { useDropzone } from "react-dropzone";
const FormBestArt = () => {
  const [state] = useContext(TaskContext);
  const userId = state.user.id;
  const { isLoading, error, data, refetch } = useQuery("getDetailBest", () =>
    API.get(`/best/${userId}`)
  );
  const [formData, setFormData] = useState({
   
    art: "",
  });
  const [previewSrc, setPreviewSrc] = useState(null);
  const {  art } = formData;
  const handleChange = (event) => {
    const updateForm = { ...formData };
    updateForm[event.target.name] =
      event.target.type === "file" ? event.target.files[0] : event.target.value;
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

     

      formData.append("art", art);

      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };

      const res = await API.post(`/best`, formData, config);

      setFormData({
        art: "",
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
          <div {...getRootProps({ className: "dropzone" })}>
            <input
              {...getInputProps()}
              name="art"
              onChange={(e) => {
                handleChange(e);
                onChangeFiles(e);
              }}
            />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
          <div className="row mt-3">
            <div className="col">
              <div {...getRootProps({ className: "dropzone2" })}>
                <input
                  {...getInputProps()}
                  name="art"
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
                  name="art"
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
                  name="art"
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
                  name="art"
                  onChange={(e) => {
                    handleChange(e);
                    onChangeFiles(e);
                  }}
                />
              </div>
            </div>
          </div>
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

export default FormBestArt;
