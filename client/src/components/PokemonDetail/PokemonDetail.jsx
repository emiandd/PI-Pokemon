import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetailPokemon } from '../../redux/actions.js';
import './PokemonDetail.css';

export default function PokemonDetail() {

	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getDetailPokemon(id));
	},[dispatch])

	const pokemonDetail = useSelector( state => state.pokemonDetail );


	return (
		<div>
			<Navbar />
			<div className='detail-container'>
				<div className='detail-left'>
					<img src={pokemonDetail.image} alt="pokemon image" />
				</div>
				<div className='detail-right'>
					<h1>{pokemonDetail.name}</h1>
					<p>ID: {pokemonDetail.id}</p>
					<div className='info'>
					    <div>
							<h3>Life</h3>
							<p>{pokemonDetail.life}</p>

							<h3>Attack</h3>
							<p>{pokemonDetail.attack}</p>

							<h3>Defense</h3>
							<p>{pokemonDetail.defense}</p>

						</div>
						<div>
							<h3>Speed</h3>
							<p>{pokemonDetail.speed}</p>
							
							<h3>Height</h3>
							<p>{pokemonDetail.height}</p>

							<h3>Weight</h3>
							<p>{pokemonDetail.weight}</p>
						</div>
					</div>
					<div className='types'>
					{pokemonDetail.types?.map(t => (
						<p className='type-text-detail'>{t}</p>
					))}
					</div>
				</div>
			</div>
		</div>
	)
}