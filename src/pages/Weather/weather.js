import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  TextField,
  CircularProgress,
} from "@mui/material";
import MainWeatherWindow from "./MainWeather";
import WeatherBox from "./WeatherBox";
import CityInput from "./CityInput";

const App = () => {
  const [weatherData, setWeatherData] = useState({
    city: undefined,
    days: new Array(5).fill({}),
  });

  const [inputCity, setInputCity] = useState("London");
  const [loading, setLoading] = useState(false);

  const getDayIndices = (data) => {
    let dayIndices = [0];
    let index = 0;
    let tmp = data.list[index].dt_txt.slice(8, 10);

    for (let i = 0; i < 4; i++) {
      while (
        tmp === data.list[index].dt_txt.slice(8, 10) ||
        data.list[index].dt_txt.slice(11, 13) !== "15"
      ) {
        index++;
      }
      dayIndices.push(index);
      tmp = data.list[index].dt_txt.slice(8, 10);
    }
    return dayIndices;
  };

  const updateState = (data) => {
    const city = data.city.name;
    const days = [];
    const dayIndices = getDayIndices(data);

    for (let i = 0; i < 5; i++) {
      days.push({
        date: data.list[dayIndices[i]].dt_txt,
        weather_desc: data.list[dayIndices[i]].weather[0].description,
        icon: data.list[dayIndices[i]].weather[0].icon,
        temp: data.list[dayIndices[i]].main.temp,
      });
    }

    setWeatherData({
      city: city,
      days: days,
    });
  };

  const makeApiCall = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${inputCity}&APPID=6557810176c36fac5f0db536711a6c52`
      );
      const api_data = await response.json();

      if (api_data.cod === "200") {
        updateState(api_data);
      } else {
        console.error("API call unsuccessful:", api_data);
      }
    } catch (error) {
      console.error("Error making API call:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (inputCity.trim() !== "") {
      makeApiCall();
    }
  }, [inputCity]);

  const WeatherBoxes = () => {
    const weatherBoxes = weatherData.days.slice(1).map((day, index) => (
      <li key={index}>
        <WeatherBox {...day} />
      </li>
    ));

    return <ul className="weather-box-list">{weatherBoxes}</ul>;
  };

  return (
    <Container
      maxWidth="md"
      style={{
        marginTop: "20px",
      }}
    >
      <Paper elevation={3} style={{ padding: "20px", marginTop: "40px" }}>
        {weatherData.city && weatherData.days[0] ? (
          <>
            <CityInput city={weatherData.city} makeApiCall={makeApiCall} />
            <MainWeatherWindow
              data={weatherData.days[0]}
              city={weatherData.city}
            >
              <WeatherBoxes />
            </MainWeatherWindow>
          </>
        ) : (
          <Typography variant="h5" align="center">
            {loading ? <CircularProgress /> : "Loading..."}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default App;
