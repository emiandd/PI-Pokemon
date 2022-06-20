const { Router } = require('express');
const router = Router();
const model = require('./functions');
const { Sequelize } = require('sequelize');
const { Type } = require('../db.js');



router.get('/types', async (req, res) => {


	try {
		return res.send(await model.getAllTypes());
	} catch(e) {
		return res.status(404).send({error:e})
	}
})


module.exports = router;