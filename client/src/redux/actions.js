export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_DETAIL_POKEMON = 'GET_DETAIL_POKEMON';
export const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
export const GET_ALL_TYPES = 'GET_ALL_TYPES';
export const FILTERED_BY_TYPE = 'FILTERED_BY_TYPE';
export const FILTERED_BY_DB_OR_API = 'FILTERED_BY_DB_OR_API';
export const SORT_BY_ATTACK = 'SORT_BY_ATTACK';
export const SORT_BY_NAME = 'SORT_BY_NAME';
export const CREATE_NEW_POKEMON = 'CREATE_NEW_POKEMON';
export const RESET_DETAIL = 'RESET_DETAIL';
export const RESET_CARDS = 'RESET_CARDS';
export const LOADER = 'LOADER';
export const RESET_FORM = 'RESET_FORM';
export const UPDATE_POKEMON = 'UPDATE_POKEMON';
export const RESET_FORM_UPDATE = 'RESET_FORM_UPDATE';

export function getAllPokemons(){

	const url = `http://localhost:3001/pokemons`;

	return async function(dispatch){
		dispatch({type: LOADER, payload: true})
		return await fetch(url)
			.then( response => response.json() )
			.then( data =>  {
				dispatch({type: GET_ALL_POKEMONS, payload: data})
				dispatch({type: LOADER, payload: false})
			})
	}
}

export function getDetailPokemon(id){

	const url = `http://localhost:3001/pokemons/${id}`;

	return async function(dispatch){
		dispatch({type: LOADER, payload: true})
		return await fetch(url)
			.then( response => response.json() )
			.then( data =>  {
				dispatch({type: GET_DETAIL_POKEMON, payload: data})
				dispatch({type: LOADER, payload: false})
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
				const filteredPokemons = data.filter( p => p.types.filter( t => t.name === type ).length );
				// console.log(filteredPokemons.map( p => p.types));
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
					// console.log(filteredPokemons);
					dispatch({type: FILTERED_BY_DB_OR_API, payload: value === 'All' ? data : filteredPokemons })
				}else if(value === 'originals'){
					let filteredPokemons = data.filter( p => p.id.toString().length < 30 );
					// console.log(filteredPokemons);
					dispatch({type: FILTERED_BY_DB_OR_API, payload: filteredPokemons })
				}
			})
	}
}

export function sortByAttack(value){

	const url = `http://localhost:3001/pokemons`;

	return async function(dispatch){

		return await fetch(url)
			.then( response =>  response.json() )
			.then( data =>  {

				if(value === 'unordered'){
					dispatch({type: SORT_BY_ATTACK, payload: data })
				}else if(value === 'ascending'){
					// console.log('ordenando ascendentemente');
					let pokemonSortAscending = data.sort((a,b) => (a.attack - b.attack));
					dispatch({type: SORT_BY_ATTACK, payload: pokemonSortAscending })
					// console.log(pokemonSortAscending);
				}else if (value === 'descending'){
					// console.log('ordenando descendentemente');
					let pokemonSortDescending = data.sort((a,b) => (b.attack - a.attack));
					dispatch({type: SORT_BY_ATTACK, payload: pokemonSortDescending })
					// console.log(pokemonSortAscending);
				}

			})

	}

}

export function sortByName(value){

	const url = `http://localhost:3001/pokemons`;

	return async function(dispatch){

		return await fetch(url)
			.then( response =>  response.json() )
			.then( data =>  {

				if(value === 'unordered'){
					dispatch({type: SORT_BY_NAME, payload: data })
				}else if(value === 'ascending'){
					console.log('ordenando ascendentemente de la A a la Z');
					let pokemonSortAscending = data.sort((a,b) => {

						if(a.name.toLowerCase() === b.name.toLowerCase()){
							return 0;
						}else if(a.name.toLowerCase() > b.name.toLowerCase()){
							return 1;
						}
						return -1;
					});
					// console.log(pokemonSortAscending);
					dispatch({type: SORT_BY_NAME, payload: pokemonSortAscending })
				}else if(value === 'descending'){
					console.log('ordenando descendentemente de la Z a la A');
					let pokemonSortDescending = data.sort((a,b) => {

						if(b.name.toLowerCase() === a.name.toLowerCase()){
							return 0;
						}else if(b.name.toLowerCase() > a.name.toLowerCase()){
							return 1;
						}
						return -1

					})
					// console.log(pokemonSortDescending);
					dispatch({type: SORT_BY_NAME, payload: pokemonSortDescending })
				}
			})
	}

}

export function createNewPokemon(obj){

	const url = `http://localhost:3001/pokemons`;
	const options = {
		method: 'POST',
		headers: {'Content-Type' : 'Application/json'},
		body: JSON.stringify(obj)
	}

	return async function(dispatch){

		return await fetch(url, options)
			.then( response => response.json() )
			.then( data => {
				dispatch({type: CREATE_NEW_POKEMON, payload: data })
			})
	}
}

export function resetDetail(){
	return { type: RESET_DETAIL, payload: {} }
}

export function resetCards(){
	return { type: RESET_CARDS, payload: [] }
}

export function resetForm(){
	return { type: RESET_FORM, payload: {} }
}

export function updatePokemon(id, obj){

	const url = `http://localhost:3001/pokemons/${id}`;

	const options = {
		method: 'PUT',
		headers: {'Content-Type' : 'Application/json'},
		body: JSON.stringify(obj)
	}
	return async function(dispatch){

		return await fetch(url, options)
			.then( response => response.json() )
			.then( data => {
				dispatch({type: UPDATE_POKEMON, payload: data })
			})
	}
}

export function resetFormUpdate(){
	return { type: RESET_FORM_UPDATE, payload: {} }
}