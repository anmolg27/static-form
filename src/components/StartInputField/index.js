import React from "react";
import TextField from "@material-ui/core/TextField";

export default function StartInputField() {
  return (
    <>
      <TextField
        style={{ height: "100%" }}
        variant="filled"
        id="date"
        type="date"
      />
    </>
  );
}
