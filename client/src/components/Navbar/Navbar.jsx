import React from 'react'
import styles from './Navbar.css';

export default function Navbar() {
	return (
		<nav className='navbar'>
			<div className='top-nav'>
				<div className='logotipo'>
					<h1>Poke App</h1>
				</div>	
				<div>
					<input type="text" placeholder="Type a Pokemon Name" />
					<button>Search</button>
				</div>
				<div>
					<button>Create a Pokemon!</button>
				</div>
			</div>
			
			<div className='bottom-nav'>
				<div>
					<select name="types" id="1">
						<option value="types">Types</option>
						<option value="ground">Ground</option>
						<option value="electric">Electric</option>
						<option value="water">Water</option>
					</select>
					<select name="pokemons" id="1">
						<option value="types">All Pokemons</option>
						<option value="types">Originals</option>
						<option value="ground">Created By Me</option>
					</select>
				</div>
				<div className='ordering'>
					<select name="order by" id="1">
						<option value="types">-</option>
						<option value="ground">Ascending</option>
						<option value="electric">Descending</option>
					</select>
					<select name="pokemons" id="1">
						<option value="name-attack">-</option>
						<option value="name">Name</option>
						<option value="attack">Attack</option>
					</select>
				</div>
			</div>
			
		</nav>
	)
}