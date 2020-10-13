import React, { useState } from "react";
import "./App.css";

import { connect } from "react-redux";
import { postData } from "./redux/actions/postAction";

import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
  const [url, setUrl] = useState("");
  const classes = useStyles();
  const handleSend = () => {
    console.log("url is " + url);
    if (!url) {
      return alert("Please provide postbin url");
    }
    props.postData(url);
  };
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
          <Grid
            container
            style={{ padding: "0px" }}
            spacing={2}
            className={classes.gridContainer}
            justify="flex-end"
            alignItems="center"
          >
            <Grid item xs={4}>
              <TextField
                fullWidth
                variant="outlined"
                type="text"
                placeholder="Postbin url"
                size="medium"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                fullWidth
                size="large"
                variant="contained"
                color="secondary"
                onClick={() => handleSend()}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        </div>
        <div
          style={{
            border: "solid 1px grey",
            borderRadius: "5px",
            padding: "10px",
            width: "fit-content",
            height: "12vh",
            margin: "20px auto",
          }}
        >
          <p id="rrule" style={{ color: "grey" }}>
            rrule will be generated and shown here and then sent to the postbin
            url here once you click send
          </p>
        </div>
      </Container>
    </div>
  );
}

export default connect(null, { postData })(App);
