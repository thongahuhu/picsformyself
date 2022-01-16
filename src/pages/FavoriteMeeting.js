import React from "react";
import { useContext } from "react";
import FavoriteContext from "../stores/favorite-context";
import { Container, Row } from "react-bootstrap";
import MeetingList from "../components/meetings/MeetingList";
import NavActiveContext from "../stores/navactive-context";
import "bootstrap/dist/css/bootstrap.min.css";

function FavoriteMeeting() {
  const dataStorage = JSON.parse(localStorage.getItem("favorite"));
  const NavActiveCtx = useContext(NavActiveContext);
  const favoritesCtx = useContext(FavoriteContext);

  React.useEffect(() => {
    NavActiveCtx.handleActiveTab("Fav");

    if (dataStorage && dataStorage.length !== 0) {
      favoritesCtx.setUserFavorites(dataStorage.map((item) => item));
    }
  }, []);

  let content;

  if (!dataStorage || dataStorage.length === 0) {
    content = (
      <h1
        style={{
          color: "#f90",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        NOTHING.
      </h1>
    );
  } else {
    content = <MeetingList meetings={dataStorage} />;
  }

  return (
    <Container>
      <Row>{content}</Row>
    </Container>
  );
}

export default FavoriteMeeting;
