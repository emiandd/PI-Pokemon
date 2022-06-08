const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const allPokemons = require('./pokemons.js');
const pokemonById = require('./pokemonById.js');
const types = require('./types.js');
const createPokemon = require('./createPokemon.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/', allPokemons);
router.use('/', pokemonById);
router.use('/', types);
router.use('/', createPokemon);


module.exports = router;
