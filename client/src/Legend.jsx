import React, { useState } from 'react';
import filter from "./assets/Vector.png"
import closeFilter from "./assets/Vectorrotated.png"
import "./Legend.css";
import pump from "./assets/pump.png"
import pin from "./assets/pin.png"
import line from "./assets/Line 1.png"


const image1Url = "https://media.istockphoto.com/id/936260684/sv/vektor/cykel-cykel-pump-ikonen-vektorillustration.jpg?s=1024x1024&w=is&k=20&c=wVauxaEsqhKMrrCwzjD47fBS_Wq_-bSGiN0ao3faFNA=";
const image2Url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkl7ppUIMNNugVACT_Fe1xVqBDj78r9uwZUg&usqp=CAU";
const image3Url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7iPYvSvqfAaoKKK59c_GRmySkuxr97WqqCfrqIHrqew&s";

function MapLegend() {
  const [showLegend, setShowLegend] = useState(false);

  const toggleLegend = () => {
    setShowLegend(!showLegend);
  };

  return (
    <div style={{ position: 'absolute', top: '90px', right: '1.5%' }}>
      <button 
        onClick={toggleLegend} 
        style={{
          backgroundColor: 'white',
          color: '#333',
          padding: '10px',
          borderRadius: '10px',
          fontSize: '14px',
          border: 'none',
          boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          marginBottom: '10px',
          cursor: 'pointer',
          width: '150px',
          height: '33px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        Legend
        <img className="filter-logo" src={filter} style={{ width: '15px', height: '10px', marginLeft: '10px', transform: showLegend ? 'rotate(180deg)' : 'none' }} />
    
      </button>
      <div 
          style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: '20px',
            boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.3)',
            visibility: showLegend ? 'visible' : 'hidden', // set visibility to hidden when not showing
            opacity: showLegend ? 1 : 0, // set opacity to 0 when not showing
            overflow: 'hidden', // hide content when not showing
            transition: 'all 0.3s ease-in-out, height 0s ease-in-out 0.3s' // add CSS transition
          }}
          
          
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <img src={pump} alt="bike pump icon" style={{ width: '28px', height: '35px', marginRight: '10px' }} />
          <span style={{ fontSize: '14px' }}>Cycle Pump</span>
          </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <img src={pin} alt="tool station icon" style={{ width: '32px', height: '35px', marginRight: '10px'  }} />
            <span style={{ fontSize: '14px' }}>Pin Location</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={line} alt="tool station icon" style={{ width: '20px', height: '15px', marginRight: '10px' }} />
            <span style={{ fontSize: '14px' }}>Bike Path</span>
          </div>
        </div>
      
    </div>
  );
}

export default MapLegend;
