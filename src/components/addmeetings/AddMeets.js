import React from "react";
import { useRef, useState } from "react";
import { Form, Button, Dropdown, ProgressBar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./AddMeets.module.scss";
import "../sass/_custom.scss";
import { storage } from "../../firebase/config";
import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";

function AddMeets(props) {
  const [optionPost, setOptionPost] = useState();
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  const [urlImg, setUrlImg] = useState();
  const [progress, setProgress] = useState();

  React.useEffect(() => {
    return () => {
      preview && URL.revokeObjectURL(preview); //Xóa ảnh preview cũ để không làm tràn bộ nhớ
    };
  }, [preview]);

  const titleInputRef = useRef();
  const addressInputRef = useRef();
  const descInputRef = useRef();

  const formHandler = (e) => {
    setPreview(!props.edit && URL.createObjectURL(e.target.files[0])); //Nếu dùng cho edit sẽ không có ảnh preview vì làm lỗi giao diện
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUploadFileImage = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `files/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100 //Dùng để làm thanh progress tải lên
        );
        setProgress(prog);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          //Tạo link ảnh trên firebase Storage
          postData(url);
        });
      }
    );
  };

  const handleUploadURLImage = (e) => {
    e.preventDefault();

    postData(urlImg);
  };

  const postData = (url) => {
    const enteredTitle = titleInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDesc = descInputRef.current.value;
    const meetingData = {
      title: enteredTitle,
      image: url,
      address: enteredAddress,
      description: enteredDesc,
    };

    !props.edit
      ? props.onAddMeeting(meetingData)
      : props.handleEditData(meetingData);
    //Truyền dữ liệu cho AddMeetings.js để POST data lên server
  };

  return (
    <Form
      onSubmit={urlImg ? handleUploadURLImage : handleUploadFileImage}
      className={styles.form}
      onClick={(e) => {
        props.edit && props.onPropagation(e);
      }}
    >
      <Form.Group className="mb-3" controlId="form">
        <Form.Label className={styles.formLabel}>Picture Title</Form.Label>
        <Form.Control
          type="text"
          className={styles.formControl}
          ref={titleInputRef}
          placeholder="Enter title..."
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="form">
        <Form.Label className={styles.formLabel}>Picture Source</Form.Label>
        <Form.Control
          type="text"
          className={styles.formControl}
          ref={addressInputRef}
          placeholder="Enter address..."
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label className={styles.formLabel}>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          className={styles.formControl}
          ref={descInputRef}
          placeholder="Enter description..."
        />
      </Form.Group>

      {optionPost === "url" && (
        <Form.Group className="mb-3" controlId="form">
          <Form.Label className={styles.formLabel}>Picture (URL)</Form.Label>
          <Form.Control
            type="text"
            required
            className={styles.formControl}
            onChange={(e) => {
              setPreview(!props.edit && e.target.value);
              setUrlImg(e.target.value);
            }}
            placeholder="Enter URL..."
          />
        </Form.Group>
      )}

      {optionPost === "file" && (
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label className={styles.formLabel}>Picture (File)</Form.Label>
          <Form.Control
            required
            type="file"
            className={styles.formControl}
            onChange={(e) => formHandler(e)}
          />
        </Form.Group>
      )}

      <Dropdown className={styles.formDrop}>
        <Dropdown.Toggle variant="warning" id="dropdown-basic">
          Posting Options
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles.formDropMenu}>
          <Dropdown.Item
            onClick={() => setOptionPost("url")}
            className={styles.formDropMenuItem}
          >
            URL
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setOptionPost("file")}
            className={styles.formDropMenuItem}
          >
            File
          </Dropdown.Item>
        </Dropdown.Menu>
        {preview && <img src={preview} alt="" className={styles.previewPic} />}
      </Dropdown>

      {progress > 0 && (
        <ProgressBar now={progress} label={`${progress}%`} variant="warning" />
      )}

      <Form.Group className={styles.formBtn}>
        <Button variant="warning" type="submit">
          {!props.edit ? "Add Picture" : "Edit Picture"}
        </Button>
      </Form.Group>
    </Form>
  );
}

export default AddMeets;
