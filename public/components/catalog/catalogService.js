angular.module('hm.services')
	.service('CatalogService', [
		'$http',
		function ($http) {

			var service = {
				getItems: function (cb) {
					$http.get('/api/images').success(function (data) {
						if (data.error) {
							return cb(true);
						}
						cb(false, data.images)
					}).error(function () {
						cb(true)
					});
				},
				getItem: function (data, cb) {
					$http.get('/api/image/' + data.category + '/' + data.id).success(function (data) {
						if (data.error) {
							return cb(true);
						}
						cb(false, data.image)
					}).error(function () {
						cb(true)
					});
				}
			};

			return service;
		}
	]);