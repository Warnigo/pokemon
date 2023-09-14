import './page.css'
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const Page = () => {
    const [pokemonData, setPokemonData] = useState([]);
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`;

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
        <div className="pages">
            <Link to={""}><h1>{pokemonData.name}</h1></Link>
        </div>
    )
};

export default Page;