angular.module('jse.links')
	.controller('LinksController', [
		'$scope', 'CommonService', 'LinksService', '$timeout', '$modal', 'user', '$q', 'config', 'TagsService', 'notify', '$window',
		function linksController($scope, commonService, linksService, $timeout, $modal, user, $q, config, tagsService, notify, $window) {

			$scope.pagePreloader = true;

			linksService.get(function (err, data) {

				if (!data.links.length) {
					$scope.pagePreloader = false;
				}

				$scope.$on('ALWAYS', function () {
					$scope.pagePreloader = false;
				});

				notify.config({duration: 3500, startTop: 3});

				$scope.links = data.links;
				$scope.userId = user.providerId;
				$scope.gridMode = true;
				$scope.host = config.HOST;

				tagsService.get(function (err, data) {
					$scope.tags = data.tags;
				});

				$scope.addLink = function (e) {
					if (e && e.which !== 13 || !$scope.link) {
						return;
					}
					$scope.linkSaveSpinner = true;
					var url = $scope.link;
					$scope.link = '';
					commonService.uniqueId(5, function (err, id) {
						var short = id + 'l';
						var link = {
							short: short,
							link: url
						};
						linksService.post(link, function (err, resp) {
							if (err) {
								$scope.linkSaveSpinner = false;
								notify({
									message: 'Link is not valid or service is unavailable.',
									classes: 'alert-warning'
								});
								return;
							}

							delete resp.link.short;
							$scope.links.unshift(resp.link);
							$scope.linkSaveSpinner = false;

							makeScreenshot(resp.link, short);
						});
					});
				};

				function makeScreenshot(link, short) {
					link.preloader = true;
					linksService.makeScreenshot({link: link.link, short: short}, function (err) {
						link.preloader = false;
						if (!err) {
							link.short = short;
						}
					});
				}

				$scope.deleteLink = function (link, index) {
					var modalInstance = $modal.open({
						templateUrl: '/components/common/confirmModal.html',
						controller: 'ConfirmModalController',
						size: 'sm',
						resolve: {
							data: function () {
								return {
									message: 'Are you sure you want to delete "' + link.title + '"&nbsp;?',
									submitText: '<i class="fa fa-trash-o fa-fw"></i> Delete',
									title: 'Confirmation'
								};
							}
						}
					});
					modalInstance.result.then(function () {
						$scope.links.splice(index, 1);
						linksService.delete(link, angular.noop)
					});
				};

				$scope.updateLinkTitle = function (link, value) {
					if (link.title != value) {
						linksService.put({_id: link._id, title: value}, angular.noop);
					}
				};

				$scope.favourite = function (link) {
					link.isFavourite = !link.isFavourite;
					linksService.put({_id: link._id, isFavourite: link.isFavourite}, angular.noop);
				};

				$scope.socialShare = function (link) {
					var width = 575;
					var height = 400;
					var left = ($window.innerWidth - width) / 2;
					var top = ($window.innerHeight - height) / 2;

					var opts = 'status=1' +
						',width=' + width +
						',height=' + height +
						',top=' + top +
						',left=' + left;

					var target = "http://www.facebook.com/sharer.php?s=100&p[title]=" +
						link.title + "&p[summary]=" + link.description +
						"&p[url]=" + link.link + "&p[images][0]=" +
						$scope.host + "/uploads/" + $scope.userId + "/links/" + link.short + ".jpg";

					$window.open(target, 'Share in Facebook', opts);
				};

				$scope.filterStatus = false;
				$scope.setFilter = function (filter) {
					$scope.filter = filter;
					$scope.search = '';
					$scope.filterStatus = false;
				};

				$scope.addTag = function (link, tag) {
					tagsService.add(tag, function (err, data) {
						link.tags[link.tags.length - 1] = data.tag;
						linksService.addTag({linkId: link._id, tagId: data.tag._id}, angular.noop);
					});
				};

				$scope.removeTag = function (link, tag) {
					linksService.removeTag({linkId: link._id, tagId: tag._id}, angular.noop);
				};

				$scope.onSearch = function () {
					$scope.filter = $scope.search;
				};

				$scope.goTo = function (link) {
					window.open(link.link, '_blank');
				};

				$scope.copyClick = function (link) {
					if (!FlashDetect.installed) {
						prompt('Copy to clipboard: Ctrl+C, Enter', $scope.host + '/l/' + link.short);
						return;
					}
					link.copy = true;
					var timer = $timeout(
						function () {
							link.copy = false;
							$timeout.cancel(timer);
						},
						1500
					);
				};

				$scope.getLinkClass = function (link) {
					return link.tags[0] && link.tags[0].class ? link.tags[0].class : 'info';
				};

				$scope.loadTags = function (q) {
					return getTags();
				};

				function getTags() {
					var deferred = $q.defer();
					deferred.resolve($scope.tags);
					return deferred.promise;
				}






				$scope.newClass = function (index) {
					var classes = [
						{class: 'blue-jeans'},
						//{class: 'aqua'},
						//{class: 'mint'},
						//{class: 'grass'},
						//{class: 'sunflower'},
						{class: 'bittersweet'},
						{class: 'bittersweet'},
						{class: 'bittersweet'},
						{class: 'bittersweet'},
						{class: 'bittersweet'},
						{class: 'grapefruit'},
						{class: 'lavender'},
						{class: 'pink-rose'},
						{class: 'dark-gray'}
					];
					if(index>9){
						index = index%classes.length;
					}
					return classes[index].class;
				}


			});
		}
	]);