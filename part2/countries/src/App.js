import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const api_key = "2dca9140d269078628a227a9df512d93";
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (search !== "") {
      axios
        .get(`https://restcountries.com/v2/name/${search}`)
        .then((response) => {
          setCountries(response.data);
        });
    }
  }, [search, setSearch]);

  useEffect(() => {
    setLoading(true);
    if (countries.length === 1) {
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${api_key}&query=${countries[0].capital}`
        )
        .then((response) => {
          setWeather(response);
          setLoading(false);
        });
    }
  }, [countries]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const handleClick = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      find countries
      <input type="text" value={search} onChange={handleSearch} />
      <article>
        {countries.length < 10 ? (
          countries.length === 1 ? (
            loading ? (
              "Loading..."
            ) : (
              <div>
                <h1>{countries[0].name}</h1>
                <p>capital {countries[0].capital}</p>
                <p>population {countries[0].population}</p>
                <h2>Spoken languages</h2>
                <ul>
                  {countries[0].languages.map((item) => {
                    return <li key={item.name}>{item.name}</li>;
                  })}
                </ul>
                <img src={countries[0].flags.png} alt="flag"></img>
                <h2>Weather in {countries[0].capital}</h2>
                <p>
                  <strong>temperature: </strong>
                  {weather.data.current.temperature} celsius
                </p>
                <img
                  src={weather.data.current.weather_icons[0]}
                  alt="icon"
                ></img>
                <p>
                  <strong>wind: </strong>
                  {weather.data.current.wind_speed} mph direction{" "}
                  {weather.data.current.wind_dir}
                </p>
              </div>
            )
          ) : (
            countries.map((item) => {
              return (
                <div key={item.name}>
                  {item.name}
                  <button onClick={handleClick} value={item.name}>
                    show
                  </button>
                </div>
              );
            })
          )
        ) : (
          "Too many matches, specify another filter"
        )}
      </article>
    </div>
  );
}

export default App;
