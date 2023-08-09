import React, { Component, Fragment } from "react";
import { Grid } from "semantic-ui-react";
import TodoContent from "./TodoContent";
import DoneContent from "./DoneContent";
import firebase from "firebase/compat/app";
import Spinner from "../UI/Spinner";
import EmptyContentMessage from "./EmptyContentMessage";

class Content extends Component {
  state = {
    worksRef: firebase.database().ref("works"),
    workDateId: this.props.workDateId,
    toDoWorks: [],
    loading: true,
    doneworks: [],
    hasWork: true,
  };
  componentDidUpdate(prevProps) {
    if (this.props.workDateId !== prevProps.workDateId) {
      this.setState({
        loading: true,
        toDoWorks: [],
        doneWorks: [],
        workDateId: this.props.workDateId,
      });
      this.addListeners(this.props.workDateId);

      this.props.setWorkDateData([]);
    }
  }

  componentDidMount() {
    const { workDateId } = this.state;
    if (workDateId) this.addListeners(workDateId);
  }

  componentWillUnmount() {
    this.removeListeners();
  }
  addListeners(workDateId) {
    let toDoWorks = [];
    let doneWorks = [];
    const { worksRef } = this.state;

    worksRef.child(workDateId).on("child_added", (snap) => {
      this.retrieveWorks(snap.val(), snap.key, toDoWorks, doneWorks);
    });

    worksRef.child(workDateId).once("value", (snap) => {
      if (snap.numChildren() === 0) {
        this.setState({
          hasWork: false,
          loading: false,
          toDoWorks: [],
          doneWorks: [],
        });
      } else {
        this.setState({ hasWork: true });
      }
    });
  }

  retrieveWorks(work, key, toDoWorks, doneWorks) {
    if (work.status === "TODO") {
      toDoWorks.push({ id: key, ...work });
    } else {
      doneWorks.push({ id: key, ...work });
    }

    this.setState({
      toDoWorks: [...toDoWorks],
      doneWorks: [...doneWorks],
      loading: false,
    });
  }

  removeListeners = () => {
    this.state.worksRef.off();
  };
  render() {
    const { hasWork, loading, workDateId, toDoWorks, doneWorks } = this.state;
    return (
      <Fragment>
        {loading && <Spinner></Spinner>}
        {hasWork && (
          <Grid>
            <Grid.Column
              style={{
                width: "50%",
                float: "left",
                padding: "0px 10px 0px 0px",
              }}
            >
              <TodoContent
                key={`t${toDoWorks.length}`}
                toDoWorks={toDoWorks}
                workDateId={workDateId}
              ></TodoContent>
            </Grid.Column>
            <Grid.Column style={{ width: "50%", float: "right" }}>
              <DoneContent
                key={`t${toDoWorks.length}`}
                doneWorks={doneWorks}
                workDateId={workDateId}
              ></DoneContent>
            </Grid.Column>
          </Grid>
        )}
        {!hasWork && (
          <EmptyContentMessage
            style={{ top: "30px" }}
            workDate={this.props.workDate}
          ></EmptyContentMessage>
        )}
      </Fragment>
    );
  }
}

export default Content;
