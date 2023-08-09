import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { Dimmer, Loader } from "semantic-ui-react";

const Spinner = () => {
  return (
    <Dimmer active>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ThreeDots type="ThreeDots" color="#00BFFF" height={80} width={80} />
      </div>
    </Dimmer>
  );
};

export default Spinner;
