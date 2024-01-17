import {
  GoogleMap,
  InfoWindow,
  Marker,
  BicyclingLayer,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useEffect, useRef, useState, useMemo } from "react";

const Map = (props) => {
  const [selectedMarker, setSelectedMarker] = useState("");
  const [showLocation, setShowLocation] = useState(true);

  const containerStyle = {
    width: "100vw",
    height: "100vh",
  };
  const center = useMemo(() => ({ lat: 57.707092, lng: 11.974 }), []);
  const [markers, setMarkers] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [directions, setDirections] = useState(null);
  const [fetchingDirections, setFetchingDirections] = useState(false);
  const [onMouseLeave, setOnMouseLeave] = useState(true);
  const [distance, setDistance] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [showBicyclePaths, setShowBicyclePaths] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/test");
        const jsonData = await response.json();
        setMarkers(jsonData);
        props.setMarkers(jsonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchPosition = () => {
      if (showLocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentPosition({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            console.log(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            console.error(error);
          }
        );
      }
    };

    // Fetch initial position immediately
    fetchPosition();

    // Fetch position every 1 seconds
    const timerId = setInterval(fetchPosition, 2000);

    // Clean up interval timer on unmount
    return () => clearInterval(timerId);
  }, []);

  const fetchDirections = async (pumpStation) => {
    setFetchingDirections(true);
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: currentPosition,
        destination: { lat: pumpStation.Lat, lng: pumpStation.Lon },
        travelMode: window.google.maps.TravelMode.BICYCLING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          setDistance(` of Route - ${result.routes[0].legs[0].distance.text}`);
          setShowDirections(true);
        } else {
          console.error(`Failed to fetch directions. Status: ${status}`);
        }
        setFetchingDirections(false);
      }
    );
  };



  const haversine_distance = (current, marker) => {
    if (current) {
      const R = 6371; // Radius of the Earth in km
      const rlat1 = current.lat * (Math.PI / 180); // Convert degrees to radians
      const rlat2 = marker.Lat * (Math.PI / 180); // Convert degrees to radians
      const difflat = rlat2 - rlat1; // Radian difference (latitudes)
      const difflon = (marker.Lon - current.lng) * (Math.PI / 180); // Radian difference (longitudes)

      const d =
        2 *
        R *
        Math.asin(
          Math.sqrt(
            Math.sin(difflat / 2) * Math.sin(difflat / 2) +
              Math.cos(rlat1) *
                Math.cos(rlat2) *
                Math.sin(difflon / 2) *
                Math.sin(difflon / 2)
          )
        );
      if (d >= 1) {
        return ` - ${d.toFixed(1)} km`;
      }
      if (d < 1) {
        return ` - ${(d * 1000).toFixed(0)} m`;
      }
    }
  };

  const onMouseOver = (marker) => {
    if (!directions) {
      setSelectedMarker(marker);
      setDistance(haversine_distance(currentPosition, marker));
    }
  };

  const mapRef = useRef(null);

  const onMapLoad = (mapInstance) => {
    mapRef.current = mapInstance;
  };

  return (
    (
      <>

<div style={{ 
  position: 'absolute', 
  top: '10px', 
  right: '19px', 
  zIndex: 2, 
  fontSize: '14px', 
  background: 'white', 
  borderRadius: '10px', 
  padding: '7px', 
  boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>
    <label style={{ display: 'block', textAlign: 'center' }}>
    Show my location:
    <input type="checkbox" checked={showLocation} onChange={(e) => setShowLocation(e.target.checked)} />
  </label>
</div>
      <div
        style={{
          position: "absolute",
          top: "50px",
          right: "1.5%",
          zIndex: 2,
          fontSize: "14px",
          background: "white",
          borderRadius: "10px",
          padding: "7px",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        <label style={{ display: "block", textAlign: "center" }}>
          Show bicycle paths:
          <input
            type="checkbox"
            checked={showBicyclePaths}
            onChange={(e) => setShowBicyclePaths(e.target.checked)}
          />
        </label>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onMapLoad}
        options={{
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: false,
          styles: [
            {
              featureType: "poi.business",
              stylers: [{ visibility: "off" }],
            },
          ],
        }}
      >
        {showBicyclePaths && <BicyclingLayer />}
          {props.children}
          {markers.map((marker) => {
            return (
              <div key={marker.ID}>
                <Marker
                  icon={{
                    url: require("./assets/pump.png"),
                    scaledSize: new window.google.maps.Size(25, 30)
                    
                  }}
                  position={{ lat: marker.Lat, lng: marker.Lon }}
                  onClick={() => {
                    setSelectedMarker(marker);
                    setOnMouseLeave(false);
                  }}
                  onMouseOver={() => {onMouseOver(marker)
                }}
                  onMouseOut={() =>
                    onMouseLeave ? setSelectedMarker("") : null
                  }
              />
            </div>
          );
        })}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.Lat, lng: selectedMarker.Lon }}
            options={{
              pixelOffset: new window.google.maps.Size(0, -40),
            }}
            onCloseClick={() => {
              setSelectedMarker("");
              setOnMouseLeave(true);
            }}
            onUnmount={() => {
              setSelectedMarker("");
              setOnMouseLeave(true);
              setOnMouseLeave(true);
            }}
          >
            <div>
              Address - {selectedMarker.Address}
              <br />
              Distance {distance}
              <br />
              Comment - {selectedMarker.Comment}
              <button
                onClick={() => {
                  if (showDirections) {
                    setShowDirections(false);
                    setDirections(null);
                  } else {
                    fetchDirections(selectedMarker);
                  }
                }}
                  >
                  {showDirections ? "Close Directions" : "Directions"}
                </button>
              </div>
              
            </InfoWindow>
          )}
          {currentPosition && showLocation && (
            <Marker
              position={currentPosition}
              icon={{
                url: "https://uploads-ssl.webflow.com/62c5e0898dea0b799c5f2210/62e8212acc540f291431bad2_location-icon.png",
                scaledSize: new window.google.maps.Size(35, 35),
              }}
            />
          )}
          {directions && showDirections && (
            <DirectionsRenderer
              options={{
                directions: directions,
                polylineOptions: {
                  strokeColor: "#000",
                },
                suppressMarkers: true,
                preserveViewport: true,
                suppressBicyclingLayer: true,

              }}
            />
          )}
        </GoogleMap>
      </>
    )
  );
};

export default Map;
