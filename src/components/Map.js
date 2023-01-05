import React, { useState } from "react";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import Searchbar from "./Searchbar";
import mapStyles from "../mapStyles";
import { Button } from "@mui/material";

const center = { lat: 35.6586, lng: 139.7454 };
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  if (!isLoaded) {
    console.log("loading atm");
    return <h1>LOADING ATM</h1>;
  }
  const centerMap = () => {
    map.panTo(center);
  };

  return (
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
        }}
      >
        <MarkerF position={center} />
        {
          //create markers wherever you click*******************
          /* {info.map((marker) => (
          <InfoWindowF
            key={info.time.toISOString()}
            position={{ lat: info.lat, lng: info.lng }}
          />
        ))} */
        }
      </GoogleMap>
      <Button variant="contained" onClick={centerMap}>
        Real Recenter Map
      </Button>
      <Searchbar />
      <h1>
        Latitude: {coordinates.lat} | Longitude: {coordinates.lng}
      </h1>
    </div>
  );
};

export default Map;
