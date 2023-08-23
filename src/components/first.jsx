import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [pokemon, setPokemon] = useState({
    name: '',
  });
  const [number, setNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let abortContrallor = new AbortController();
    const loadPokemon = async () => {
      try {
        setLoading(true);
        let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${number}`, {
          signal: abortContrallor.signal,
        });
        setPokemon(response.data);
        setError('');
      } catch (error) {
        setError('Something went wrong', error);
      }
      setLoading(false);
    };
    loadPokemon();
    return () => abortContrallor.abort();
  }, [number]);

  const prev = () => {
    setNumber((number) => number - 1);
  };
  const next = () => {
    setNumber((number) => number + 1);
  };

  if (pokemon.id) {
    return (
      <div key={pokemon.name}>
        <header className="header">
          <h2>Hello Pokemon Master</h2>
        </header>
        <div className="search">
          <h3>Find my Pokemon</h3>
          <div className="overflow-x-auto flex">
            <div className="flex-none py-2 px-2 first:pl-6 last:pr-6 bg-gray-300 rounded-full">
              <img
                className="w-18 h-18"
                src={pokemon?.sprites?.front_default}
                alt={pokemon?.name}
              />
            </div>
          </div>
        </div>
        <h2>{pokemon?.name}</h2>
        <img src={pokemon?.sprites?.other?.home?.front_default} alt={pokemon?.name} />
        <div className="abilities">
          <h4>Pokemon Ability</h4>
          {pokemon?.abilities.map((item, index) => (
            <span key={index}>{item.ability.name}</span>
          ))}
        </div>
        <div className="button-bottom">
          <button onClick={prev}>prev</button>
          <button onClick={next}>next</button>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
}

export default App;
