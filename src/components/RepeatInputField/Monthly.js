import React, { useState } from "react";

import { connect } from "react-redux";
import {
  SET_MONTHLY_SUBTYPE,
  SET_MONTHLY_INTERVAL,
  SET_MONTHLY_ARG1_MONTHDAY,
  SET_MONTHLY_ARG2_DAY,
  SET_MONTHLY_ARG2_SETPOS,
} from "../../redux/types";

import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    textAlign: "start",
    marginTop: "10px",
    width: "100%",
  },
  textField: {
    marginTop: "10px",
  },
  disabledClass: {
    pointerEvents: "none",
    opacity: "0.4",
  },
  radioButton: {
    alignSelf: "center",
  },
});

function Monthly({ dispatch }) {
  const [value, setValue] = useState("month-day");
  const [every, setEvery] = useState(1);
  const [day, setDay] = useState(1);
  const [weekNumber, setweekNumber] = useState("First");
  const [weekName, setWeekName] = useState("Monday");
  const classes = useStyles();
  const weekNumbers = ["First", "Second", "Third", "Fourth", "Last"];
  const renderDaysOptions = () => {
    const daysHtml = [];
    for (let i = 1; i <= 31; i++) {
      let tempHtml = <MenuItem value={i}>{i}</MenuItem>;
      daysHtml.push(tempHtml);
    }
    return daysHtml;
  };
  const renderWeeksNumberOptions = () => {
    return weekNumbers.map((week) => <MenuItem value={week}>{week}</MenuItem>);
  };
  const renderWeekNamesOptions = () => {
    const weekNames = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return weekNames.map((week) => <MenuItem value={week}>{week}</MenuItem>);
  };
  const renderFormField = (onChangeHandler, value, renderOptions) => {
    return (
      <FormControl variant="outlined" fullWidth>
        <Select
          style={{ textAlign: "left" }}
          onChange={(event) => {
            onChangeHandler(event.target.value);
          }}
          value={value}
        >
          {renderOptions()}
        </Select>
      </FormControl>
    );
  };
  return (
    <div className={classes.root}>
      <FormControl style={{ width: "100%" }} component="fieldset">
        <Grid container spacing={2} style={{ width: "100%" }}>
          <Grid item xs={1.5}>
            <p> every </p>
          </Grid>

          <Grid item xs={5} style={{ alignSelf: "center" }}>
            <TextField
              fullWidth
              variant="outlined"
              type="number"
              autoComplete="current-password"
              value={every}
              onChange={(event) => {
                let temp = event.target.value;
                if (temp === "") {
                  temp = "0";
                }
                setEvery(parseInt(temp));
                dispatch({
                  type: SET_MONTHLY_INTERVAL,
                  payload: temp,
                });
              }}
            />
          </Grid>
          <Grid item xs={1.5}>
            <p> month{"(s)"} </p>
          </Grid>
        </Grid>
        <RadioGroup
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            dispatch({
              type: SET_MONTHLY_SUBTYPE,
              payload: event.target.value,
            });
          }}
        >
          <Grid container className={classes.textField}>
            <Grid item xs={1} className={classes.radioButton}>
              <FormControlLabel
                name="type"
                value="month-day"
                control={<Radio />}
              />
            </Grid>
            <Grid
              item
              xs={11}
              container
              className={value === "month-day" ? "" : classes.disabledClass}
              spacing={2}
            >
              <Grid item xs={1.5}>
                <p> on day </p>
              </Grid>

              <Grid item xs={4}>
                {renderFormField(
                  (value) => {
                    setDay(value);
                    dispatch({
                      type: SET_MONTHLY_ARG1_MONTHDAY,
                      payload: value,
                    });
                  },
                  day,
                  renderDaysOptions
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid container className={classes.textField}>
            <Grid item xs={1} className={classes.radioButton}>
              <FormControlLabel
                name="type"
                value="week-day"
                control={<Radio />}
              />
            </Grid>
            <Grid
              spacing={2}
              xs={11}
              item
              container
              className={value === "week-day" ? "" : classes.disabledClass}
            >
              <Grid item xs={1.5}>
                <p>on the </p>
              </Grid>
              <Grid item xs={4}>
                {renderFormField(
                  (value) => {
                    setweekNumber(value);
                    dispatch({
                      type: SET_MONTHLY_ARG2_SETPOS,
                      payload: 1 + weekNumbers.findIndex((wk) => wk === value),
                    });
                  },
                  weekNumber,
                  renderWeeksNumberOptions
                )}
              </Grid>
              <Grid item xs={5}>
                {renderFormField(
                  (value) => {
                    setWeekName(value);
                    dispatch({ type: SET_MONTHLY_ARG2_DAY, payload: value });
                  },
                  weekName,
                  renderWeekNamesOptions
                )}
              </Grid>
            </Grid>
          </Grid>
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default connect(null)(Monthly);
