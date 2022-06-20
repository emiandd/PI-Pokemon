const { Router } = require('express');
const router = Router();
const model = require('./functions/');

router.get('/pokemons/:id', async (req, res) => {

	const { id } = req.params;

	try {
		// statements
		return res.send(await model.getPokemonById(id));	
	} catch(e) {
		// statements
		return res.status(404).json({error:'The pokemon you are trying to find does not exist'});
	}

})


module.exports = router;