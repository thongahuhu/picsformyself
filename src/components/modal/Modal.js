import React from "react";
import { forwardRef, useContext } from "react";
import { Card, Button, Container, Row } from "react-bootstrap";
import { remove, ref, update } from "firebase/database";
import { db } from "../../firebase/config";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./Modal.module.scss";
import LoadingContext from "../../stores/getData-context";
import FavoriteContext from "../../stores/favorite-context";
import { storage } from "../../firebase/config";
import { ref as refFirebase, deleteObject } from "firebase/storage";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import AddMeets from "../addmeetings/AddMeets";
import clsx from "clsx";

function Modal(props, backDropRef) {
  const LoadedMeetingsCtx = useContext(LoadingContext);
  const FavoriteCtx = useContext(FavoriteContext);
  const [edit, setEdit] = React.useState(false);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      remove(ref(db, `meetings/${id}`));
      FavoriteCtx.removeFavorite(props.props.id);
      setTimeout(() => {
        LoadedMeetingsCtx.getData();
      }, 1000);
      props.onCancel();
      const imageStorageRef = refFirebase(storage, props.props.image);
      deleteObject(imageStorageRef);
    }
  };

  const handleEditData = (data) => {
    update(ref(db, `meetings/${props.props.id}`), data);
    setTimeout(() => {
      LoadedMeetingsCtx.getData();
    }, 1000);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <div className={styles.backDrop} ref={backDropRef} onClick={props.onCancel}>
      <Card
        style={{ width: "20rem" }}
        className={clsx(styles.card, {
          [styles.displayNone]: edit,
        })}
        onClick={(e) => props.setPropagation(e)}
      >
        <Zoom>
          <picture>
            <Card.Img
              variant="top"
              src={props.props.image}
              className={styles.cardImg}
            />
          </picture>
        </Zoom>
        <Card.Body className={styles.cardBody}>
          <Card.Title className={styles.cardTitle}>
            {props.props.title}
          </Card.Title>
          <Card.Text className={styles.cardAddress}>
            {props.props.address}
          </Card.Text>
          <Card.Text className={styles.cardDesc}>
            {props.props.description}
          </Card.Text>
          <Button
            variant="warning"
            className={styles.cardBtn}
            onClick={() => handleDelete(props.props.id)}
          >
            Delete
          </Button>
          <Button
            variant="warning"
            className={styles.cardBtn}
            onClick={handleEdit}
          >
            Edit
          </Button>
        </Card.Body>
      </Card>
      {edit && (
        <Container className={styles.editContainer}>
          <Row>
            <AddMeets
              onPropagation={props.setPropagation}
              handleEditData={handleEditData}
              edit={edit}
            />
          </Row>
        </Container>
      )}
    </div>
  );
}

export default forwardRef(Modal);
