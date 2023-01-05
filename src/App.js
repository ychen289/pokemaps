import "./App.css";
import Sidebar from "./components/Sidebar";
import React, { useEffect, useState } from "react";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import Searchbar from "./components/Searchbar";
import mapStyles from "./mapStyles";
import axios from "axios";

const center = { lat: 35.6586, lng: 139.7454 };
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const conditions = {
  PartlyCloudy: ["normal", "rock"],
  Cloudy: ["fairy", "fighting", "poison"],
  Foggy: ["dark", "ghost"],
  Rainy: ["water", "electric", "bug"],
  Snowy: ["ice", "steel"],
  Sunny: ["grass", "ground", "fire"],
  Windy: ["dragon", "psychic", "flying"],
};

const random = [
  "PartlyCloudy",
  "Cloudy",
  "Foggy",
  "Rainy",
  "Snowy",
  "Sunny",
  "Windy",
];

function App() {
  const [list, setList] = useState([]);

  const grabPokemon = async () => {
    // const response = await axios.get(
    //   "https://pokeapi.co/api/v2/pokemon?limit=20"
    // );
    const response = await axios.get(
      "https://pogoapi.net/api/v1/pokemon_types.json"
    );
    const pokemon = response.data;
    setList(pokemon);
  };
  useEffect(() => {
    grabPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [weather, setWeather] = useState("Cloudy");
  const [type1, setType1] = useState("")
  const [type2, setType2] = useState("")

  const getWeather = () => {
    const weatherIndex = Math.floor(Math.random() * 8);
    const chosenWeather = random[weatherIndex];
    setWeather(chosenWeather);
    setType1(conditions.random[weatherIndex][0])
    setType2(conditions.random[weatherIndex][1])
    console.log(type1, type2)
  };

  if (!isLoaded) {
    return <h1>LOADING ATM</h1>;
  }
  const centerMap = () => {
    map.panTo(center);
    //map is originally null but upon loading, google map turns it into a giant map object
  };
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: "150vh", height: "100vh" }}
          onLoad={(map) => setMap(map)}
          options={options}
          onClick={(event) => {
            setCoordinates({
              lat: event.latLng.lat(),
              lng: event.latLng.lng(),
            });
            getWeather();
          }}
        >
          <MarkerF position={center} />
        </GoogleMap>
        <Searchbar />
      </div>
      <Sidebar
        coordinates={coordinates}
        centerMap={centerMap}
        list={list}
        weather={weather}
        type1={type1}
        type2={type2}
        setWeather={setWeather}
        conditions={conditions}
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
