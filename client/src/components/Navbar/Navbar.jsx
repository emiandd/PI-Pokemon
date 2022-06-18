import React, { useEffect } from 'react'
import s from './Navbar.module.css';
import SearchBar from '../SearchBar/SearchBar.jsx';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons,
		 getTypes,
		 filteredByType, 
		 filteredByDBorAPI,
		 sortByAttack,
		 sortByName } from '../../redux/actions.js';

export default function Navbar({setCurrentPage}) {

	const dispatch = useDispatch();
	const pokemonTypes = useSelector( state => state.allTypes);

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
		// console.log(e.target.value)
		dispatch(sortByAttack(e.target.value));
		setCurrentPage(1);
	}

	function handleSortByName(e){
		// console.log(e.target.value)
		dispatch(sortByName(e.target.value))
		setCurrentPage(1);
	}

	let actualURL = window.location.href;

	return (
		<nav className={s.navbar}>
			<div className={s.topNav}>
				<div className={s.logotipo}>
				    <Link to='/home' onClick={(e) => clickHome(e) } className={s.homeLink}>
						<h1>Poke App</h1>
					</Link>
				</div>	
				<div className={actualURL.includes('detail') || actualURL.includes('createpokemon') ? s.displayNone : s.search}>
					<SearchBar />
				</div>
				<div>
					<Link to='/createpokemon' >
						<button >Create a Pokemon!</button>
					</Link>
				</div>
			</div>
			
			<div className={actualURL.includes('detail') || actualURL.includes('createpokemon') ? s.displayNone : s.bottomNav }>
				<div>
					<p>Filter By Type</p>
					<select onChange={ (e) => handleChangeSelectByType(e) } name="filterType" id="1">
						<option value="All">-- All --</option>
						{pokemonTypes?.map( t => 
							<option value={t.name}>{t.name}</option>
						)}
					</select>
				</div>
				<div>
					<p id={s.filterDBorAPIText}>Filter By Originals or Created</p>
					<select onChange={ (e) => handleFilteredByDBorAPI(e) }  name="filterDBorAPI" id="1">
						<option value="All">-- All --</option>
						<option value="originals">Originals</option>
						<option value="created">Created By Me</option>
					</select>
				</div>
				<div className='ordering'>
					<p>Sort By Attack</p>
					<select onChange={ (e) => handleSortByAttack(e) } name="sortAttack" id="1">
						<option value="unordered">-- Unordered --</option>
						<option value="ascending">Ascending</option>
						<option value="descending">Descending</option>
					</select>
				</div>
				<div>
					<p>Sort By Name</p>
					<select onChange={ (e) => handleSortByName(e) } name="sortName" id="1">
						<option value="unordered">-- Unordered --</option>
						<option value="ascending">A-Z</option>
						<option value="descending">Z-A</option>
					</select>
				</div>
			</div>
			
		</nav>
	)
}