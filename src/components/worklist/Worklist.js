import React, { Component } from "react";
import { Divider, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import SideBar from "../sideBar/SideBar";
import Content from "../Content/Content";
import { setUser, clearUser } from "../../redux/users/userAction";
import "react-toastify/dist/ReactToastify.css";
import EmptyContentMessage from "../Content/EmptyContentMessage";
import Navbar from "../navbar/Navbar";
import TopHeaderPane from "../topPane/TopHeaderPane";
class Worklist extends Component {
  render() {
    const { workDate, workDateData, refreshWorkDateDataId } = this.props;
    return (
      <Grid stretched style={{ background: "#eee" }} stackable>
        <Navbar />
        <SideBar style={{ width: "70%%", float: "left" }}></SideBar>
        <Grid
          style={{
            width: "60%",
            float: "right",
            paddingRight: "120px",
            paddingLeft: "20px",
          }}
        >
          <Grid.Column>
            <Grid.Row>
              <TopHeaderPane />
            </Grid.Row>
            <Divider></Divider>
            <Grid.Row>
              {this.props.workDateData ? (
                <Content
                  key={`${workDateData.id}${refreshWorkDateDataId}`}
                  workDateId={workDateData.id}
                  workDate={workDate}
                ></Content>
              ) : (
                <EmptyContentMessage
                  key={workDate}
                  workDate={workDate}
                ></EmptyContentMessage>
              )}
            </Grid.Row>
          </Grid.Column>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({
  users: { loading },
  workDates: { workDate, workDateData, refreshWorkDateDataId },
}) => ({
  workDate: workDate,
  workDateData,
  refreshWorkDateDataId,
});
const mapDispatchToProps = (dispatch) => ({
  setUser: (user) => dispatch(setUser(user)),
  clearUser: () => dispatch(clearUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Worklist);
