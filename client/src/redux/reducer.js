import { GET_ALL_POKEMONS,
		 GET_DETAIL_POKEMON,
		 GET_POKEMON_BY_NAME,
		 GET_ALL_TYPES,
		 FILTERED_BY_TYPE,
		 FILTERED_BY_DB_OR_API,
		 SORT_BY_ATTACK,
		 SORT_BY_NAME,
		 CREATE_NEW_POKEMON,
		 RESET_DETAIL,
		 RESET_CARDS,
		 LOADER } from './actions.js';

const initialState = {
	allPokemons: [],
	pokemonDetail: {},
	pokemonByName: {},
	allTypes: [],
	newPokemon: {},
	loader: false,
}

export default function reducer(state = initialState, action){

	switch (action.type) {
		case GET_ALL_POKEMONS:
			return{
				...state,
				allPokemons: action.payload
			}

		case GET_DETAIL_POKEMON:
			return{
				...state,
				pokemonDetail: action.payload
			}

		case GET_POKEMON_BY_NAME:
			if(action.payload.error){
				alert(action.payload.error);
				return state;
			}
			return{
				...state,
				allPokemons: action.payload
			}

		case GET_ALL_TYPES:
			return{
				...state,
				allTypes: action.payload
			}

		case FILTERED_BY_TYPE:
			if(action.payload.length === 0){
				alert('No se encontraron resultados');
				return state;
			}
			return{
				...state,
				allPokemons: action.payload
			}

		case FILTERED_BY_DB_OR_API:
			if(action.payload.length === 0){
				alert('No se encontraron resultados');
				return state;
			}
			return{
				...state,
				allPokemons: action.payload
			}

		case SORT_BY_ATTACK:
			return{
				...state,
				allPokemons: action.payload
			}

		case SORT_BY_NAME:
			return{
				...state,
				allPokemons: action.payload
			}

		case CREATE_NEW_POKEMON:
			return{
				...state,
				newPokemon: action.payload
			}

		case RESET_DETAIL:
			return{
				...state,
				pokemonDetail: action.payload
			}

		case RESET_CARDS:
			return{
				...state,
				allPokemons: action.payload
			}

		case LOADER:
			return{
				...state,
				loader: action.payload
			}

		default:
			return state;
	}

}