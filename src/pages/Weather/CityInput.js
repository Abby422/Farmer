import React, { useState } from "react";
import { TextField, CircularProgress } from "@mui/material";

const CityInput = (props) => {
  const [loading, setLoading] = useState(false);

  const onKeyPressHandler = async (e) => {
    e.persist();
    const eventKey = e.which ? e.which : e.keyCode;
    const city = e.target.value;

    // check if input contains only letters after Enter was pressed
    if (eventKey === 13) {
      if (/^[a-zA-ZäöüÄÖÜß ]+$/.test(city)) {
        e.target.classList.add("loading");
        setLoading(true);

        if (await props.makeApiCall(city)) {
          e.target.placeholder = "Enter a City...";
        } else {
          e.target.placeholder = "City was not found, try again...";
        }

        setLoading(false);
      } else {
        e.target.placeholder = "Please enter a valid city name...";
      }

      e.target.classList.remove("loading");
      e.target.value = "";
    }
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Enter a City..."
      onKeyPress={onKeyPressHandler}
      disabled={loading} // Disable input while loading
      InputProps={{
        style: {
          top: "-100%",
          borderRadius: "20px",
          fontSize: "20px",
          transition: "all 0.5s ease-out",
        },
        endAdornment: loading && <CircularProgress color="inherit" size={20} />,
      }}
    />
  );
};

export default CityInput;
