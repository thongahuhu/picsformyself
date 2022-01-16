import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./MainNav.module.scss";
import "../sass/_custom.scss";
import NavLinks from "./NavLinks";

function MainNav() {
  return (
    <Navbar className={styles.mainNav} expand="lg" fixed="top">
      <Container>
        <Navbar.Brand className={styles.navBrand}>
          <Link className={styles.navLogoLink} to={"/"}>
            picsformyself
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="mr-auto">
            <NavLinks />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNav;
