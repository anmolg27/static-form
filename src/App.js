import React from "react";
import "./App.css";

import { connect } from "react-redux";
import { postData } from "./redux/actions/postAction";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import StartInputField from "./components/StartInputField/";
import RepeatInputField from "./components/RepeatInputField/";
import End from "./components/End/";

const borderColor = "rgb(201, 201, 201)";
const borderStyles = `3px solid ${borderColor}`;
const useStyles = makeStyles({
  container: {
    textAlign: "center",
  },
  gridContainer: {
    height: "fit-content",
    margin: "0px",
    width: "100%",
    padding: "20px",
  },
  gridWrapper: {
    marginTop: "20px",
    width: "80%",
    marginLeft: "10%",
    border: borderStyles,
    borderRadius: "5px",
  },
});

function App(props) {
  const classes = useStyles();
  return (
    <div className="App">
      <Container className={classes.container} maxWidth="lg">
        <div className={classes.gridWrapper}>
          <Grid container alignItems="center" className={classes.gridContainer}>
            <Grid item xs={3}>
              <Typography variant="h5">Start</Typography>
            </Grid>
            <Grid item>
              <StartInputField />
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            className={classes.gridContainer}
            style={{
              borderBottom: borderStyles,
              borderTop: borderStyles,
            }}
          >
            <Grid item xs={3}>
              <Typography variant="h5">Repeat</Typography>
            </Grid>

            <Grid item xs={9}>
              <RepeatInputField />
            </Grid>
          </Grid>
          <Grid container alignItems="center" className={classes.gridContainer}>
            <Grid item xs={3}>
              <Typography variant="h5">End</Typography>
            </Grid>
            <Grid item xs={9}>
              <End />
            </Grid>
          </Grid>
        </div>
        <Button
          style={{ marginTop: "10px" }}
          variant="contained"
          color="secondary"
          onClick={() => props.postData()}
        >
          Generate rrule and send
        </Button>
      </Container>
    </div>
  );
}

export default connect(null, { postData })(App);
