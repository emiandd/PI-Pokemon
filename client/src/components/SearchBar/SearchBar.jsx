import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonByName } from '../../redux/actions.js';
import s from './SearchBar.module.css'

export default function SearchBar() {

	const [name, setName] = useState('');

	const dispatch = useDispatch();

	function handleInputChange(event){
		// console.log(event.target.value);
		setName(event.target.value);
	}

	function handleSubmit(event){
		if(name === ''){
			alert('Please type a pokemon name');
		}
		dispatch(getPokemonByName(name));
		setName('');
	}

	return (
		<div>
			<input value={name}
				   type="text" 
				   placeholder="Type a Pokemon Name"
				   onChange={(e) => handleInputChange(e)}
				   className={s.inputSearch} />

			<button onClick={(e) => handleSubmit(e)} className={s.btnSearch}>Search</button>
		</div>
	)
}