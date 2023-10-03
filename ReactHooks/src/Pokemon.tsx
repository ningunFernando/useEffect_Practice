import { useState, useEffect } from "react";
import "./App.css"


interface PokemonProps {
  id?: number;
}

const Pokemon = ({ id }: PokemonProps) => {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  const getRandomPokemon = async () => {
    setLoading(true);
    const id = Math.floor(Math.random() * 964);
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
    } catch (error) {
        console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getRandomPokemon();
    const interval = setInterval(getRandomPokemon, 7000);
    
    return () => {
        clearInterval(interval);
    }
  }, []);

  const renderPokemon = () => {
      return (
        <div>
          <h1>{pokemon.name}</h1>
          <img className="img-pokemon" src={pokemon.sprites.front_default} alt={pokemon.name} />
          <h2>Abilities</h2>
          <ul>
            {pokemon.abilities.map((ability) => (
              <li key={ability.ability.name}>{ability.ability.name}</li>
            ))}
          </ul>
          <h2>Type</h2>
          <ul>
            {pokemon.types.map((type) => (
              <li key={type.type.name}>{type.type.name}</li>
            ))}
          </ul>
        </div>
      );
  };

  return (
    <div>
      {loading ? (
        <h1 className="uwu-text">Ya voy estoy cargando 👉👈</h1>
      ):(
        renderPokemon()
      )}
    </div>
  );
};

export default Pokemon;