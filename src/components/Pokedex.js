import React from "react";

const Pokedex = ({ pokemon, setPokemon, handleEncounter, handleCapture }) => {
  return (
    <div style={{ position: "relative" }}>
      <div className="pokedex-container">
        {!(pokemon.length === 0) ? (
          pokemon.map((eachPokemon) => (
            <div
              key={eachPokemon.name}
              style={{
                position: "relative",
                width: "200px",
                height: "400px",
                backgroundColor: "#77DD77",
                border: "1px solid #333",
                borderRadius: "10px",
                margin: "10px",
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
                          typing.charAt(0).toUpperCase() + typing.slice(1)
                      )
                      .join(", ")
                  : "???"}
              </p>
              <div
                style={{
                  display: "flex",
                  width: "250px",
                }}
              ></div>
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
