import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Divider, Header, Icon, Segment } from "semantic-ui-react";
import { refreshworkDateDataId } from "../../redux/workdates/workDateAction";
import firebase from "firebase/compat/app";
import { toast } from "react-toastify";

class DoneContent extends Component {
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
  render() {
    const { doneWorks } = this.props;
    return (
      <Segment stacked>
        <Header>
          <Icon name="calendar check outline" color="green"></Icon>
          <Header.Content>DONE</Header.Content>
        </Header>
        <Divider></Divider>

        {doneWorks &&
          doneWorks.length > 0 &&
          doneWorks.map((item) => (
            <Segment attached clearing key={item.id}>
              {item.name}
              <Button
                icon="trash alternate"
                inverted
                color="red"
                floated="right"
                size="tiny"
                onClick={() => {
                  this.handleDeleteWork(item);
                }}
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

export default connect(null, mapDispatchToProps)(DoneContent);
