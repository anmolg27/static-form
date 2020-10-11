import React, { useState } from "react";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
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
  buttonSelected: {
    backgroundColor: "green",
  },
});

export default function Weekly() {
  const [selectedWeeks, setSelectedWeeks] = useState([]);

  const classes = useStyles();

  const handleWeekButtonClick = (week) => {
    setSelectedWeeks((prevState) => {
      if (prevState.includes(week)) {
        console.log(`${week} is now being removed`);
        return prevState.filter((weekName) => weekName !== week);
      } else {
        console.log(`${week} is now being included`);
        return [...prevState, week];
      }
    });
  };
  const renderButtons = () => {
    const weekNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return weekNames.map((week) => (
      <Button
        className={selectedWeeks.includes(week) ? classes.buttonSelected : ""}
        onClick={() => handleWeekButtonClick(week)}
      >
        {week}
      </Button>
    ));
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={2} style={{ width: "100%" }}>
        <Grid item xs={1.5}>
          <p> every </p>
        </Grid>

        <Grid item xs={5} style={{ alignSelf: "center" }}>
          <TextField fullWidth variant="outlined" type="number" />
        </Grid>
        <Grid item xs={1.5}>
          <p> week{"(s)"} </p>
        </Grid>
      </Grid>

      <ButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
      >
        {renderButtons()}
      </ButtonGroup>
    </div>
  );
}
