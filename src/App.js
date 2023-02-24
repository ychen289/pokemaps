import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Map from "./components/Main/Map";
import Pokedex from "./components/Side/Pokedex";

// const conditions = {
//   PartlyCloudy: ["Normal", "Rock", "Flying"],
//   Cloudy: ["Fairy", "Fighting", "Poison"],
//   Foggy: ["Dark", "Ghost", "Fairy"],
//   Rainy: ["Water", "Electric", "Bug"],
//   Snowy: ["Ice", "Steel", "Ghost"],
//   Sunny: ["Grass", "Ground", "Fire"],
//   Windy: ["Dragon", "Psychic", "Flying"],
// };

function App() {
  const [pokemon, setPokemon] = useState([]);

  const grabPokemon = async () => {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=151"
    );
    const pokemonList = response.data.results;
    const pokemonDetails = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        const pokemonData = response.data;
        pokemonData.encountered = false;
        return pokemonData;
      })
    );
    setPokemon(pokemonDetails);
  };
  useEffect(() => {
    grabPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Map />
        <Pokedex pokemon={pokemon} setPokemon={setPokemon} />
      </div>
      <h1>AVAILABLE POKEMON GO HERE PLACEHOLDER</h1>
    </div>
  );
}

export default App;

//create markers wherever you click*******************
/* {info.map((marker) => (
<InfoWindowF
  key={info.time.toISOString()}
  position={{ lat: info.lat, lng: info.lng }}
/>
))} */

/* <h1>Latitude: {coordinates.lat} | Longitude: {coordinates.lng}</h1> */

/* <Button variant="contained" onClick={centerMap}>Real Recenter Map</Button> */
