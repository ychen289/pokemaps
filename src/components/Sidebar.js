import React, { useState } from "react";
import { Button } from "@mui/material";
import Pokedex from "./Pokedex";
import Search from "./Search";

const Sidebar = ({
  coordinates,
  centerMap,
  list,
  conditions,
  weather,
  type1,
  type2,
}) => {
  const [display, setDisplay] = useState(false);

  //https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          padding: "10px",
        }}
      >
        <Button
          variant="contained"
          onClick={() => setDisplay(false)}
          style={{ backgroundColor: "#00bfff" }}
        >
          Search
        </Button>
        <Button
          variant="contained"
          onClick={() => setDisplay(true)}
          style={{ backgroundColor: "#F47174" }}
        >
          Pokedex
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "#8ccd79" }}
          onClick={centerMap}
        >
          Recenter Map
        </Button>
      </div>
      <div style={{ paddingLeft: "20px" }}>
        <h2>Latitude: {coordinates.lat}</h2>
        <h2>Longitude: {coordinates.lng}</h2>
        <h2>Weather: {weather}</h2>
        {display ? (
          <Pokedex list={list} />
        ) : (
          <Search
            weather={weather}
            conditions={conditions}
            list={list}
            type1={type1}
            type2={type2}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
