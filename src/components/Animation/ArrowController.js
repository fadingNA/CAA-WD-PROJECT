import React, { useState, useEffect } from "react";

function ArrowController({ onTimeChange }) {
  const [animationId, setAnimationId] = useState(null);
  const [currentTime, setCurrentTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const parser = new DOMParser();
  // Fetch the start and end time for the wind data
  useEffect(() => {
    const fetchWindData = async () => {
      try {
        const response = await fetch(
          "https://geo.weather.gc.ca/geomet/?lang=en&service=WMS&request=GetCapabilities&version=1.3.0&LAYERS=RADAR_1KM_RRAI&t=" +
            new Date().getTime()
        );
        const data = await response.text().then((data) => {
          let xml = parser.parseFromString(data, "text/xml");
          let [start, end] = xml
            .getElementsByTagName("Dimension")[0]
            .innerHTML.split("/");
          let default_ = xml
            .getElementsByTagName("Dimension")[0]
            .getAttribute("default");
          return [start, end, default_];
        });
        return [new Date(data[0]), new Date(data[1]), new Date(data[2])];
      } catch (error) {
        console.error("Error fetching wind data:", error);
      }
    };

    fetchWindData();
  }, []);

  const startAnimation = () => {
    if (!animationId) {
      const id = setInterval(() => {
        const newTime = new Date(currentTime.getTime() + 30); // Increment by one hour
        if (newTime > endTime) {
          // Ensure you have logic to handle the endTime
          stopAnimation();
        } else {
          setCurrentTime(newTime);
          console.log("newTime", newTime);
          onTimeChange(newTime);
        }
      }, 1000); // Adjust this interval as needed for the animation speed

      setAnimationId(id);
    }
  };

  const stopAnimation = () => {
    if (animationId) {
      clearInterval(animationId);
      setAnimationId(null);
    }
  };
  return (
    <div>
      <button onClick={startAnimation}>Start Animation</button>
      <button onClick={stopAnimation}>Stop Animation</button>
    </div>
  );
}

export default ArrowController;
