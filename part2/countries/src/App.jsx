import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import countryService from "./services/countries";

const App = () => {
  const [text, setText] = useState("");
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    console.log("loading data...");
    countryService.getAll().then((countries) => setCountries(countries));
  }, []);

  const handleTextChange = (event) => {
    // console.log(event.target.value);
    setText(event.target.value);
  };

  return (
    <div>
      <p>
        find countries{" "}
        <input onChange={handleTextChange} disabled={!countries} />
      </p>
      <Countries text={text} countries={countries} />
    </div>
  );
};

export default App;
