import { GET_ALL_POKEMONS } from './actions.js';

const initialState = {
	allPokemons: []
}

export default function reducer(state = initialState, action){

	switch (action.type) {
		case GET_ALL_POKEMONS:
			return{
				...state,
				allPokemons: action.payload
			}
		default:
			return state;
	}

}