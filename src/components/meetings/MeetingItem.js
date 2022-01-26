import React from "react";
import { useContext, useState } from "react";
import FavoriteContext from "../../stores/favorite-context";
import AuthContext from "../../stores/auth-context";
import { Col, Card, Button } from "react-bootstrap";
import styles from "./MeetingItem.module.scss";
import "../sass/_custom.scss";
import Modal from "../modal/Modal";

function MeetingItem(props) {
  const favoritesCtx = useContext(FavoriteContext);
  const [openModal, setOpenModal] = useState(false);
  const [showOption, setShowOption] = useState();
  const AuthCtx = useContext(AuthContext);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);
  const dataStorage = JSON.parse(localStorage.getItem("favorite"));
  const videoRef = React.useRef();

  React.useEffect(() => {
    if (dataStorage && dataStorage.length !== 0) {
      favoritesCtx.setUserFavorites(dataStorage.map((item) => item));
    }
  }, []);

  React.useEffect(() => {
    const jpeg = "jpeg";
    const jpg = "jpg";
    const png = "png";
    if (props.image.includes(jpeg)) {
      setShowOption("image");
    } else if (props.image.includes(jpg)) {
      setShowOption("image");
    } else if (props.image.includes(png)) {
      setShowOption("image");
    } else {
      setShowOption("video");
    }
  }, [props.image]);

  const toggleFavorite = () => {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      favoritesCtx.addFavorite({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        address: props.address,
      });
    }
  };

  const handleOpenModal = (e) => {
    if (showOption === "video") {
      e.preventDefault();
    }
    setOpenModal(!openModal);
  };

  const setPropagation = (e) => {
    e.stopPropagation(); //Xử lý chỉ ẩn modal khi bấm vào backdrop còn card thì không bị ẩn
  };

  const handlePauseVideo = (e) => {
    e.preventDefault();
    videoRef.current.pause();
  };

  return (
    <>
      <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={3} className={styles.card}>
        <Card style={{ width: "18rem" }} className={styles.cardList}>
          {showOption === "image" ? (
            <Card.Img
              variant="top"
              src={props.image}
              className={styles.cardImg}
              onClick={handleOpenModal}
            />
          ) : (
            <video
              ref={videoRef}
              src={props.image}
              className={styles.cardImg}
              controls
              onClick={(e) => {
                handleOpenModal(e);
                handlePauseVideo(e);
              }}
            />
          )}

          <Card.Body className={styles.cardItem}>
            <Card.Title
              className={styles.cardItemTitle}
              onClick={handleOpenModal}
            >
              {props.title}
            </Card.Title>
            <Card.Text
              className={styles.cardItemAddress}
              onClick={handleOpenModal}
            >
              {props.address}
            </Card.Text>
            <Card.Text
              className={styles.cardItemDesc}
              onClick={handleOpenModal}
            >
              {props.description}
            </Card.Text>
            {AuthCtx.isLoggedIn && (
              <Button
                variant="warning"
                className={styles.cardItemBtn}
                onClick={toggleFavorite}
              >
                {itemIsFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            )}
          </Card.Body>
        </Card>
      </Col>
      {openModal && (
        <Modal
          props={props}
          setPropagation={setPropagation}
          onCancel={handleOpenModal}
          openState={openModal}
        />
      )}
    </>
  );
}

export default MeetingItem;
