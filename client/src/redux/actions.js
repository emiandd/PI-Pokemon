export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';

export function getAllPokemons(){

	const url = 'http://localhost:3001/pokemons';

	return function(dispatch){

		return fetch(url)
			.then( response => response.json() )
			.then( data =>  {
				dispatch({type: GET_ALL_POKEMONS, payload: data})
			})
	}
}