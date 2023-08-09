import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";

import { auth, firestore } from "../../config/firebase";
import md5 from "md5";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    loading: false,
    errors: [],
    userRef: firestore.collection("users"),
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault(); //k cho trinh duyet gui data toi sever
    if (this.isFormValid()) {
      //kt data
      const { username, email, password, errors } = this.state;
      this.setState({ errors: [], loading: true });

      auth
        .createUserWithEmailAndPassword(email, password)
        .then((createdUser) => {
          // Sử dụng cơ sở dữ liệu Firestore
          // firestore.collection("users").doc(createdUser.user.uid).set({
          //   username: this.state.username,
          // });
          createdUser.user
            .updateProfile({
              displayName: username,
              photoURL: `http://gravatar.com/avatar/${md5(
                createdUser.user.email
              )} ? d=identicon`,
            })
            .then(() => {
              this.saveUser(createdUser).then(() => {
                console.log("user saved");
                toast.success("Register Account Success!");
                this.setState({ loading: false });
              });
            });
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message); // Hiển thị thông báo lỗi
          this.setState({ loading: false });
        });
    }
  };
  saveUser = (createdUser) => {
    return this.state.userRef.doc(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };
  isFormValid = () => {
    let errors = [];
    let error;
    const { username, email, password, passwordConfirmation } = this.state;

    if (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    ) {
      toast.error("Fill in all fields!", {});
      error = { message: "Fill in all fields" };
      this.setState({ errors: [...errors, error] });
      return false;
    } else if (
      password.length < 6 ||
      passwordConfirmation.length < 6 ||
      password !== passwordConfirmation
    ) {
      toast.error("Password is invalid!", {});
      error = { message: "Password is invalid" };
      this.setState({ errors: [...errors, error] });
      return false;
    }

    return true; // Nếu không có lỗi, trả về true để cho phép submit form
  };
  displayErrors = (errors) =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);
  handleInputError = (errors, inputName) => {
    return errors.some((error) =>
      error.message.toLowerCase().includes(inputName)
    )
      ? "error"
      : "";
  };

  render() {
    const { username, password, email, passwordConfirmation, loading } =
      this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h3" icon color="green">
            Register
          </Header>
          <Form size="large" onSubmit={this.handleSubmit}>
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="UserName"
                type="username"
                value={username}
                onChange={this.handleChange}
                className={this.handleInputError(this.state.errors, "username")}
              ></Form.Input>
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                type="email"
                value={email}
                onChange={this.handleChange}
                className={this.handleInputError(this.state.errors, "email")}
              ></Form.Input>
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                onChange={this.handleChange}
                className={this.handleInputError(this.state.errors, "password")}
              ></Form.Input>
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password Confirmation"
                type="password"
                value={passwordConfirmation}
                onChange={this.handleChange}
                className={this.handleInputError(
                  this.state.errors,
                  "passwordConfirmation"
                )}
              ></Form.Input>
              <Button
                className={loading ? "loading" : ""}
                color="green"
                fluid
                size="large"
              >
                Register
              </Button>
            </Segment>
          </Form>
          {/* {this.state.errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(this.state.errors)}
            </Message>
          )} */}
          <ToastContainer position="top-right" autoClose={5000} />
          <Message>
            Already a user? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Register;
