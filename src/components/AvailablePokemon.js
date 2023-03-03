import React from "react";
import { Button } from "@mui/material";

const AvailablePokemon = ({
  pokemon,
  setPokemon,
  display,
  setDisplay,
  weather,
  handleEncounter,
  handleDisplayEncounter,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        border: "1px solid #333",
        borderRadius: "10px",
        justifyContent: "center"
      }}
    >
      {display &&
        display.map((eachPokemon) => {
          return (
            <div
              key={eachPokemon.name}
              style={{
                position: "relative",
                width: "200px",
                height: "400px",
                backgroundColor: "#F8C8DC",
                border: "1px solid #333",
                borderRadius: "10px",
                margin: "10px",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <h4>#{eachPokemon.id}</h4>
              <h4>
                {eachPokemon.name.charAt(0).toUpperCase() +
                  eachPokemon.name.slice(1)}
              </h4>
              <a
                href={`https://bulbapedia.bulbagarden.net/wiki/${eachPokemon.name}_(Pokémon)`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${eachPokemon.id}.png`}
                  alt={eachPokemon.name}
                  style={{
                    width: "200px",
                    height: "200px",
                    border: "1px solid #333",
                    borderRadius: "10px",
                  }}
                />
              </a>
              <p style={{ fontSize: "18px", color: "black" }}>
                Type:{" "}
                {eachPokemon.types
                  .map(
                    (typing) => typing.charAt(0).toUpperCase() + typing.slice(1)
                  )
                  .join(", ")}
              </p>
              {eachPokemon.encountered ? (
                <h4>Added!</h4>
              ) : (
                <Button onClick={() => {
                  handleEncounter(eachPokemon.id)
                  handleDisplayEncounter(eachPokemon.id)}}>
                  Add to Pokedex
                </Button>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default AvailablePokemon;
