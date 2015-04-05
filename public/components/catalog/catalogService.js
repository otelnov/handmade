angular.module('hm.services')
	.service('CatalogService', [
		'$http',
		function ($http) {

			var service = {
				getItems: function () {
					return [
						{}
					];
				}
			};

			return service;
		}
	]);