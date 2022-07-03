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
		// console.log(p.data);
		let pokemon = {
			id: p.data.id,
			name: p.data.name,
			types: p.data.types.map( types => types.type),
			attack: p.data.stats[1].base_stat,
			image: p.data.sprites.other['official-artwork'].front_default
		}

		return pokemon;
	})
	
	const resDB = await Pokemon.findAll({include:Type});

	const dataPokemonDB = resDB.map( p => {
		// console.log(p.dataValues);
		let pokemonDB = {
			id: p.dataValues.id,
			name: p.dataValues.name,
			types: p.dataValues.types,
			attack: p.dataValues.attack,
			image: p.dataValues.image
		}
		return pokemonDB;
	})
	// console.log(dataPokemonDB);
	return dataByPokemon.concat(dataPokemonDB);
}

async function getPokemonById(id){

	if(id < 1 || id > 50 || id.length > 2){
		const pDB = await Pokemon.findByPk(id, {include:Type});
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
			types: p.data.types.map(p => p.type),
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
				types: p.data.types.map(p => p.type),
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

	if(!name || !life || !attack || !defense || !speed || !height || !weight || !image || types.length === 0){
		throw 'Missing data to create a new Pokemon!';
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

	return 'New Pokemon Created Successfully!';
		
}

async function updatePokemon(id, obj){

	const { name, life, attack, defense, speed, height, weight } = obj;

	if(!name || !life || !attack || !defense || !speed || !height || !weight){
		throw 'It is not allowed to update fields without information';
	}

	if(id.length > 10){

		const pToUpdate = await Pokemon.findByPk(id);	

		if(pToUpdate){
			let newValues = {
				name: name,
				life: life,
				attack: attack,
				defense: defense,
				speed: speed,
				height: height,
				weight: weight
			}

			Pokemon.update(newValues, {
				where: {id}
			})

			return 'Successfully updated pokemon';
		}else{
			throw 'Pokemon not found';
		}
	}
}



module.exports = {
	getAllPokemons,
	getPokemonById,
	getPokemonByName,
	getAllTypes,
	createNewPokemon,
	updatePokemon
}