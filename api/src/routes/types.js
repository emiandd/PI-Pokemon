const { Router } = require('express');
const router = Router();
const model = require('./functions');
const { Sequelize } = require('sequelize');
const { Type } = require('../db.js');



router.get('/types', async (req, res) => {


	try {
		res.send(await model.getAllTypes());
	} catch(e) {
		res.status(404).send(e)
	}
})


module.exports = router;