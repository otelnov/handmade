angular.module('jse.common')
	.service('CommonService', [
		'$resource',
		function commonService($resource) {

			var service = {
				cache: {
					get: function (key, cb) {
						return cb(null, cache[key]);
					},
					set: function (key, value, cb) {
						cache[key] = value;
						return cb(null, cache[key]);
					},
					del: function (key, cb) {
						delete cache[key];
						return cb();
					}
				},
				uniqueId: function (length, cb) {
					var id = ("0000" + (Math.random() * Math.pow(36, length) << 0).toString(36)).slice(-length);
					cb(null, id);
				}
			};

			return service;
		}
	]);
