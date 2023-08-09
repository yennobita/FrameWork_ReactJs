import hotBg from "../../assets/hot.jpg";
import coldBg from "../../assets/cold.jpg";
import coolBg from "../../assets/cool.jpg";
import "./Weather.css";

import { useEffect, useState } from "react";
import WeatherComponent from "./WeatherComponent";
import { getFormattedWeatherData } from "../../redux/weathers/weather";
import Navbar from "../navbar/Navbar";

function Weather() {
  const [city, setCity] = useState("VietNam");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);
      setWeather(data);

      // dynamic bg
      let bg;
      if (data.temp < 20) {
        bg = coldBg;
      } else if (data.temp >= 20 && data.temp <= 30) {
        bg = coolBg;
      } else {
        bg = hotBg;
      }

      setBg(bg);
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="app" style={{ backgroundImage: `url(${bg})` }}>
        <div className="overlay">
          {weather && (
            <div className="container">
              <div className="section section__inputs">
                <input
                  onKeyDown={enterKeyPressed}
                  type="text"
                  name="city"
                  placeholder="Enter City..."
                />
                <button onClick={(e) => handleUnitsClick(e)}>°F</button>
              </div>

              <div className="section section__temperature">
                <div className="icon">
                  <h3>{`${weather.name}, ${weather.country}`}</h3>
                  <img src={weather.iconURL} alt="weatherIcon" />
                  <h3>{weather.description}</h3>
                </div>
                <div className="temperature">
                  <h1>{`${weather.temp.toFixed()} °${
                    units === "metric" ? "C" : "F"
                  }`}</h1>
                </div>
              </div>

              {weather && (
                // ...
                <WeatherComponent weather={weather} units={units} />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Weather;
