
import { useState } from "react";
import logo from './logo.svg';
import './App.css';

const App = () => {
  const [pokemon, setPokemon] = useState("");

  const apiCall = async ( pokemonName ) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const data = await response.json();
    console.log(data);
  }

  const handleSubmit = (e) => {
    apiCall(pokemon);
  }

  return (
    <div className="App" id="root">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={() => handleSubmit()}>
          <label>
            <input type="text" placeholder="Pokemon Name" value={pokemon} onChange={(e) => setPokemon(e.target.value)}/>
          </label>
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default App;
