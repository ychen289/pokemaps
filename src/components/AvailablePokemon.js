import React, { useState } from "react";

// const conditions = {
//   Thunderstorm: [],
//   Drizzle: [],
//   Rain: [],
//   Snow: []
//   Atmosphere: []
//   Clear: [],
//   Clouds: []
// };

const AvailablePokemon = ({
  pokemon,
  setPokemon,
  display,
  setDisplay,
  weather,
}) => {
    const [typing, setTyping] = useState([])

const showAll = () => {
    console.log(pokemon)
}

  return (
    <div>
      <h1>AVAILABLE POKEMON GO HERE PLACEHOLDER</h1>
      <button onClick={showAll}>Show Pokemon list</button>
    </div>
  );
};

export default AvailablePokemon;
