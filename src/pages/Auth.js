import React, { useContext } from "react";
import AuthForm from "../components/auth/AuthForm";
import AuthSlogan from "../components/auth/AuthSlogan";
import { Container, Row } from "react-bootstrap";
import NavActiveContext from "../stores/navactive-context";
import "../components/sass/_custom.scss";

function Auth() {
  const NavActiveCtx = useContext(NavActiveContext);

  React.useEffect(() => {
    NavActiveCtx.handleActiveTab("Auth");
  }, [NavActiveCtx]);

  return (
    <Container
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Row>
        <AuthSlogan />
        <AuthForm />
      </Row>
    </Container>
  );
}

export default Auth;
