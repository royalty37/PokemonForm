import { useState } from "react";
import placeholderPokemonImage from './assets/pokemon.png';
import './App.css';

const App = () => {
  const [pokemon, setPokemon] = useState("");
  
  const [pokemonImage, setPokemonImage] = useState(placeholderPokemonImage);
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonAbilities, setPokemonAbilities] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Function to get Pokemon data from API
  const apiCall = async ( pokemonName ) => {
    setIsError(false);
    setIsLoading(true);
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await response.json();
        setPokemonImage(data.sprites.other["official-artwork"].front_default);
        setPokemonName(format(data.name));
        setPokemonAbilities(data.abilities.map(ability => format(ability.ability.name)));
      } catch (error) {
        console.log(error);
        setPokemonName("");
        setPokemonImage(placeholderPokemonImage);
        setPokemonAbilities([]);
        setIsError(true);      
      }
    setIsLoading(false);
  }

  // Function to format strings returned from API
  const format = (string) => {
    if (string != null) {
      string = string.replace(/-/g,' ');

      var splitStr = string.toLowerCase().split(' ');
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
      }

      return splitStr.join(' ');;
    }
  }

  // Function to handle form submission, prevents page refresh and calls API
  const handleSubmit = (e) => {
    e.preventDefault();
    apiCall(pokemon.toLowerCase());
  }

  // Creates Move List component, passing in abilities array
  const MoveList = () => {
    const listItems = pokemonAbilities.map((ability) =>
      <li key={ability}>{ability}</li>
    );

    return listItems.length !== 0 ? (
      <div>
      <p className="list-p">Abilities:</p>
      <ul className="ul">{listItems}</ul>
      </div>
    ) : null;
  }

  // Returns loading screen if isLoading is true, and form if false
  return isLoading ?  (
    <div className="App"> 
      <header className="App-header">
        <h1>Loading...</h1>
      </header>
    </div>
  ) :  (
    <div className="App">
      <header className="App-header">
        <div>
          <img className="image" alt="Pokemon" src={pokemonImage} />
          <h1 className="heading">{pokemonName}</h1>
          { isError ? <p className="heading">Something went wrong...</p> :  <MoveList />}        
          <form className="form" onSubmit={(e) => handleSubmit(e)}>
            <label>
              <input type="text" placeholder="Pokemon Name" value={pokemon} onChange={(e) => setPokemon(e.target.value)}/>
            </label>
            <button className="button" type="submit">Submit</button>
          </form>
        </div>                 
      </header>
    </div>
  );
}

export default App;
