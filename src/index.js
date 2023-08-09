import React, { Fragment, useEffect } from "react";
import { Route, BrowserRouter, useNavigate, Routes } from "react-router-dom";
import { Provider, connect, useDispatch } from "react-redux";
import store from "./redux/store";
import { auth } from "./config/firebase";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "semantic-ui-css/semantic.min.css";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { createRoot } from "react-dom/client";
import { clearUser, setUser } from "./redux/users/userAction";
import { ToastContainer } from "react-toastify";
import Weather from "./components/weather/Weather";
import Worklist from "./components/worklist/Worklist";

function Root({ loading }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user)); // Dispatch the setUser action
      } else {
        dispatch(clearUser()); // Dispatch the clearUser action
      }
    });

    // Clean up the subscription
    return () => unsubscribe();
  }, [dispatch, navigate]);
  return (
    <Fragment>
      <Routes>
        <Route exact path="/" element={<Weather />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/worklist" element={<Worklist />} />
      </Routes>
    </Fragment>
  );
}
const mapStateToProps = ({ users: { loading } }) => ({ loading: loading });
const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  clearUser: () => dispatch(clearUser()),
});
const ConnectedRoot = connect(mapStateToProps, mapDispatchToProps)(Root);

const RootWithAuth = () => <ConnectedRoot loading={false} />;

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <RootWithAuth />
      <ToastContainer />
    </BrowserRouter>
  </Provider>
);

reportWebVitals();
