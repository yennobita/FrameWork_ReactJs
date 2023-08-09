import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Segment } from "semantic-ui-react";
import "./Style.css";

import { Button, Grid, Header, Message } from "semantic-ui-react";
import { auth } from "../../config/firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "firebase/compat/app";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      setLoading(true);
      auth
        .signInWithEmailAndPassword(email, password)
        .then((signInUser) => {
          console.log(signInUser);
          setLoading(false);
          toast.success("Login Success!", { autoClose: 3000 });
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          if (
            err.code === "auth/user-not-found" ||
            err.code === "auth/wrong-password"
          ) {
            toast.error("Invalid email or password!", { autoClose: 3000 });
          } else if (err.code === "auth/too-many-requests") {
            toast.error("Too many login attempts. Please try again later.", {
              autoClose: 3000,
            });
          }
        });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const isFormValid = () => {
    let isValid = true;

    if (!email || !password) {
      toast.error("Email or password is empty!", { autoClose: 3000 });
      isValid = false;
    } else if (!isEmailValid(email)) {
      toast.error("Invalid email format!");
      isValid = false;
    } else if (!isPasswordValid(password)) {
      toast.error("Password must be at least 6 characters long!", {
        autoClose: 3000,
      });
      isValid = false;
    }

    return isValid;
  };

  const isEmailValid = (email) => {
    // Thực hiện kiểm tra định dạng email ở đây
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isPasswordValid = (password) => {
    // Kiểm tra độ dài mật khẩu ở đây
    return password.length >= 6;
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider);
      toast.success("Login Success!");
      navigate("/");
    } catch (error) {
      toast.error("Login Faild!");
    }
  };
  return (
    <Grid textAlign="center" verticalAlign="middle" className="app">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h3" icon color="green">
          Login
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              fluid
              name="email"
              icon="mail"
              iconPosition="left"
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={handleChange}
            />
            <Form.Input
              fluid
              name="password"
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              value={password}
              onChange={handleChange}
            />
            <Button
              color="green"
              fluid
              size="large"
              className={loading ? "loading" : ""}
            >
              Login
            </Button>
          </Segment>
        </Form>
        <Button onClick={handleGoogleSignIn}>Sign In with Google</Button>

        <Message>
          Don't have an account? <Link to="/register">Register</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
}

export default Login;
