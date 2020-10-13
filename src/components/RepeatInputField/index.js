import React, { useState } from "react";

import { connect } from "react-redux";
import { SET_REPEAT_TYPE } from "../../redux/types";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import Weekly from "./Weekly";
import Monthly from "./Monthly";
import Yearly from "./Yearly";
function RepeatInputField({ dispatch }) {
  const [type, setType] = useState("Yearly");
  const renderMoreFields = () => {
    if (type === "Yearly") return <Yearly />;
    else if (type === "Monthly") return <Monthly />;
    else if (type === "Weekly") return <Weekly />;
  };
  return (
    <div style={{ width: "100%", textAlign: "left" }}>
      <FormControl style={{ width: "70%" }} variant="outlined">
        <Select
          style={{ textAlign: "left" }}
          onChange={(event) => {
            setType(event.target.value);
            dispatch({ type: SET_REPEAT_TYPE, payload: event.target.value });
          }}
          defaultValue="Yearly"
        >
          <MenuItem value="Yearly">Yearly</MenuItem>
          <MenuItem value="Monthly">Monthly</MenuItem>
          <MenuItem value="Weekly">Weekly</MenuItem>
        </Select>
      </FormControl>
      {renderMoreFields()}
    </div>
  );
}
export default connect(null)(RepeatInputField);
