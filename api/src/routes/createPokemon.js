const { Router } = require('express');
const router = Router();
const model = require('./functions');


router.post('/pokemons', async (req, res) => {

	try {
		const newPokemon = await model.createNewPokemon(req.body);
		return res.status(201).json(newPokemon);
	} catch(e) {
		return res.status(400).json({error:e});
	}

})


module.exports = router;