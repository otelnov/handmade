angular.module('hm.controllers')
	.controller('HomeController', [
		'$scope', 'CatalogService',
		function ($scope, CatalogService) {
			$scope.items = CatalogService.getItems();
		}
	]);