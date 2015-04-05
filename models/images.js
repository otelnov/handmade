var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = function () {
	'use strict';

	var ImagesSchema = new Schema({
		category: String,
		title: String,
		fileName: String,
		id: String,
		createdAt: {type: Date, default: Date.now}
	});

	mongoose.model('Images', ImagesSchema, 'Images');
};
