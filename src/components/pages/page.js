import './page.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const Page = () => {
    const { id } = useParams();

    const [pokemonInfo, setPokemonInfo] = useState(null);
    const [pokemonData, setPokemonData] = useState({
        statsName: [],
        statsRes: [],
        types: [],
        moves: [],
        abilities: [],
    });

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((response) => {
                setPokemonInfo(response.data);

                const statsName = response.data.stats.map((stat) => stat.stat.name);
                const statsRes = response.data.stats.map((stat) => stat.base_stat);
                const types = response.data.types.map((type) => type.type.name);
                const moves = response.data.moves.map((move) => move.move.name);
                const abilities = response.data.abilities.map((ability) => ability.ability.name);

                setPokemonData({
                    statsName,
                    statsRes,
                    types,
                    moves,
                    abilities,
                });
            })
            .catch((error) => {
                console.error("Error API", error);
            });
    }, [id]);

    if (!pokemonInfo) {
        return (
            <div className="page">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className='page'>
            <div className='header-page'>
               <h2>{pokemonInfo.name}</h2>
            <img
                src={pokemonInfo.sprites.front_default}
                alt={pokemonInfo.name}
            /> 
            </div>
            
            
            <div className="container about-pokemon-card-right">
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Stats" key="1">
                        <span>
                            Stats Name: {pokemonData.statsName.join(", ")} <br />
                        </span>
                        <span>Stats Res: {pokemonData.statsRes.join(", ")}</span>
                    </TabPane>

                    <TabPane tab="Types" key="2">
                        <span>Types: {pokemonData.types.join(", ")}</span>
                    </TabPane>

                    <TabPane tab="Moves" key="3">
                        <span>Moves: {pokemonData.moves.join(", ")}</span>
                    </TabPane>

                    <TabPane tab="Abilities" key="4">
                        <span>Abilities: {pokemonData.abilities.join(", ")}</span>
                    </TabPane>
                </Tabs>
            </div>
            <Link to={"/"}>
                <button>
                    Home
                </button>
            </Link>
        </div>
    );
};

export default Page;
