const { Router } = require('express');
const router = Router();
const model = require('./functions');


router.get('/pokemons', async (req, res) => {

	const { name } = req.query;

	try {
		if(name){
			return res.send(await model.getPokemonByName(name));
		}else{
			return res.send(await model.getAllPokemons());
		}


	} catch(e) {
		res.status(404).json({error:'The pokemon you are trying to find does not exist'});
	}

})


module.exports = router;