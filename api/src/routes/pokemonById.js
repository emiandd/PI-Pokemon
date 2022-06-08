const { Router } = require('express');
const router = Router();
const model = require('./functions/');

router.get('/pokemons/:id', async (req, res) => {

	const { id } = req.params;

	try {
		// statements
		res.send(await model.getPokemonById(id));	
	} catch(e) {
		// statements
		res.status(404).send(e);
	}

})


module.exports = router;