import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export default function End() {
  const [type, setType] = useState("Never");
  const renderMoreFields = () => {
    if (type === "Never") return null;
    else if (type === "After")
      return (
        <>
          <Grid item xs={6}>
            <TextField
              style={{ height: "100%" }}
              size="medium"
              fullWidth
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
              type="date"
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
