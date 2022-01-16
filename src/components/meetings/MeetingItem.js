import React from "react";
import { useContext, useState } from "react";
import FavoriteContext from "../../stores/favorite-context";
import { Col, Card, Button } from "react-bootstrap";
import styles from "./MeetingItem.module.scss";
import "../sass/_custom.scss";
import Modal from "../modal/Modal";

function MeetingItem(props) {
  const favoritesCtx = useContext(FavoriteContext);
  const [openModal, setOpenModal] = useState(false);
  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);
  const dataStorage = JSON.parse(localStorage.getItem("favorite"));

  React.useEffect(() => {
    if (dataStorage && dataStorage.length !== 0) {
      favoritesCtx.setUserFavorites(dataStorage.map((item) => item));
    }
  }, []);

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

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const setPropagation = (e) => {
    e.stopPropagation(); //Xử lý chỉ ẩn modal khi bấm vào backdrop còn card thì không bị ẩn
  };

  return (
    <>
      <Col xs={12} sm={12} md={6} lg={4} xl={4} xxl={3} className={styles.card}>
        <Card style={{ width: "18rem" }} className={styles.cardList}>
          <Card.Img
            variant="top"
            src={props.image}
            className={styles.cardImg}
            onClick={handleOpenModal}
          />

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
            <Button
              variant="warning"
              className={styles.cardItemBtn}
              onClick={toggleFavorite}
            >
              {itemIsFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </Button>
          </Card.Body>
        </Card>
      </Col>
      {openModal && (
        <Modal
          props={props}
          setPropagation={setPropagation}
          onCancel={handleOpenModal}
        />
      )}
    </>
  );
}

export default MeetingItem;
