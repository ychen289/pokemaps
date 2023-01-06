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
  PartlyCloudy: ["Normal", "Rock", "Flying"],
  Cloudy: ["Fairy", "Fighting", "Poison"],
  Foggy: ["Dark", "Ghost", "Fairy"],
  Rainy: ["Water", "Electric", "Bug"],
  Snowy: ["Ice", "Steel", "Ghost"],
  Sunny: ["Grass", "Ground", "Fire"],
  Windy: ["Dragon", "Psychic", "Flying"],
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
  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState({
    lat: "----",
    lng: "----",
  });
  const [weather, setWeather] = useState("None");
  const [type1, setType1] = useState("----");
  const [type2, setType2] = useState("----");
  const [type3, setType3] = useState("----");

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const grabPokemon = async () => {
    // const response = await axios.get(
    //   "https://pokeapi.co/api/v2/pokemon?limit=20"
    // );
    const response = await axios.get(
      "https://pogoapi.net/api/v1/pokemon_types.json"
    );
    const pokemon = await response.data;
    await setList(pokemon);
  };
  useEffect(() => {
    grabPokemon();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getWeather = () => {
    const weatherIndex = Math.floor(Math.random() * 8);
    const chosenWeather = random[weatherIndex];
    setWeather(chosenWeather);
    setType1(conditions[chosenWeather][0]);
    setType2(conditions[chosenWeather][1]);
    setType3(conditions[chosenWeather][2]);
    console.log(type1, type2, type3);
  };

  const centerMap = () => {
    map.panTo(center);
    //map is originally null but upon loading, google map turns it into a giant map object.
    //this in turn makes it so the map object has a panTo function
  };
  if (!isLoaded) {
    return <h1>LOADING ATM HOLDUP</h1>;
  }
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
        setWeather={setWeather}
        conditions={conditions}
        type1={type1}
        type2={type2}
        type3={type3}
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
