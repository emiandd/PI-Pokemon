export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_DETAIL_POKEMON = 'GET_DETAIL_POKEMON';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
export const GET_ALL_TYPES = 'GET_ALL_TYPES';
export const FILTERED_BY_TYPE = 'FILTERED_BY_TYPE';
export const FILTERED_BY_DB_OR_API = 'FILTERED_BY_DB_OR_API';


export function getAllPokemons(){

	const url = 'http://localhost:3001/pokemons';

	return async function(dispatch){

		return await fetch(url)
			.then( response => response.json() )
			.then( data =>  {
				dispatch({type: GET_ALL_POKEMONS, payload: data})
			})
	}
}

export function getDetailPokemon(id){

	const url = `http://localhost:3001/pokemons/${id}`;

	return async function(dispatch){

		return await fetch(url)
			.then( response => response.json() )
			.then( data =>  {
				dispatch({type: GET_DETAIL_POKEMON, payload: data})
			})
	}
}

export function getPokemonByName(name){

	const url = `http://localhost:3001/pokemons?name=${name}`;

	return async function(dispatch){

		return await fetch(url)
			.then( response => response.json() )
			.then( data =>  {
				dispatch({type: GET_POKEMON_BY_NAME, payload: data})
			})
	}
}

export function getTypes(){

	const url = `http://localhost:3001/types`;

	return async function(dispatch){

		return await fetch(url)
			.then( response => response.json() )
			.then( data =>  {
				dispatch({type: GET_ALL_TYPES, payload: data})
			})
	}
}

export function filteredByType(type){

	const url = `http://localhost:3001/pokemons`;

	return async function(dispatch){

		return await fetch(url)
			.then( response => response.json() )
			.then( data =>  {
				const filteredPokemons = data.filter( p => p.types.filter( t => t === type ).length );
				console.log(filteredPokemons.map( p => p.types));
				dispatch({type: FILTERED_BY_TYPE, payload: type === 'All' ? data : filteredPokemons })
			})
	}
}

export function filteredByDBorAPI(value){

	const url = `http://localhost:3001/pokemons`;

	return async function(dispatch){

		return await fetch(url)
			.then( response => response.json() )
			.then( data =>  {
				if(value === 'created' || value === 'All'){
					let filteredPokemons = data.filter( p => p.id.toString().length > 30 );
					console.log(filteredPokemons);
					dispatch({type: FILTERED_BY_DB_OR_API, payload: value === 'All' ? data : filteredPokemons })
				}else if(value === 'originals' || value === 'All'){
					let filteredPokemons = data.filter( p => p.id.toString().length < 30 );
					console.log(filteredPokemons);
					dispatch({type: FILTERED_BY_DB_OR_API, payload: filteredPokemons })
				}
			})
	}
}

