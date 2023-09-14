import axios from "axios";
import "./home.css"
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";

function HomeP() {
    const [pokemonData, setPokemonData] = useState([]);
    const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=300&offset=0";

    useEffect(() => {
        axios.get(apiUrl)
            .then((response) => {
                setPokemonData(response.data.results);
            })
            .catch((error) => {
                console.error("Error API", error);
            });
    }, []);

    return (
        <div className="homeP">
            <div className="header">
                <div className='container'>
                    <header className='header-flex'>
                        <div className="img-pockemon">
                            <Link to={"/"}>
                                <img alt="PokéAPI" className='header-img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" />
                            </Link>
                        </div>
                        <div className='search-input'>
                            <input type="text" className='search-pokemon' placeholder='Searching Pokemon...' />
                        </div>
                        <div className='header-about'>
                            <Link to={"https://pokeapi.co/"}>
                                <p>About</p>
                            </Link>
                        </div>
                    </header>

                </div>
            </div>
            <div className="container">
                <h1>Pokémon</h1>
                <ol >
                    {pokemonData.map((pokemon) => (
                        <li key={pokemon.name}>
                            <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}

export default HomeP;
