import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Card from './components/card';
import Pokeinfo from './components/pokemonInfo';

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [pokeapi, setPokeapi] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState();

  useEffect(() => {
    let abortContrallor = new AbortController();
    const loadPokemon = async () => {
      try {
        setLoading(true);
        let response = await axios.get(pokeapi, {
          signal: abortContrallor.signal,
        });
        setError('');
        setNextUrl(response.data.next);
        setPrevUrl(response.data.previous);
        getPokemon(response.data.results);
        setLoading(false);
      } catch (error) {
        setError('Something went wrong', error);
      }
      setLoading(false);
    };
    loadPokemon();
    return () => abortContrallor.abort();
  }, [pokeapi]);

  const getPokemon = async (response) => {
    response.map(async (item) => {
      const result = await axios.get(item.url);
      setPokemon((state) => {
        state = [...state, result.data];
        state.sort((a, b) => (a.id > b.id ? 1 : -1));
        return state;
      });
    });
  };

  return (
    <div className="container">
      <header className="mb-8 header">
        <h1 className="mb-4 font-bold">Hello Pokemon Masters </h1>
      </header>
      <div className="grid gap-4">
        <div className="overflow-x-auto flex">
          <Card pokemon={pokemon} loading={loading} infoPokemon={(poke) => setPokeDex(poke)} />
        </div>
        <div className="flex justify-between">
          <button
            className={`${prevUrl ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            onClick={() => {
              setPokemon([]);
              setPokeapi(prevUrl);
            }}
            disabled={prevUrl === null}
          >
            Prev
          </button>
          <button
            className={`${nextUrl ? 'cursor-pointer' : 'cursor-not-allowed'}`}
            onClick={() => {
              setPokemon([]);
              setPokeapi(nextUrl);
            }}
            disabled={nextUrl === null}
          >
            Next
          </button>
        </div>
      </div>
      <div className="m-auto">
        <Pokeinfo data={pokeDex} />
      </div>
    </div>
  );
}

export default App;
