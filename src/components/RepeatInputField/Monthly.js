import React, { useState } from "react";

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

export default function Monthly() {
  const [value, setValue] = useState("month-day");

  const [day, setDay] = useState(1);
  const [weekNumber, setweekNumber] = useState("First");
  const [weekName, setWeekName] = useState("Monday");
  const classes = useStyles();
  const renderDaysOptions = () => {
    const daysHtml = [];
    for (let i = 1; i <= 31; i++) {
      let tempHtml = <MenuItem value={i}>{i}</MenuItem>;
      daysHtml.push(tempHtml);
    }
    return daysHtml;
  };
  const renderWeeksNumberOptions = () => {
    const weekNumbers = ["First", "Second", "Third", "Fourth", "Last"];
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
            />
          </Grid>
          <Grid item xs={1.5}>
            <p> month{"(s)"} </p>
          </Grid>
        </Grid>
        <RadioGroup
          value={value}
          onChange={(event) => setValue(event.target.value)}
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
                {renderFormField(setDay, day, renderDaysOptions)}
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
                  setweekNumber,
                  weekNumber,
                  renderWeeksNumberOptions
                )}
              </Grid>
              <Grid item xs={5}>
                {renderFormField(setWeekName, weekName, renderWeekNamesOptions)}
              </Grid>
            </Grid>
          </Grid>
        </RadioGroup>
      </FormControl>
    </div>
  );
}
