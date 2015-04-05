angular.module('hm.controllers')
	.controller('HomeController', [
		'$scope', 'CatalogService',
		function ($scope, CatalogService) {
			CatalogService.getItems(function (err, images) {
				$scope.images = images;
			});
		}
	])
	.directive('repeatFinished', function () {
		return function (scope) {
			if (scope.$last) {
				var $grid = $('#tp-grid'),
					$name = $('#name'),
					$close = $('#close'),
					$loader = $('<div class="loader"><i></i><i></i><i></i><i></i><i></i><i></i><span>Loading...</span></div>').insertBefore($grid),
					stapel = $grid.stapel({
						randomAngle: true,
						delay: 50,
						gutter: 70,
						pileAngles: 5,
						onLoad: function () {
							$loader.remove();
						},
						onBeforeOpen: function (pileName) {
							$name.html(pileName);
						},
						onAfterOpen: function (pileName) {
							$close.show();
						}
					});

				$close.on('click', function () {
					$close.hide();
					$name.empty();
					stapel.closePile();
				});
			}
		};
	});