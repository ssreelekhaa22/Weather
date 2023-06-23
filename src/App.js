import "./App.css";
import Card from "./Components/Card";
import { Typography } from "./Components/Typography";
import Input from "./Components/Input";
import { API_URL, apiKey } from "./api";
import { useState, useEffect } from "react";
import LineChart from "./Components/LineChart";
import icon from "./Images/sun-icon.png";

const App = () => {
  const [currWeather, setCurrWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [isDaytime, setIsDaytime] = useState(true);
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    setCurrWeather(null);
    setForecastWeather(null);
    setIsDaytime(true);
  }, []);

  const handleOnSearchChange = (searchData) => {
    setSearchData(searchData);

    if (searchData && searchData.value) {
      const [lat, lon] = searchData.value.split(" ");
      const fetchCurrWeather = fetch(
        `${API_URL}data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const fetchForecastWeather = fetch(
        `${API_URL}data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      Promise.all([fetchCurrWeather, fetchForecastWeather])
        .then(async (res) => {
          const currWeatherRes = await res[0].json();
          const forecastWeatherRes = await res[1].json();

          setCurrWeather({ city: searchData.label, ...currWeatherRes });
          setForecastWeather({ city: searchData.label, ...forecastWeatherRes });

          const currentDate = new Date();
          const sunset = forecastWeatherRes?.city?.sunset
            ? new Date(forecastWeatherRes.city.sunset * 1000)
            : null;
          const sunrise = forecastWeatherRes?.city?.sunrise
            ? new Date(forecastWeatherRes.city.sunrise * 1000)
            : null;

          setIsDaytime(currentDate > sunrise && currentDate < sunset);
        })
        .catch((err) => console.log(err));
    } else {
      setCurrWeather(null);
      setForecastWeather(null);
      setIsDaytime(true);
    }
  };

  return (
    <div
      className={`bg-cover ${
        searchData && searchData.value
          ? isDaytime
            ? "daytime"
            : "nighttime"
          : ""
      } ${isDaytime ? "text-black" : "text-white"}`}>
      <header className="flex font-bold justify-between items-center mr-5">
        <div className={`py-4 px-7 flex`}>
          Weatherly
          <img src={icon} alt="icon" className="h-6 w-8" />
        </div>
        <Input onSearchChange={handleOnSearchChange} />
      </header>
      {currWeather && (
        <>
          <Typography data={currWeather} />
          <Card
            data={currWeather}
            variant={isDaytime ? "#FFAE5D" : "#4B5D63"}
            conditionNow={true}
          />
        </>
      )}
      {forecastWeather && (
        <>
          <div className="pb-20">
            <Card
              data={forecastWeather}
              variant={isDaytime ? "#FFC16A" : "#4B5D63"}
              dailyTemp={true}
            />
          </div>
          <div className="flex justify-center">
            <LineChart data={forecastWeather} isDaytime={isDaytime} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
