import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Map from "./components/Map";
import Pokedex from "./components/Pokedex";
import AvailablePokemon from "./components/AvailablePokemon";

const APIKEY = "4ddf11fc76cb0cef3cd9e2991726d34d";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [weather, setWeather] = useState("Clouds");
  const [icon, setIcon] = useState("04d");
  const [coordinates, setCoordinates] = useState({
    lat: 35.6586,
    lng: 139.7454,
  });
  const [display, setDisplay] = useState([]);

  const testFunction = (one, two) => {
    console.log(one, two);
  };
  // const grabPokemon = async () => {
  //   const response = await axios.get(
  //     "https://pokeapi.co/api/v2/pokemon?limit=151"
  //   );
  //   const pokemonList = response.data.results;
  //   const pokemonDetails = await Promise.all(
  //     pokemonList.map(async (pokemon) => {
  //       const response = await axios.get(pokemon.url);
  //       const pokemonData = response.data;
  //       pokemonData.encountered = false;
  //       return pokemonData;
  //     })
  //   );
  //   setPokemon(pokemonDetails);
  // };
  const grabPokemon = async () => {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=151"
    );
    const pokemonList = response.data.results;
    const pokemonDetails = await Promise.all(
      pokemonList.map(async (pokemon) => {
        const response = await axios.get(pokemon.url);
        const { id, name, sprites, types } = response.data;
        const pokemonData = {
          id,
          name,
          types: types.map((type) => type.type.name),
          sprite: sprites.front_default,
        };
        pokemonData.encountered = false;
        pokemonData.captured = false;
        return pokemonData;
      })
    );
    setPokemon(pokemonDetails);
    console.log(pokemon)
  };
  const grabWeather = async (latitude = 35.6586, longitude = 139.7454) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`
    );
    console.log(latitude, longitude)
    console.log("response: ", response);
    console.log("response.data: ", response.data);
    // tested above route. works with hard coded values
    const data = response.data;
    const weatherData = data.weather[0].main;
    console.log(weatherData)
    const icon = data.weather[0].icon;
    setWeather(weatherData);
    setIcon(icon);
  };

  useEffect(() => {
    grabPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    grabWeather();
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <Map
          testFunction={testFunction}
          grabWeather={grabWeather}
          weather={weather}
          setWeather={setWeather}
          icon={icon}
          setIcon={setIcon}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
        />
        <Pokedex pokemon={pokemon} setPokemon={setPokemon} />
      </div>
      <AvailablePokemon
        pokemon={pokemon}
        setPokemon={setPokemon}
        display={display}
        setDisplay={setDisplay}
        weather={weather}
      />
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

// const arrayName = [
//   { name: "tom", color: "red" },
//   { name: "sarah", color: "red" },
//   { name: "john", color: "red" },
//   { name: "sam", color: "blue" },
//   { name: "connie", color: "blue" },
//   { name: "jerry", color: "blue" },
//   { name: "hank", color: "yellow" },
//   { name: "tim", color: "yellow" },
//   { name: "bob", color: "yellow" },
// ];
