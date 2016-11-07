var app = angular.module('myStarWarsApp', ['ngRoute', 'ngResource']);

var baseUrl = 'http://swapi.co/api/';

// var personResource = $resource(baseUrl + '/people/:person_ID', {person_ID: '@id'});

// personResource.get({person_ID: 2});

app.factory('PersonService', ['$http', '$resource',
	function($http, $resource){
		return $resource(baseUrl + 'people/:pid', {pid: '@pid'});
	}
]);

app.service('PersonService', ['$http', '$resource',
	function($http, $resource){
		this.getPerson = function(){
			$http.get(baseUrl + 'people/:pid', {pid: '@pid'});
		}
	}
]);

app.controller('MyWelcomeController', ['$scope', '$rootScope', '$location',
	function($scope, $rootScope, $location){
		$scope.setUser = function(){
			$rootScope.currentUserName = $scope.userName;
			$scope.userName = '';
            $location.path('/people');
		};
	}
]);

app.controller('PersonController', ['$scope', '$routeParams', '$http', 'PersonService', 
	function($scope, $routeParams, $http, PersonService){
		var personId = $routeParams.id;

		$scope.init = function(){
			$scope.getPerson();
		}

		$scope.getPerson = function(){
			PersonService.getPerson(personId)
			.then
			PersonService.get({pid: personId}, function(data){
				$scope.person = data;
			})
		};
	}
]);

app.controller('MyListController', ['$scope', '$location', '$http', '$rootScope',
	function($scope, $location, $http, $rootScope){

		$scope.init = function(){
			$scope.getPeople();
		}

        $scope.goBack = function() {
            $location.path('/welcome');
        }

		$scope.getPeople = function(){
			$http({
				method: 'GET',
				url: baseUrl + 'people/'
			}).then(function(response){
				$scope.people = response.data.results;
				$scope.people.forEach(function(person){
					person.url = person.url.replace(baseUrl, '');
				});
			}, function(err) {
                console.error(err);
            });
		};

	}]);

app.config(['$routeProvider',
	function($routeProvider){
		$routeProvider
			.when('/welcome', {
				templateUrl: 'views/welcome.html',
				controller: 'MyWelcomeController'
			})
			.when('/people', {
				templateUrl: 'views/people.html',
				controller: 'MyListController'
			})
			.when('/people/:id', {
				templateUrl: 'views/person.html',
				controller: 'PersonController'
			})
			.otherwise({
				redirectTo: '/welcome'
			})
}]);
