import axios from "axios";

const baseUrl = "http://api.openweathermap.org/";
const api_key = import.meta.env.VITE_WEATHER_KEY;

const getLocation = (capitalInfo) => {
  const search = `${baseUrl}/geo/1.0/direct?q=${capitalInfo}&limit=1&appid=${api_key}`;
  console.log("search", search);

  return (
    axios
      // .get(`${baseUrl}/geo/1.0/direct?q=${capitalInfo}&limit=1&appid=${api_key}`)
      .get(search)
      .then((res) => res.data[0])
  );
};

const getWeather = (latlon) =>
  axios
    .get(
      `${baseUrl}/data/2.5/weather?lat=${latlon.lat}&lon=${latlon.lon}&units=metric&appid=${api_key}`
    )
    .then((res) => res.data);

export default {
  getLocation,
  getWeather,
};
