import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import AuthContext from "../../stores/auth-context";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./AuthForm.module.scss";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const AuthCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const isLoginHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const authSubmitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value.trim();
    const enteredPassword = passwordInputRef.current.value.trim();

    setIsLoading(true);
    let url;

    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDDMzCXVi3iQNMZrX1pPkwvGNew1T38HV8`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDDMzCXVi3iQNMZrX1pPkwvGNew1T38HV8`;
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.error && data.error.message) {
          alert(data.error.message);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          if (isLogin) {
            AuthCtx.login(data.idToken);
            navigate("/");
          } else {
            isLoginHandler();
            emailInputRef.current.value = "";
            passwordInputRef.current.value = "";
          }
        }
      });
  };

  return (
    <Col
      xs={12}
      sm={12}
      md={12}
      lg={6}
      xl={5}
      xxl={5}
      className={styles.authFormSection}
    >
      <Form className={styles.form} onSubmit={authSubmitHandler}>
        <div className={styles.formHeading}>
          <h1>{!isLogin ? "Sign up for free" : "Login to Picshub"}</h1>
          <span>and enhance your experience</span>
        </div>
        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            placeholder="Email"
            ref={emailInputRef}
            className={styles.formInput}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
            className={styles.formInput}
            required
          />
        </Form.Group>

        <Form.Group className={styles.formFooter}>
          <Button variant="warning" type="submit" className={styles.formButton}>
            {isLoading ? "Loading..." : !isLogin ? "SignUp" : "Login"}
          </Button>
          <p>
            or{" "}
            <span onClick={isLoginHandler}>
              {!isLogin ? "Login" : "Sign up"}
            </span>
          </p>
        </Form.Group>
      </Form>
    </Col>
  );
}

export default AuthForm;
