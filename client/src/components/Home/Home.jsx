import React, { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import Cards from '../Cards/Cards.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPokemons } from '../../redux/actions.js'



export default function Home() {

	const dispatch = useDispatch();
	const allPokemons = useSelector( state => state.allPokemons);

	const [currentPage, setCurrentPage] = useState(1);
	const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
	const indexLastPokemon = currentPage * pokemonsPerPage;
	const indexFirstPokemon = indexLastPokemon - pokemonsPerPage;
	const currentPokemons = allPokemons.slice(indexFirstPokemon, indexLastPokemon);

	const paginated = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	useEffect( () => {
		dispatch(getAllPokemons());
	}, [dispatch]);

	return (
		<div>
			<Navbar />
			<Cards currentPokemons={currentPokemons} />
			<Pagination 
				pokemonsPerPage={pokemonsPerPage}
				allPokemons={allPokemons.length}
				paginated={paginated}
				currentPage={currentPage}		
			/>
		</div>
	)
}
