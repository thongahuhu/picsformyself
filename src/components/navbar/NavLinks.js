import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import NavActiveContext from "../../stores/navactive-context";
import FavoriteContext from "../../stores/favorite-context";
import styles from "./NavLinks.module.scss";

function NavLinks(props) {
  const NavActiveCtx = useContext(NavActiveContext);
  const FavoriteCtx = useContext(FavoriteContext);

  const { active, handleActiveTab } = NavActiveCtx;

  return (
    <Nav className="mr-auto">
      <Link
        to={"/"}
        className={`${active === "All" ? styles.active : styles.navLinks}`}
        onClick={() => {
          handleActiveTab("All");
        }}
      >
        All Pictures
      </Link>
      <Link
        to={"/add-meeting"}
        className={`${active === "Add" ? styles.active : styles.navLinks}`}
        onClick={() => {
          handleActiveTab("Add");
        }}
      >
        Add Pictures
      </Link>
      <Link
        to={"/favorite-meeting"}
        className={`${active === "Fav" ? styles.active : styles.navLinks}`}
        onClick={() => {
          handleActiveTab("Fav");
        }}
      >
        Favorite Pictures{" "}
        <span className={styles.totalFavorite}>
          {FavoriteCtx.favoriteNumber}
        </span>
      </Link>
    </Nav>
  );
}

export default NavLinks;
