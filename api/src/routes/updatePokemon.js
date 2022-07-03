const { Router } = require('express');
const router = Router();
const model = require('./functions');

router.put('/pokemons/:id', async (req, res) => {

	const { id } = req.params;

	try {
		// statements
		const updatePokemon = await model.updatePokemon(id, req.body);
		return res.status(200).json(updatePokemon);
	} catch(e) {
		// statements
		return res.status(400).json({error:e});
	}


})

module.exports = router;