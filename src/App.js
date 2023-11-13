import React, {useEffect, useState} from "react";
import axios from "axios";

function App() {
  const [geoData, setGeoData] = useState({})
  const [location, setLocation] = useState('')
  const [weatherData, setWeatherData] = useState({})

  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&units=imperial&appid=d294d3c7454e99215e3d41d833d9b7df`

  const geoLocationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=d294d3c7454e99215e3d41d833d9b7df`


  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      try {
        const geoResponse = await axios.get(geoLocationUrl);
        setGeoData(geoResponse.data[0]);
        await getWeatherAPI(geoResponse.data[0]);
        setLocation('');
        document.activeElement.blur();
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  async function getWeatherAPI(geoData) {
    if (geoData && geoData.lat && geoData.lon) {
      try {
        const weatherResponse = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${geoData.lat}&lon=${geoData.lon}&units=imperial&appid=d294d3c7454e99215e3d41d833d9b7df`);
        setWeatherData(weatherResponse.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    }
  }


  return (
    <div className="app">
      <div className="container">
        <div className="search">
          <input 
          type="text" 
          value={location}
          onChange={e => setLocation(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter location" />
        </div>
        <div className="top">
          <div className="location">
            <p>{weatherData.name}</p>
          </div>
          <div className="temp">
            {weatherData.main ? <h1>{weatherData.main.temp.toFixed()}&deg;F</h1> : null}
          </div>
          <div className="discription">
            {weatherData.weather ? <p>{weatherData.weather[0].main}</p> : null}
          </div>
        </div>

        {weatherData.name != undefined && 
          <div className="bottom">
          <div className="feels">
          <p>Feels like:</p>
          {weatherData.main ? <p><b>{weatherData.main.feels_like.toFixed()}&deg;F</b></p> : null}
            </div>
          <div className="humidity"><p>Humidity:</p>
          {weatherData.main ? <p><b>{weatherData.main.humidity}%</b></p> : null}
          </div>
          <div className="wind"><p>Wind:</p>
          {weatherData.wind ? <p><b>{weatherData.wind.speed.toFixed()} mph</b></p> : null}

          </div>
        </div>
        }
        
      </div>
    </div>
  );
}

export default App;
