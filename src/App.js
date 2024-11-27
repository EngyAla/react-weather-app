import './App.css';
import search_Img from './images/search.png';
import mist from './images/mist.png';
import clear from './images/clear.png';
import clouds from './images/clouds.png';
import drizzle from './images/drizzle.png';
import snow from './images/snow.png';
import rain from './images/rain.png';
import humidity from './images/humidity.png';
import wind from './images/wind.png';
import { useEffect, useState } from 'react';
function App(){
  const [city, setCity] = useState("")
  const [weatherInfo, setWeatherInfo] = useState(null)
  const [error, setError] = useState(false)
  const [weatherIcon, setweatherIcon] = useState("")


  const apiKey = "0c42f7f6b53b244c78a418f4f181282a";
  const apiUrl = "https://api.openweathermap.org./data/2.5/weather?&q=";

  useEffect(()=>{
    if(city){
      fetch(apiUrl + city + `&appid=${apiKey}&units=metric`)
      .then((response) =>{
        if(!response.ok){
          setError(true)
          throw new Error("Invalid city name") 
        } 
        setError(false)
        return response.json()
      })
      .then((data) => setWeatherInfo(data))
      .catch((error) => console.error("Error fetching weather data:", error))
    }
  }, [city])

  useEffect(()=>{
    if(weatherInfo){
      if(weatherInfo.weather[0].main === "Clouds"){
        setweatherIcon(clouds) 
    }
    else if(weatherInfo.weather[0].main === "Clear"){
        setweatherIcon(clear)
    }
    else if(weatherInfo.weather[0].main === "Rain"){
        setweatherIcon(rain)
    }
    else if(weatherInfo.weather[0].main === "Drizzle"){
        setweatherIcon(drizzle)
    }
    else if(weatherInfo.weather[0].main === "Mist"){
        setweatherIcon(mist)
    } else if(weatherInfo.weather[0].main === "Snow"){
      setweatherIcon(snow)
    }
    else{
      setweatherIcon("")
    }
  }
  }, [weatherInfo])


  return(
    <div className="card">
        <div className="search">
            <input type="text" placeholder="Enter City Name" onChange={(e) => setCity(e.target.value)}/>
            <div className="secrch_icon">
                <img src={search_Img} alt="search" width="12" />
            </div>
        </div>
        {error &&(
          <div className="error">
            <p>Inavlid City Name</p>
          </div>
        )}
        {weatherInfo && !error &&(
          <>
          <div className="weather">
            <img src={weatherIcon} className="weather_icon" width="130" alt=''/>
            <h1 className="temp">{weatherInfo.main.temp} °C</h1>
            <h2 className="city">{weatherInfo.name}</h2>
          </div>
          <div className="detailes">
            <div className="content1">
                <img src={humidity} alt="..." className="humidity" width="35" />
                <div className="text_content">
                    <h3 className="humidity_val">{weatherInfo.main.humidity} %</h3>
                    <p>Humidity</p>
                </div>
            </div>
            <div className="content1">
                <img src={wind} alt="..." className="speed" width="35" />
                <div className="text_content">
                    <h3 className="speed_val">{weatherInfo.wind.speed} m/s</h3>
                    <p>Wind Speed</p>
                </div>
            </div>
          </div>
          </>
        )}
        
    </div>
  )
}
export default App;