import "./App.css";
import * as API from "./services/people";
import { useEffect, useState } from "react";

import data from "./data.json";

function App() {
  const [characters, setCharacters] = useState([]);
  const [errorStatus, setErrorStatus] = useState({ hasErorr: false });

  useEffect(() => {
    API.getPeople().then(setCharacters).catch(handleError);
  }, []);
  function handleError() {}
  console.log(characters);
  return (
    <div>
      <ul>
        {characters.results?.map((char, ind) => (
          <li key={char.name + ind}>{char.name}</li>
        ))}
      </ul>
      {data.results.map((personaje) => {
        return <p key={personaje.name}>{personaje.name}</p>;
      })}
    </div>
  );
}

export default App;