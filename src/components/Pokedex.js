import React from "react";
import { Box } from "@mui/material";
import axios from "axios";

const style = {
  width: 300,
  height: 300,
  backgroundColor: "#F47174",
  "&:hover": {
    backgroundColor: "#F47174",
    opacity: [0.9, 0.8, 0.7],
  },
};

const Pokedex = ({ list }) => {
  if (!list) return <h1>LOADING</h1>;
  return (
    <div>
      <Box sx={style}>
        {list &&
          list.map((pokemon) => {
            return (
              <div>
                <h3>{pokemon.pokemon_name}</h3>
                {pokemon.type.map((typing) => {
                  return <p>{typing}</p>;
                })}
              </div>
            );
          })}
      </Box>
    </div>
  );
};

export default Pokedex;

/**
 * <h2>
          { list && list.results.map((pokemon) => {
            return (
              <div>
                <h4>{pokemon.name}</h4>
                /* <h4>{grabTyping(pokemon.url)}</h4> */
/*<h4>{pokemon.url}</h4>
              </div>
            );
          })}
        </h2>
 */
