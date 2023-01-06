import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import PokemonCard from "./PokemonCard";

const style = {
  width: 400,
  height: 470,
  backgroundColor: "#00bfff",
  "&:hover": {
    backgroundColor: "#00bfff",
    opacity: [0.9, 0.8, 0.7],
  },
};

const Search = ({ list, type1, type2, type3 }) => {
  const [appearances, setAppearances] = useState([]);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);

  let namePlaceholder = [];

  const checkList = async () => {
    for (let i = 0; i < list.length; i++) {
      let element = list[i];
      if (
        element.type.includes(type1) ||
        element.type.includes(type2) ||
        element.type.includes(type3)
      ) {
        namePlaceholder.push(element.pokemon_name);
      }
    }
  };

  const selectRandomPokemon = () => {
    let randomNumber = Math.floor(Math.random() * appearances.length);
    const randomPokemon1 = appearances[randomNumber];
    randomNumber = Math.floor(Math.random() * appearances.length);
    const randomPokemon2 = appearances[randomNumber];
    randomNumber = Math.floor(Math.random() * appearances.length);
    const randomPokemon3 = appearances[randomNumber];
    randomNumber = Math.floor(Math.random() * appearances.length);
    const randomPokemon4 = appearances[randomNumber];
    randomNumber = Math.floor(Math.random() * appearances.length);
    const randomPokemon5 = appearances[randomNumber];

    setDisplayedPokemon([
      randomPokemon1,
      randomPokemon2,
      randomPokemon3,
      randomPokemon4,
      randomPokemon5,
    ]);
  };
  const showPokemon = async () => {
    checkList();
    setAppearances(namePlaceholder);
    selectRandomPokemon();
  };
  return (
    <div>
      <Button
        variant="outlined"
        sx={{ backgroundColor: "#90EE90" }}
        onClick={showPokemon}
      >
        Show Pokemon
      </Button>
      <Box sx={style}>
        <h3>
          Boosted Types: {type1} | {type2} | {type3}
        </h3>
        <PokemonCard displayedPokemon={displayedPokemon} />
      </Box>
    </div>
  );
};

export default Search;
