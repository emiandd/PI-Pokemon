import React, { useEffect } from 'react'
import styles from './Navbar.css';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons,
		 getTypes,
		 filteredByType, 
		 filteredByDBorAPI,
		 sortByAttack } from '../../redux/actions.js';

export default function Navbar({setCurrentPage}) {

	const dispatch = useDispatch();
	const pokemonTypes = useSelector( state => state.allTypes);

	// console.log(pokemonTypes.map( t => t.name ));

	useEffect( () =>  {
		dispatch(getTypes())
	}, [dispatch])


	function clickHome(){
		dispatch(getAllPokemons());
	}

	function handleChangeSelectByType(e){
		// console.log(e.target.value);
		dispatch(filteredByType(e.target.value));
		setCurrentPage(1);
	}

	function handleFilteredByDBorAPI(e){
		// console.log(e.target.value)
		dispatch(filteredByDBorAPI(e.target.value));
		setCurrentPage(1);
	}

	function handleSortByAttack(e){
		console.log(e.target.value)
		dispatch(sortByAttack(e.target.value));
		setCurrentPage(1);
	}

	let actualURL = window.location.href;

	return (
		<nav className='navbar'>
			<div className='top-nav'>
				<div className='logotipo'>
				    <Link to='/home' onClick={(e) => clickHome(e)}>
						<h1>Poke App</h1>
					</Link>
				</div>	
				<div className={actualURL.includes('detail') ? 'displayNone' : 'search'}>
					<SearchBar />
				</div>
				<div>
					<button>Create a Pokemon!</button>
				</div>
			</div>
			
			<div className={actualURL.includes('detail') ? 'displayNone' : 'bottom-nav'}>
				<div>
					<select onChange={ (e) => handleChangeSelectByType(e) } name="types" id="1">
						<option value="All">-- All --</option>
						{pokemonTypes?.map( t => 
							<option value={t.name}>{t.name}</option>
						)}
					</select>
					<select onChange={ (e) => handleFilteredByDBorAPI(e) }  name="pokemons" id="1">
						<option value="All">-- All --</option>
						<option value="originals">Originals</option>
						<option value="created">Created By Me</option>
					</select>
				</div>
				<div className='ordering'>
					<select onChange={ (e) => handleSortByAttack(e) } name="order by" id="1">
						<option value="unordered">-- Unordered --</option>
						<option value="ascending">Ascending</option>
						<option value="descending">Descending</option>
					</select>
					<select name="pokemons" id="1">
						<option value="unordered">-- Unordered --</option>
						<option value="ascending">Ascending</option>
						<option value="descending">Descending</option>
					</select>
				</div>
			</div>
			
		</nav>
	)
}