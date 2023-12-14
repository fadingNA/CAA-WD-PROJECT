import React from "react";
import "./sidebar.css";
import logo from "../../public/assets/CAA_logo.png";

function Sidebar({
  setToggleWeather,
  setToggleName,
  setToggleCurrentCondition,
  setToggleWindDirection,
}) {
  return (
    <div className="sidebar">
      <img className="logo" src={logo} alt="CAA Logo" />
      <button onClick={() => setToggleWeather((toggle) => !toggle)}>
        Air temperatures
      </button>
      <button onClick={() => setToggleName((toggle) => !toggle)}>
        Province Name
      </button>
      <button onClick={() => setToggleCurrentCondition((toggle) => !toggle)}>
        Real Time Weather
      </button>
      <button onClick={() => setToggleWindDirection((toggle) => !toggle)}>
        Check Wind Direction
      </button>
    </div>
  );
}

export default Sidebar;
