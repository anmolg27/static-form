import React, { useState } from "react";

import { connect } from "react-redux";
import {
  SET_YEARLY_SUBTYPE,
  SET_YEARLY_ARG2_MONTH,
  SET_YEARLY_ARG2_MONTHDAY,
  SET_YEARLY_ARG3_SETPOS,
  SET_YEARLY_ARG3_DAY,
  SET_YEARLY_ARG3_MONTH,
} from "../../redux/types";

import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    textAlign: "start",
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

function Yearly({ dispatch }) {
  const [value, setValue] = useState("month-day");
  const [month, setMonth] = useState("Jan");

  const [day, setDay] = useState(1);
  const [weekNumber, setweekNumber] = useState("First");
  const [weekName, setWeekName] = useState("Monday");
  const classes = useStyles();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const weekNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const weekNumbers = ["First", "Second", "Third", "Fourth", "Last"];

  const renderMonthsOptions = () => {
    return months.map((month) => <MenuItem value={month}>{month}</MenuItem>);
  };
  const renderDaysOptions = () => {
    const daysHtml = [];
    if (["Jan", "March", "May", "Jul", "Aug", "Oct", "Dec"].includes(month)) {
      for (let i = 1; i <= 31; i++) {
        let tempHtml = <MenuItem value={i}>{i}</MenuItem>;
        daysHtml.push(tempHtml);
      }
      return daysHtml;
    } else if (["Apr", "Jun", "Sep", "Nov"].includes(month)) {
      for (let i = 1; i <= 30; i++) {
        let tempHtml = <MenuItem value={i}>{i}</MenuItem>;
        daysHtml.push(tempHtml);
      }
      return daysHtml;
    } else if (month === "Feb") {
      for (let i = 1; i <= 29; i++) {
        let tempHtml = <MenuItem value={i}>{i}</MenuItem>;
        daysHtml.push(tempHtml);
      }
      return daysHtml;
    }
  };
  const renderWeeksNumberOptions = () => {
    return weekNumbers.map((week) => <MenuItem value={week}>{week}</MenuItem>);
  };
  const renderWeekNamesOptions = () => {
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
        <RadioGroup
          value={value}
          onChange={(event) => {
            dispatch({ type: SET_YEARLY_SUBTYPE, payload: event.target.value });
            setValue(event.target.value);
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
              <Grid item xs={2}>
                <p> on </p>
              </Grid>

              <Grid item xs={3}>
                {renderFormField(
                  (value) => {
                    setMonth(value);
                    dispatch({
                      type: SET_YEARLY_ARG2_MONTH,
                      payload: 1 + months.findIndex((month) => month === value),
                    });
                  },
                  month,
                  renderMonthsOptions
                )}
              </Grid>
              <Grid item xs={3}>
                {renderFormField(
                  (value) => {
                    setDay(value);
                    dispatch({
                      type: SET_YEARLY_ARG2_MONTHDAY,
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
              <Grid item xs={2}>
                <p>on the</p>
              </Grid>
              <Grid item xs={3}>
                {renderFormField(
                  (value) => {
                    setweekNumber(value);
                    dispatch({
                      type: SET_YEARLY_ARG3_SETPOS,
                      payload: 1 + weekNumbers.findIndex((wk) => wk === value),
                    });
                  },
                  weekNumber,
                  renderWeeksNumberOptions
                )}
              </Grid>
              <Grid item xs={3}>
                {renderFormField(
                  (value) => {
                    setWeekName(value);
                    dispatch({ type: SET_YEARLY_ARG3_DAY, payload: value });
                  },
                  weekName,
                  renderWeekNamesOptions
                )}
              </Grid>
              <Grid item xs={1}>
                <p>of</p>
              </Grid>
              <Grid item xs={3}>
                {renderFormField(
                  (value) => {
                    setMonth(value);
                    dispatch({
                      type: SET_YEARLY_ARG3_MONTH,
                      payload: 1 + months.findIndex((month) => month === value),
                    });
                  },
                  month,
                  renderMonthsOptions
                )}
              </Grid>
            </Grid>
          </Grid>
        </RadioGroup>
      </FormControl>
    </div>
  );
}

export default connect(null)(Yearly);
