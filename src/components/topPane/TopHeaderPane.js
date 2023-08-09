import React, { Component, Fragment } from "react";
import { Button, Form, Icon, Input, Modal, Segment } from "semantic-ui-react";
import {
  refreshworkDateDataId,
  setWorkDate,
  setWorkDateData,
} from "../../redux/workdates/workDateAction";
import { connect } from "react-redux";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/firestore";
import { toast } from "react-toastify";

class TopHeaderPane extends Component {
  state = {
    modal: false,
    workName: "",
    workDatesRef: firebase.database().ref("workdates"),
    worksRef: firebase.database().ref("works"),
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    const { workName, worksRef } = this.state;
    if (this.props.workDateData) {
      this.saveWork(this.props.workDateData.id, workName, worksRef);
      toast.success("Add New Work Success!");
    } else {
      this.saveWorkDate();
    }
  };
  saveWorkDate = () => {
    if (this.isFormValid(this.state)) {
      const { workDatesRef, workName, worksRef } = this.state;
      const { workDate } = this.props;
      const { user } = this.props;
      const key = workDatesRef.push().key;
      const newWorkData = {
        id: key,
        date: workDate,
        uid: user.uid,
      };
      console.log(key);
      console.log(newWorkData);
      console.log(workDatesRef.child(key));
      workDatesRef
        .child(key)
        .update(newWorkData)
        .then((data) => {
          console.log(data);
          this.saveWork(key, workName, worksRef);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  saveWork = (key, workName, worksRef) => {
    const newWork = {
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      name: workName,
      status: "TODO",
    };

    worksRef
      .child(key)
      .push()
      .set(newWork)
      .then(() => {
        console.log("save work");
        this.closeModal();
        this.props.refreshWorkDateDataId(Math.random());
      })
      .catch((err) => {
        console.log(err);
      });
  };
  isFormValid = ({ workName }) => workName;

  closeModal = () => {
    this.setState({ modal: false });
  };

  openModal = () => {
    this.setState({ modal: true });
  };
  render() {
    const { modal } = this.state;

    return (
      <Fragment>
        <Segment clearing>
          <Button icon="plus" floated="right" onClick={this.openModal}></Button>
        </Segment>
        <Modal basic open={modal} onClose={this.closeModal}>
          <Modal.Header>Add a work</Modal.Header>
          <Modal.Content>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <Input
                  label="work Name : "
                  name="workName"
                  onChange={this.handleChange}
                ></Input>
              </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
            <Button color="green" inverted onClick={this.handleSubmit}>
              <Icon name="checkmark"></Icon>Add
            </Button>
            <Button color="red" inverted onClick={this.closeModal}>
              <Icon name="remove"></Icon>Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Fragment>
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
  setWorkDateData: (WorkDateData) => dispatch(setWorkDateData(WorkDateData)),
  refreshWorkDateDataId: (id) => dispatch(refreshworkDateDataId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopHeaderPane);
