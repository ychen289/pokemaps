import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";

const Pokedex = ({ pokemon, setPokemon }) => {
  const handleEncounter = (id) => {
    setPokemon((previousState) =>
      previousState.map((pokemon) =>
        pokemon.id === id ? { ...pokemon, encountered: true } : pokemon
      )
    );
  };

  return (
    <div>
      <div
        style={{
          height: "80vh",
          display: "flex",
          flexWrap: "wrap",
          overflow: "scroll",
        }}
      >
        {!(pokemon.length === 0) ? (
          pokemon.map((eachPokemon) => (
            <div
              key={eachPokemon.name}
              style={{
                position: "relative",
                width: "250px",
                height: "500px",
                backgroundColor: "#77DD77",
                border: "1px solid #333",
                margin: "20px",
                textAlign: "center",
                padding: "20px",
              }}
            >
              <h2 style={{ fontSize: "25px", color: "black" }}>
                <p>#{eachPokemon.id}</p>
                <p>
                  {eachPokemon.encountered
                    ? eachPokemon.name.charAt(0).toUpperCase() +
                      eachPokemon.name.slice(1)
                    : "???"}
                </p>
              </h2>

              <a
                href={`https://bulbapedia.bulbagarden.net/wiki/${eachPokemon.name}_(Pokémon)`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={
                    eachPokemon.encountered
                      ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${eachPokemon.id}.png`
                      : "https://archives.bulbagarden.net/media/upload/6/60/Question_Mark.png"
                  }
                  alt={eachPokemon.name}
                  style={{ width: "200px", height: "200px" }}
                />
              </a>

              <p style={{ fontSize: "18px", color: "black" }}>
                Type:{" "}
                {eachPokemon.encountered
                  ? eachPokemon.types &&
                    eachPokemon.types
                      .map(
                        (typing) =>
                          typing.type.name.charAt(0).toUpperCase() +
                          typing.type.name.slice(1)
                      )
                      .join(", ")
                  : "???"}
              </p>

              <p style={{ fontSize: "18px", color: "black" }}>
                Encountered: {eachPokemon.encountered ? "Yes" : "No"}
              </p>
              <div
                style={{
                  display: "flex",
                  width: "250px",
                }}
              >
                <div style={{paddingRight: "5%"}}>
                  <Button
                    variant="contained"
                    onClick={() => handleEncounter(eachPokemon.id)}
                  >
                    Change Encounter
                  </Button>
                </div>
                <Button
                  variant="contained"
                  onClick={() => console.log(eachPokemon)}
                >
                  Pokemon Info
                </Button>
              </div>
            </div>
          ))
        ) : (
          <h1>Loading Pokedex...</h1>
        )}
      </div>
    </div>
  );
};

export default Pokedex;
