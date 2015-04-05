var mongoose = require('mongoose');
var Images = mongoose.model('Images');
var dir = require('node-dir');
var async = require('async');

module.exports = function (app) {
	'use strict';

	var router = app.get('router');

	router.get('/api/images', function (req, res) {
		Images.find().lean().exec(function (err, images) {
			res.json({error: err, images: images});
		});
	});

	router.post('/api/images', function (req, res) {
		var path = __dirname + '/../public/uploads/catalog';
		dir.paths(path, function (err, paths) {
			var images = [];
			async.eachSeries(paths.files, function (e, callback) {
				if (e.slice(-4).toLowerCase() !== '.jpg') {
					return callback();
				}

				var pathArray = e.split('/');
				var category = pathArray[pathArray.length - 2];
				var fileName = pathArray[pathArray.length - 1];
				var name = fileName.substring(0, fileName.length - 4);
				var id = name;
				var title = name;

				Images.findOne({title: title, category: category}).lean().exec(function (err, image) {
					if (err || image !== null) {
						return callback(err);
					}
					var i = new Images();
					i.title = title;
					i.fileName = name;
					i.category = category;
					i.id = id;
					i.save(function (err, image) {
						images.push(image);
						return callback(err);
					});
				});

			}, function (err) {
				res.json({error: err, images: images});
			});
		});
	});

};