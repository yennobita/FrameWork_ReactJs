import React, { Component } from "react";
import { Segment } from "semantic-ui-react";
import HeaderBar from "./HeaderBar";
import UserBar from "./UserBar";

class SideBar extends Component {
  render() {
    return (
      <Segment style={{ width: "35%", position: "unset" }}>
        <HeaderBar></HeaderBar>
        <UserBar></UserBar>
      </Segment>
    );
  }
}

export default SideBar;
