import React, { Component } from "react";
import "./styleSidebar.css";
import {
  refreshworkDateDataId,
  setWorkDate,
  setWorkDateData,
} from "../../redux/workdates/workDateAction";
import { connect } from "react-redux";
import { DateInput } from "semantic-ui-calendar-react";
import firebase from "firebase/compat/app";
import moment from "moment";
class UserBar extends Component {
  state = {
    workDatesRef: firebase.database().ref("workdates"),
  };
  componentDidMount() {
    const now = new Date();
    const day = ("0" + now.getDate()).slice(-2);
    const month = ("0" + (now.getMonth() + 1)).slice(-2);
    const st = day + "-" + month + "-" + now.getFullYear();
    this.handleWorkDateChange(null, { name: "", value: st });
  }
  handleWorkDateChange = (event, { name, value }) => {
    this.props.setWorkDate(value);
    this.state.workDatesRef
      .orderByChild("date")
      .equalTo(value)
      .once("value")
      .then((snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          const key = Object.keys(data)[0];

          this.props.setWorkDateData(data[key]);
        } else {
          this.props.setWorkDateData(null);
        }
      });
    console.log(value);
  };

  convertToAmLich = (day, month, year) => {
    const amLich = {
      ngay: parseInt(day) + 3,
      thang: parseInt(month) + 2,
      nam: "Quy Mao",
      nhuận: true,
    };
    return amLich;
  };

  render() {
    const { workDate } = this.props;
    const [day, month, year] = workDate.split("-");
    const amLichDate = this.convertToAmLich(day, month, year);

    return (
      <div>
        <div className="row2">
          <h2 className="item bld">Solar Calendar</h2>
          <h2 className="item bld">Lunar Calendar</h2>
        </div>

        <div id="box_lich">
          <div className="row3">
            <div className="inner txtCent">
              <div className="month bld">
                Month {month} Year {year}{" "}
              </div>
              <div className="day bld">{day}</div>
              <div className="txt"></div>
            </div>
            <div className="inner txtCent">
              <div className="month bld">
                Month {amLichDate.thang} Year {amLichDate.nam}{" "}
                {amLichDate.nhuận ? "profit" : ""}
              </div>
              <div className="day bld">{amLichDate.ngay}</div>
              <div className="txt"></div>
            </div>
          </div>
        </div>
        <DateInput
          name="date"
          inline
          placeholder="Date"
          value={this.props.workDate}
          onChange={this.handleWorkDateChange}
        ></DateInput>
      </div>
    );
  }
}
const mapStateToProps = ({
  workDates: { workDate, workDateData },
  users: { user },
}) => ({
  workDate: workDate,
  workDateData: workDateData,
  user: user,
});

const mapDispatchToProps = (dispatch) => ({
  setWorkDate: (workDate) => dispatch(setWorkDate(workDate)),
  setWorkDateData: (workDateData) => dispatch(setWorkDateData(workDateData)),
  refreshWorkDateDataId: (id) => dispatch(refreshworkDateDataId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserBar);
