/* import React, { useState } from "react";

const ResultBox = (props) => {

  return (
    <>
    {props.autocomplete && (
    <div>
      {props.autocomplete.map((marker) => {
        return <>
            {marker.Address}
            {marker.dist >= 1 ? `${marker.dist.toFixed(1)} km` : `${(marker.dist*1000).toFixed(0)} m`}
        </>
      })}
    </div>
    )}
    </>
  );
};

export default ResultBox;
  */
import React, { useState } from "react";

const ResultBox = (props) => {
  const closestWay = (marker) =>{
    //Implementation for closestWay here
    console.log("closestWay clicked for marker:", marker);
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: "10px",
        left: "26%",
        display: "flex",
        flexDirection: "row",
        gap: "50px",
        zIndex: 1,
      }}
    >
      {props.autocomplete &&
        props.autocomplete.map((marker, index) => (
          <button
            key={index}
            style={{
              width: "200px",
              height: "200px",
              background: "white",
              borderRadius: "20px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
              outline: "none",
              cursor: "pointer",
            }}
            onClick={() => closestWay(marker)}
          >
            <div>{marker.Address}</div>
            <div>
              {marker.dist >= 1
                ? `${marker.dist.toFixed(1)} km`
                : `${(marker.dist * 1000).toFixed(0)} m`}
            </div>
          </button>
        ))}
    </div>
  );
};

export default ResultBox;