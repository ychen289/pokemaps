import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Box, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "1rem",
  left: "1rem",
  zIndex: "10",
  margin: "0",
  padding: "0",
};

const Searchbar = () => {
  return (
    <div style={style}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: 300,
          height: 30,
          backgroundColor: "white",
          borderRadius: "10px",
          padding: "10px",
          justifyContent: "space-around",
          border: "1px solid #73AD21",
        }}
      >
        <Autocomplete>
          <input type="text"></input>
        </Autocomplete>
        <Button>Jump</Button>
      </Box>
    </div>
  );
};

export default Searchbar;
