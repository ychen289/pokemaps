import React from "react";

const PokemonCard = ({ displayedPokemon }) => {
  return (
    <div>
      {/* {displayedPokemon &&
        displayedPokemon.map((eachPokemon) => {
          return <h4>{eachPokemon}</h4>;
        })} */}
      {displayedPokemon.length > 0 ? (
        displayedPokemon.map((eachPokemon) => {
          return (
            <div>
              <h4>{eachPokemon}</h4>
              <p>Sprite goes here but rip time</p>
            </div>
          );
        })
      ) : (
        <h4>No Pokemon Available</h4>
      )}
    </div>
  );
};

export default PokemonCard;
