import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Loader from '../Loader/Loader.jsx'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDetailPokemon, resetDetail } from '../../redux/actions.js';
import s from './PokemonDetail.module.css';

export default function PokemonDetail() {

	const { id } = useParams();
	const dispatch = useDispatch();
	const loader = useSelector( state => state.loader );
	const pokemonDetail = useSelector( state => state.pokemonDetail );

	useEffect(() => {
		if(!loader){
			dispatch(getDetailPokemon(id));
		}
		return () => {
			dispatch(resetDetail());
		}

	},[dispatch])

	return (
		<div>
			<Navbar />

			{loader ? <Loader /> 
			: <div className={s.detailContainer}>
				<div className={s.detailLeft}>
					<img src={pokemonDetail.image} alt={`${pokemonDetail.name} image`} />
				</div>
				<div className={s.detailRight}>
					<h1>{pokemonDetail.name}</h1>
					<p>ID: {pokemonDetail.id}</p>
					<div className={s.info}>
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
					<div className={s.types}>
					{pokemonDetail.types?.map(t => (
						<p className={s.typeTextDetail} id={t.name}>{t.name}</p>
					))}
					</div>
				</div>
			</div>}
		</div>
	)
}