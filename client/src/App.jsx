
import Map from "./Map";
import Searchbar from "./Searchbar";
import ResultBox from "./ResultBox";
import Legend from "./Legend.jsx";
import pin from "./assets/pin.png"
import {
  Marker
} from "@react-google-maps/api";

import { useState, useMemo } from "react";

function App() {

  const [input, setInput] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [markers, setMarkers] = useState(null)

  const haversine_distance = (current, marker) => {
    const R = 6371; // Radius of the Earth in km
    const rlat1 = current.lat * (Math.PI/180); // Convert degrees to radians
    const rlat2 = marker.Lat * (Math.PI/180); // Convert degrees to radians
    const difflat = rlat2-rlat1; // Radian difference (latitudes)
    const difflon = (marker.Lon-current.lng) * (Math.PI/180); // Radian difference (longitudes)

    const d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
    return d;
  }

  const getAutocomplete = (input) => {
    setInput(input)
    let distanceArray = []
    markers.map((marker) => {
      let dist = haversine_distance(input,marker)
      distanceArray.push({...marker, dist: dist})
    })
    distanceArray.join()
    distanceArray.sort((a,b) => a.dist - b.dist)
    setAutocomplete(distanceArray.slice(0,3))
  }

  return (
    <div className="App">
      <Map setMarkers={setMarkers}>
        <Searchbar getAutocomplete={getAutocomplete}/>
        <Legend />
        {input && (<Marker position={{ lat: input.lat, lng: input.lng }} icon={{
                url: require("./assets/pin.png"),
                scaledSize: new window.google.maps.Size(35, 35),
              }}/>)}
          <ResultBox autocomplete={autocomplete}/>
      </Map>
    </div>
  );
}

export default App;
