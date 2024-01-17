import React from "react";
import { SlMagnifier } from "react-icons/sl";
import logo from "./assets/logo.png";
import { Autocomplete } from "@react-google-maps/api";
import { useState } from "react";


const Searchbar = ({getAutocomplete}) => {
  const [searchResult, setSearchResult] = useState('')

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  async function onPlaceChanged() {
    if (searchResult != null) {
      try {
        const place = searchResult.getPlace();
        if(place.geometry != null) {
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()
        getAutocomplete({lat: lat, lng: lng });
        }
      } catch (error) {
        console.log(error);
        alert("Please enter valid adress");
      }
    } else {
      alert("Please enter text");
    }
  }
  const GOTHENBURG_BOUNDS = {
    north: 57.85,
    south: 57.6,
    west: 11.75,
    east: 12.17,
  };

  return (
    <div className="container-searchbar">
      <img className="logo-searchbar" src={logo} />
      <Autocomplete options={{componentRestrictions: {country: 'se'}, bounds: GOTHENBURG_BOUNDS}} className="places-container" onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
         <div>
          <input type="text" placeholder={"Search"} />
          <SlMagnifier size={15} />
        </div>
      </Autocomplete>
    </div>
  )
};

export default Searchbar;
