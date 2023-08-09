import React, { Component } from "react";
import { Header } from "semantic-ui-react";

class HeaderBar extends Component {
  render() {
    return (
      <Header
        style={{
          background: "#88c685",
          height: "35px",
          lineHeight: "25px",
          color: "#fff",
          fontSize: "14pt",
          padding: "5px 0",
          fontWeight: "600",
          margin: "0",
        }}
      >
        <i className="calendar alternate icon"></i>
        <Header.Content style={{ paddingLeft: "240px" }}>
          CALENDAR
        </Header.Content>
      </Header>
    );
  }
}

export default HeaderBar;
