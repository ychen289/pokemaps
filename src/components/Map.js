import React, { useState } from "react";
import { useJsApiLoader, GoogleMap, MarkerF } from "@react-google-maps/api";
import mapStyles from "../mapStyles";
import { Button } from "@mui/material";

const center = { lat: 35.6586, lng: 139.7454 };
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({
  grabWeather,
  weather,
  setWeather,
  icon,
  setIcon,
  coordinates,
  setCoordinates,
  handleDisplay,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const [map, setMap] = useState("");

  const centerMap = () => {
    map.panTo(center);
    //map is originally null but upon loading, google map turns it into a giant map object.
    //this in turn makes it so the map object has a panTo function
    console.log(map);
  };

  const clickFunctions = (event) => {
    console.log(event);
    const latitude = event.latLng.lat();
    const longitude = event.latLng.lng();
    // setCoordinates({
    //   lat: event.latLng.lat(),
    //   lng: event.latLng.lng(),
    // });
    setCoordinates({
      lat: latitude,
      lng: longitude,
    });
    grabWeather(latitude, longitude);
    handleDisplay();
    console.log("CLICKFUNCTION FUNCTION FINISHED");
  };

  if (!isLoaded) {
    return <h1>Loading Google Maps...</h1>;
  }
  return (
    <div style={{ position: "relative" }}>
      <div>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{
            width: "90vh",
            height: "66vh",
            border: "1px solid #333",
            borderRadius: "10px",
          }}
          onLoad={(map) => setMap(map)}
          options={options}
          onClick={(event) => {
            clickFunctions(event);
          }}
        >
          <MarkerF position={center} />
        </GoogleMap>
      </div>
      <div style={{ position: "absolute", top: "40px", left: "40px" }}>
        <Button
          variant="contained"
          onClick={centerMap}
          style={{ backgroundColor: "#F47174" }}
        >
          Recenter Map
        </Button>
        <h1>
          Latitude: {coordinates.lat} | Longitude: {coordinates.lng}
        </h1>
        <div
          style={{
            display: "flex",
            backgroundColor: "#77DD77",
            border: "1px solid black",
            borderRadius: "10px",
            padding: "10px",
            alignItems: "center",
            top: "10px",
            left: "10px",
            zIndex: "1",
            width: "370px",
          }}
        >
          <h1 style={{ paddingRight: "5%" }}>Weather: {weather}</h1>
          <img
            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
            alt="icon"
            style={{
              border: "1px solid black",
              borderRadius: "10px",
              backgroundColor: "#d7e9f7",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Map;
