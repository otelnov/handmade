angular.module('hm.controllers')
	.controller('ItemController', [
		'$scope', 'CatalogService', '$state',
		function ($scope, CatalogService, $state) {
			var id = $state.params.itemName;
			var category = $state.params.catName;
			CatalogService.getItem({
				id: id,
				category: category
			}, function (err, image) {
				$scope.image = image;
			});
		}
	]);