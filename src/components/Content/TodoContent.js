import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Divider, Header, Icon, Segment } from "semantic-ui-react";
import { refreshworkDateDataId } from "../../redux/workdates/workDateAction";
import firebase from "firebase/compat/app";
import { toast } from "react-toastify";

class TodoContent extends Component {
  state = {
    worksRef: firebase.database().ref("works"),
  };
  handleDeleteWork = (work) => {
    const { worksRef } = this.state;
    const { workDateId } = this.props;

    worksRef
      .child(workDateId)
      .child(work.id)
      .remove()
      .then(() => {
        this.props.refreshWorkDateDateId(Math.random());
        toast.success("Remove Work Success!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Remove Work Faild!");
      });
  };
  handleUpdateStatus = (work) => {
    const { worksRef } = this.state;
    const { workDateId } = this.props;

    worksRef
      .child(workDateId)
      .child(work.id)
      .update({
        name: work.name,
        status: "DONE",
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      })
      .then((updatedWork) => {
        console.log(updatedWork);
        this.props.refreshWorkDateDateId(workDateId);
        this.props.addNewWorkToStore({ ...work, status: "DONE" });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    const { toDoWorks } = this.props;
    return (
      <Segment stacked>
        <Header>
          <Icon name="bell" color="red"></Icon>
          <Header.Content>TO-DO</Header.Content>
        </Header>
        <Divider></Divider>
        {toDoWorks &&
          toDoWorks.length > 0 &&
          toDoWorks.map((item) => (
            <Segment key={item.id} attached clearing>
              {item.name}
              <Button
                icon="trash alternate"
                inverted
                color="red"
                floated="right"
                size="tiny"
                onClick={() => this.handleDeleteWork(item)}
              ></Button>
              <Button
                icon="checkmark"
                inverted
                color="green"
                floated="right"
                size="tiny"
                onClick={() => this.handleUpdateStatus(item)}
              ></Button>
            </Segment>
          ))}
      </Segment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  refreshWorkDateDateId: (id) => dispatch(refreshworkDateDataId(id)),
});

export default connect(null, mapDispatchToProps)(TodoContent);
