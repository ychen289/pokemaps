import React from "react";
import { Box } from "@mui/material";

const style = {
  width: 300,
  height: 300,
  backgroundColor: "#00bfff",
  "&:hover": {
    backgroundColor: "#00bfff",
    opacity: [0.9, 0.8, 0.7],
  },
};

// const conditions = {
//   PartlyCloudy: ["normal", "rock"],
//   Cloudy: ["fairy", "fighting", "poison"],
//   Foggy: ["dark", "ghost"],
//   Rainy: ["water", "electric", "bug"],
//   Snowy: ["ice", "steel"],
//   Sunny: ["grass", "ground", "fire"],
//   Windy: ["dragon", "psychic", "flying"],
// };

//filterPokemon(conditions, "Cloudy", list)

const Search = ({ conditions, list, type1, type2 }) => {
  const filterPoke = (pokemonObject) => {
    if (
      pokemonObject.type[0] === conditions.weather[0] ||
      pokemonObject.type[0] === conditions.weather[1] ||
      pokemonObject.type[1] === conditions.weather[0] ||
      pokemonObject.type[1] === conditions.weather[1]
    ) {
      return true;
    }
    return false;
  };

  const filteredPokemon = list.filter((pokemonObject) =>
    filterPoke(pokemonObject)
  );
  console.log(filteredPokemon());
  return (
    <div>
      <Box sx={style}>
        <h2>THIS IS WHERE THE INFORMATION GOES</h2>
      </Box>
    </div>
  );
};

export default Search;
