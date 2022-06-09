const axios = require('axios');
const { Pokemon, Type } = require('../../db.js');


async function getAllPokemons(){

	// console.log('obteniendo todos los pokemons');
	const url = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40';
	const firstRequest = await axios.get(url);
	const subRequest = firstRequest.data.results.map( pokemon => axios.get(pokemon.url) );
	// console.log(subRequest);
	const result = await Promise.all(subRequest);
	// console.log(result);
	const dataByPokemon = result.map( p => {
		let pokemon = {
			name: p.data.name,
			types: p.data.types.map(p => p.type.name),
			image: p.data.sprites.other['official-artwork'].front_default
		}
		return pokemon;
	})
	
	const resDB = await Pokemon.findAll({include:Type});

	const dataPokemonDB = resDB.map( p => {
		// console.log(p.dataValues.types[0].name);
		let pokemonDB = {
			name: p.dataValues.name,
			types: p.dataValues.types.map(p => p.name),
			image: p.dataValues.image
		}
		return pokemonDB;
	})
	// console.log(dataPokemonDB);
	return dataByPokemon.concat(dataPokemonDB);
}

async function getPokemonById(id){

	if(id < 1 || id > 39 || id.length > 2){
		const pDB = await Pokemon.findByPk(id);
		// console.log(pDB);
		return pDB.dataValues;
	}

	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const p = await axios.get(url);

	const dataByPokemon = {
			id: p.data.id,
			name: p.data.name,
			height: p.data.height,
			weight: p.data.weight,
			types: p.data.types.map(p => p.type.name),
			image: p.data.sprites.other['official-artwork'].front_default,
			life: p.data.stats[0].base_stat,
			attack: p.data.stats[1].base_stat,
			defense: p.data.stats[2].base_stat,
			speed: p.data.stats[3].base_stat
		}

	return dataByPokemon;
}

async function getPokemonByName(name){

	const pDB = await Pokemon.findOne({
			where: {
				name: name
			},
			include: Type
	})

	if(!pDB){
		const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
		const p = await axios.get(url);

		const dataByPokemon = {
				id: p.data.id,
				name: p.data.name,
				height: p.data.height,
				weight: p.data.weight,
				types: p.data.types.map(p => p.type.name),
				image: p.data.sprites.other['official-artwork'].front_default,
				life: p.data.stats[0].base_stat,
				attack: p.data.stats[1].base_stat,
				defense: p.data.stats[2].base_stat,
				speed: p.data.stats[3].base_stat
		}
		return dataByPokemon;
	}

	return pDB.dataValues;
}

async function getAllTypes(){

	const url = `https://pokeapi.co/api/v2/type`;
	const request = await axios.get(url);
	const types = request.data.results;
	// types.map( type => )
	const names = types.map( type => type.name);
	names.map( typeName => {
			Type.findOrCreate({where: {
				name: typeName
			}})
		})

	resDB = await Type.findAll();
	// console.log(types);
	// console.log(names);
	return resDB;
}

async function createNewPokemon(obj){

	const { name, life, attack, defense, speed, height, weight, image, types } = obj;

	await axios.get('http://localhost:3001/types');

	if(!name || !life || !attack || !defense || !speed || !height || !weight || !image || !types){
		throw 'Faltan datos para poder crear un nuevo Pokemon!';
	}

	let typesDB = types.map( type => {
		return Type.findAll({
			where: {
				name: type
			}
		});
	})
	// console.log(typesDB);
	typesDB = await Promise.all(typesDB);
	typesDB = await typesDB.flat();
	// console.log(typesDB2);
	let idTypes = typesDB.map( t => t.id );
	// console.log(typesDB2);

	let newPokemon = await Pokemon.create(obj);

	newPokemon.addType(idTypes);

	return 'Nuevo Pokemon creado exitosamente!';
		
}



module.exports = {
	getAllPokemons,
	getPokemonById,
	getPokemonByName,
	getAllTypes,
	createNewPokemon
}