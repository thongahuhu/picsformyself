import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import NavActiveContext from "../../stores/navactive-context";
import FavoriteContext from "../../stores/favorite-context";
import AuthContext from "../../stores/auth-context";
import styles from "./NavLinks.module.scss";
import NavUser from "./NavUser";

function NavLinks(props) {
  const NavActiveCtx = useContext(NavActiveContext);
  const FavoriteCtx = useContext(FavoriteContext);
  const AuthCtx = useContext(AuthContext);

  const { active, handleActiveTab } = NavActiveCtx;

  return (
    <Nav className="mr-auto">
      {AuthCtx.isLoggedIn && (
        <>
          <Link
            to={"/"}
            className={`${active === "All" ? styles.active : styles.navLinks}`}
            onClick={() => {
              handleActiveTab("All");
            }}
          >
            Your Gallery
          </Link>
          <Link
            to={"/add-meeting"}
            className={`${active === "Add" ? styles.active : styles.navLinks}`}
            onClick={() => {
              handleActiveTab("Add");
            }}
          >
            Add Gallery
          </Link>
          <Link
            to={"/favorite-meeting"}
            className={`${active === "Fav" ? styles.active : styles.navLinks}`}
            onClick={() => {
              handleActiveTab("Fav");
            }}
          >
            Favorite Gallery{" "}
            <span className={styles.totalFavorite}>
              {FavoriteCtx.favoriteNumber}
            </span>
          </Link>
        </>
      )}
      <NavUser />
    </Nav>
  );
}

export default NavLinks;
