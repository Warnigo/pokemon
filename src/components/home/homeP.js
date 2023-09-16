import axios from "axios";
import "./home.css";
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";

function HomeP() {
    const [searchQuery, setSearchQuery] = useState("");
    const [pokemonData, setPokemonData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(12);
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=300&offset=${(currentPage - 1) * perPage}`;

    useEffect(() => {
        axios.get(apiUrl)
            .then((response) => {
                setPokemonData(response.data.results);
            })
            .catch((error) => {
                console.error("Error API", error);
            });
    }, [currentPage]);

    const filteredPokemonData = pokemonData.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPokemonData.length / perPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const currentPokemonData = filteredPokemonData.slice(startIndex, endIndex);

    return (
        <div className="homeP">
            <div className="header">
                <div className=''>
                    <header className='header-flex'>
                        <div className="img-pockemon">
                            <Link to={"/"}>
                                <img alt="PokéAPI" className='header-img' src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" />
                            </Link>
                        </div>
                        <div className='search-input'>
                            <input
                                type="text"
                                className='search-pokemon'
                                placeholder='Searching Pokemon...'
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className='header-about'>
                            <Link to={"https://pokeapi.co/"}>
                                <p>About</p>
                            </Link>
                        </div>
                    </header>
                </div>
            </div>
            <div className="container const">
                <h1>Pokemons</h1>
                {currentPokemonData.length === 0 ? (
                    <p className="empty">No Pokemon</p>
                ) : (
                    <>
                        <ul className="card-list">
                            {currentPokemonData.map((pokemon, index) => (
                                <li key={pokemon.name} className="card">
                                    <Link to={`/pokemon/${startIndex + index + 1}`}>
                                        <img
                                            className="pokemon-img"
                                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${startIndex + index + 1}.png`}
                                            alt={pokemon.name}
                                        />
                                        <span className="pokemon-name">{pokemon.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="pagination">
                            {currentPage > 1 && (
                                <button onClick={handlePrevPage}>Prev</button>
                            )}
                            {currentPage < totalPages && (
                                <button onClick={handleNextPage}>Next</button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default HomeP;
