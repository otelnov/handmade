angular.module('jse.links')
	.service('LinksService', [
		'$resource',
		function linksService($resource) {
			var resource = $resource('api/links/:param', {}, {
				put: {method: 'PUT'},
				addTag: {params: {param: 'addTag'}, method: 'PUT'},
				removeTag: {params: {param: 'removeTag'}, method: 'PUT'},
				makeScreenshot: {params: {param: 'makeScreenshot'}, method: 'POST'}
			});

			var service = {
				get: function (cb) {
					resource.get(function (resp) {
						cb(resp.error, resp.data, resp);
					});
				},
				put: function (data, cb) {
					resource.put(data, function (resp) {
						cb(resp.error, resp.data, resp);
					});
				},
				addTag: function (data, cb) {
					resource.addTag(data, function (resp) {
						cb(resp.error, resp.data, resp);
					});
				},
				removeTag: function (data, cb) {
					resource.removeTag(data, function (resp) {
						cb(resp.error, resp.data, resp);
					});
				},
				post: function (data, cb) {
					resource.save(data, function (resp) {
						cb(resp.error, resp.data, resp);
					});
				},
				delete: function (data, cb) {
					resource.delete({short: data.short, _id: data._id}, function (resp) {
						cb(resp.error, resp.data, resp);
					});
				},
				makeScreenshot: function(data, cb){
				  resource.makeScreenshot(data, function(resp){
				    cb(resp.error, resp);
				  });
				}
			};

			return service;
		}
	]);