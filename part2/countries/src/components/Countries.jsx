import { useState, useEffect } from "react";
import countryService from "../services/countries";
import weatherService from "../services/weather";

const Countries = ({ text, countries }) => {
  const [countryName, setCountryName] = useState(null);

  useEffect(() => {
    setCountryName(null);
  }, [text]);

  if (!countries) {
    return <div>loading data...</div>;
  }

  const filteredCountries =
    text === ""
      ? countries
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(text.toLowerCase())
        );
  console.log("filteredCountries: ", filteredCountries);

  if (filteredCountries.length === 1) {
    return <CountryDetail name={filteredCountries[0].name.common} />;
  } else if (filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else {
    // const handleShowClick = (name) => <CountryDetail name={name} />;
    console.log("Country Name: ", countryName);

    return (
      <div>
        {filteredCountries.map((country) => (
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => setCountryName(country.name.common)}>
              Show
            </button>
          </div>
        ))}
        {countryName && <CountryDetail name={countryName} />}
      </div>
    );
  }
};

const CountryDetail = ({ name }) => {
  const [detail, setDetail] = useState(null);
  console.log("detail", name);

  useEffect(() => {
    countryService.getByName(name).then((country) => setDetail(country));
  }, [name]);

  if (detail === null) {
    return <div>loading detail...</div>;
  }
  return (
    <div>
      <h1>{detail.name.common}</h1>
      {detail.capital.map((capital) => (
        <div key={capital}>Capital {capital}</div>
      ))}
      <div>Area {detail.area}</div>
      <h2>Languages</h2>
      <ul>
        {Object.entries(detail.languages).map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ul>
      {/* <div>{detail.flag}</div> */}
      <img
        // src={detail.flags.svg}
        src={detail.flags.png}
        alt={detail.flags.alt}
      />
      <Weather capitalInfo={`${detail.capital[0]},${detail.cca2}`} />
    </div>
  );
};

const Weather = ({ capitalInfo }) => {
  //   const [latlon, setLatlon] = useState(null);
  const [weather, setWeather] = useState(null);

  console.log("capitalInfo: ", capitalInfo);

  useEffect(() => {
    setWeather(null);
    weatherService
      .getLocation(capitalInfo)
      .then((data) => {
        //   setLatlon({ lat: data.lat, lon: data.lon });
        const latlon = { lat: data.lat, lon: data.lon };
        console.log("latlon", latlon);
        return weatherService.getWeather(latlon);
      })
      .then((data) => setWeather(data));
  }, [capitalInfo]);

  if (weather === null) {
    return <div>loading weather info...</div>;
  }
  return (
    <div>
      <h2>Weather in {weather.name}</h2>
      <div>Temperature {weather.main.temp} Celsius</div>
      <img
        src={
          "https://openweathermap.org/img/wn/" +
          weather.weather[0].icon +
          "@2x.png"
        }
        alt={weather.weather[0].description}
      />
      <div>Wind {weather.wind.speed} m/s</div>
    </div>
  );
};

export default Countries;
