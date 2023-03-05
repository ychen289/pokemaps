import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Map from "./components/Map";
import Pokedex from "./components/Pokedex";
import AvailablePokemon from "./components/AvailablePokemon";

const APIKEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

const conditions = {
  Thunderstorm: ["electric", "water", "bug"],
  Drizzle: ["water", "bug"],
  Rain: ["water", "ice"],
  Snow: ["ice", "ghost", "dark", "dragon", "psychic", "steel"],
  Atmosphere: ["normal", "grass", "fire", "ground", "rock", "flying", "steel"],
  Clear: ["normal", "rock", "grass", "flying", "steel"],
  Clouds: ["fighting", "poison", "dragon", "psychic", "flying"],
};
function App() {
  const [pokemon, setPokemon] = useState([]);
  const [weather, setWeather] = useState("Clouds");
  const [icon, setIcon] = useState("04d");
  const [coordinates, setCoordinates] = useState({
    lat: 35.6586,
    lng: 139.7454,
  });
  //display is the displayed pokemon on bottom of app
  const [display, setDisplay] = useState([]);

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
    console.log("allPokemon inside grabPokemon function: ",pokemon);
  };
  const grabWeather = async (latitude = 35.6586, longitude = 139.7454) => {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`
    );
    const data = response.data;
    const weatherData = data.weather[0].main;
    const icon = data.weather[0].icon;
    setWeather(weatherData);
    setIcon(icon);
  };

  const handleEncounter = (id) => {
    setPokemon((previousState) =>
      previousState.map((pokemon) =>
        pokemon.id === id ? { ...pokemon, encountered: true } : pokemon
      )
    );
  };

  const handleDisplayEncounter = (id) => {
    setDisplay((previousState) =>
      previousState.map((pokemon) =>
        pokemon.id === id ? { ...pokemon, encountered: true } : pokemon
      )
    );
  };

  const handleDisplay = () => {
    const boostedTypes = conditions[weather];
    const boostedPokemon = pokemon.filter((eachPokemon) => {
      const pokemonTypes = eachPokemon.types;
      return pokemonTypes && pokemonTypes.some((eachType) => boostedTypes.includes(eachType));
    });
    const randomizedPokemon = boostedPokemon.sort(()=> Math.random() - 0.5)
    const displayedPokemon=randomizedPokemon.slice(0,7)
    console.log("randomizedPokemon precut",randomizedPokemon);
    console.log("pokemon postcut", displayedPokemon)
    setDisplay(displayedPokemon)
  };

  useEffect(() => {
    grabPokemon();
    grabWeather();
    handleDisplay()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column"}}>
      <div className="main-container">
        <Map
          grabWeather={grabWeather}
          weather={weather}
          setWeather={setWeather}
          icon={icon}
          setIcon={setIcon}
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          handleDisplay={handleDisplay}
        />
        <Pokedex
          pokemon={pokemon}
          setPokemon={setPokemon}
          handleEncounter={handleEncounter}
        />
      </div>
      <AvailablePokemon
        pokemon={pokemon}
        setPokemon={setPokemon}
        display={display}
        setDisplay={setDisplay}
        weather={weather}
        handleEncounter={handleEncounter}
        handleDisplayEncounter={handleDisplayEncounter}
      />
    </div>
  );
}

export default App;
