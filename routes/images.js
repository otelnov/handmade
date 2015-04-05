var mongoose = require('mongoose');
var Images = mongoose.model('Images');

module.exports = function (app) {
	'use strict';

	var router = app.get('router');

	router.get('/api/images', function (req, res) {
		res.json({e: 4});
	});

};