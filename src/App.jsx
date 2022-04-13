import "./App.css";
import * as API from "./services/people";
import { useEffect, useState, useRef } from "react";

//import data from "./data.json";

function App() {
  const inputSearch = useRef();
  const [textSearch, setTextSearch] = useState("");
  const [page, setPage] = useState(1);
  const [characters, setCharacters] = useState([]);
  const [errorStatus, setErrorStatus] = useState({ hasErorr: false });
  const [currentCharacterSelected, setCurrentCharacterSelected] = useState(1);
  const [characterDetails, setCharacterDetails] = useState({});
  useEffect(() => {
    API.getPeople(page).then(setCharacters).catch(handleError);
  }, [page]);

  useEffect(() => {
    API.getCharacter(currentCharacterSelected)
      .then(setCharacterDetails)
      .catch(handleError);
  }, [currentCharacterSelected]);
  function handleError(error) {
    setErrorStatus({ hasErorr: true, errorMessage: error.message });
  }
  function showCharacterDetails(character) {
    const idCharClicked = Number(character.url.split("/").splice(-2)[0]);
    setCurrentCharacterSelected(idCharClicked);
  }
  function handleChangeTextSearch(ev) {
    const text = inputSearch.current.value;
    setTextSearch(text);
  }
  function handleSubmit(ev) {
    if (ev.key !== "Enter") return;
    inputSearch.current.value = "";
    setCharacterDetails({});
    API.searchCharacters(textSearch).then(setCharacters).catch(handleError);
    setPage(1);
  }
  function handleClickPage(next) {
    if (!characters.previous && page + next <= 0) return;
    if (!characters.next && page + next >= 9) return;
    setPage(page + next);
  }

  //console.log(characters?.results);
  //console.log(characterDetails);
  console.log(page);

  return (
    <>
      <input
        type="search"
        placeholder="Busca un personaje"
        ref={inputSearch}
        onChange={handleChangeTextSearch}
        onKeyDown={handleSubmit}
      />
      {errorStatus.hasErorr && <h2>{errorStatus.errorMessage}</h2>}
      <>
        {characters.results?.map((char, ind) => (
          <p
            key={char.name + ind}
            onMouseEnter={(ev) => {
              ev.target.style.cursor = "pointer";
              ev.target.style.backgroundColor = "lightgreen";
            }}
            onMouseLeave={(ev) => {
              ev.target.style.cursor = "normal";
              ev.target.style.backgroundColor = "white";
            }}
            onClick={() => showCharacterDetails(char)}
          >
            {char.name}
          </p>
        ))}
      </>
      <div>
        <button onClick={() => handleClickPage(-1)}>Prev</button>
        <span>Page: {page}</span>
        <button onClick={() => handleClickPage(+1)}>Next</button>
      </div>
      {Object.keys(characterDetails).length === 0 ? (
        <h2>Haz click para ver los detalles del personaje</h2>
      ) : (
        <aside>
          <h2>{characterDetails.name}</h2>
          <ul>
            <li>Height: {characterDetails.height}</li>
            <li>Gender: {characterDetails.gender}</li>
          </ul>
        </aside>
      )}
    </>
  );
}

export default App;
