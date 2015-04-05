angular.module('hm.controllers', []);
angular.module('hm.services', []);

angular.module('hm.modules', [
	'hm.controllers',
	'hm.services'
]);

var app = angular.module('hm.app', [
	'hm.modules',
	'ui.router',
	'ngResource',
	'ngSanitize',
	'ui.bootstrap'
]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
	function ($stateProvider, $urlRouterProvider, $locationProvider) {

		//$locationProvider.html5Mode(true);
		//$locationProvider.hashPrefix('!');

		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state('hm', {
				abstract: true,
				resolve: {
					//config: function ($http) {
					//	return $http({method: 'GET', url: '/api/config'}).then(function (resp) {
					//		return resp.data.data;
					//	});
					//},
					//user: function ($http) {
					//	return $http({method: 'GET', url: '/api/users/me'}).then(function (resp) {
					//		if (resp.data.error) {
					//			//return $q.reject('user not logged in');
					//
					//		}
					//		return resp.data.data.user;
					//	});
					//}
				},
				views: {
					'@': {
						templateUrl: '/components/common/layout.html'
					},
					'header@hm': {
						templateUrl: '/components/common/header.html',
						controller: 'HeaderController'
					},
					'footer@hm': {
						templateUrl: '/components/common/footer.html',
						controller: 'FooterController'
					}
				}
			})
			.state('hm.home', {
				url: '/',
				templateUrl: '/components/home/home.html',
				controller: 'HomeController'
			})
			.state('hm.catalog', {
				url: '/catalog',
				templateUrl: '/components/catalog/catalog.html',
				controller: 'CatalogController'
			})
			.state('hm.category', {
				url: '/catalog/:catName',
				templateUrl: '/components/catalog/category.html',
				controller: 'CategoryController'
			})
			.state('hm.item', {
				url: '/catalog/:catName/:itemName',
				templateUrl: '/components/catalog/item.html',
				controller: 'ItemController'
			});
	}]);

