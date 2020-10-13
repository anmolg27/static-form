import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import {
  SET_END_SUBTYPE,
  SET_END_ON_DATE,
  SET_END_AFTER_INTERVAL,
} from "../../redux/types";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import moment from "moment";

function End({ dispatch }) {
  const [type, setType] = useState("Never");
  const [interval, setInterval] = useState(1);
  const [date, setDate] = useState(moment(new Date()).format("yyyy-MM-DD"));
  useEffect(() => {
    dispatch({ type: SET_END_SUBTYPE, payload: type });
  }, [type]);
  const renderMoreFields = () => {
    if (type === "Never") return null;
    else if (type === "After")
      return (
        <>
          <Grid item xs={6}>
            <TextField
              style={{ height: "100%" }}
              size="medium"
              value={interval}
              fullWidth
              onChange={(event) => {
                let temp = event.target.value;
                if (temp === "") {
                  temp = 0;
                }
                setInterval(parseInt(temp));
                dispatch({ type: SET_END_AFTER_INTERVAL, payload: temp });
              }}
              variant="outlined"
              type="number"
            />
          </Grid>
          <Grid item xs={6} style={{ alignSelf: "center", textAlign: "start" }}>
            executions.
          </Grid>
        </>
      );
    else if (type === "On Date")
      return (
        <>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              style={{ height: "100%" }}
              id="date"
              value={date}
              type="date"
              onChange={(event) => {
                setDate(event.target.value);
                dispatch({
                  type: SET_END_ON_DATE,
                  payload: event.target.value,
                });
              }}
            />
          </Grid>
        </>
      );
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={5}>
        <FormControl fullWidth variant="outlined">
          <Select
            style={{ textAlign: "left" }}
            onChange={(event) => setType(event.target.value)}
            value={type}
          >
            <MenuItem value="Never">Never</MenuItem>
            <MenuItem value="After">After</MenuItem>
            <MenuItem value="On Date">On Date</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={7} container spacing={2}>
        {renderMoreFields()}
      </Grid>
    </Grid>
  );
}

export default connect(null)(End);
