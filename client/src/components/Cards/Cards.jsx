import Card from '../Card/Card.jsx';
import React, { Component, useEffect } from 'react';
import { getAllPokemons, resetCards } from '../../redux/actions.js';
import { connect, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader.jsx'
import s from './Cards.module.css';


export default function Cards({currentPokemons}) {

	const dispatch = useDispatch();
	const allPokemons = useSelector( state => state.allPokemons );
	const loader = useSelector( state => state.loader );

	useEffect( () => {

		if(!loader){
			dispatch(getAllPokemons())
		}

		return () => {
			dispatch(resetCards());
		}

	},[])

	return (
		<div className={s.cardsContainer}>
				
 			{ loader ? <Loader /> 
 			: currentPokemons.map( p => (
				<Link className={s.linkStyles} to={`/detail/${p.id}`}>
 					<Card
						image={p.image}
						name={p.name}
 						types={p.types}
					/>
				</Link>
			))}
		</div>
	)
}


