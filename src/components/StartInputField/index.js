import React from "react";
import { connect } from "react-redux";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

import { SET_START_DATE } from "../../redux/types";
function StartInputField({ dispatch }) {
  return (
    <>
      <TextField
        style={{ height: "100%" }}
        variant="filled"
        id="date"
        defaultValue={moment(new Date()).format("yyyy-MM-DD")}
        onChange={(event) => {
          dispatch({ type: SET_START_DATE, payload: event.target.value });
        }}
        type="date"
      />
    </>
  );
}
export default connect(null)(StartInputField);
