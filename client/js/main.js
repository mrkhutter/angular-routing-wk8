var app = angular.module('myStarWarsApp', ['ngRoute']);

var baseUrl = 'http://swapi.co/api/';

app.controller('MyWelcomeController', ['$scope', '$rootScope', '$location',
	function($scope, $rootScope, $location){
		$scope.setUser = function(){
			$rootScope.currentUserName = $scope.userName;
			$scope.userName = '';
            $location.path('/people');
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

app.controller('PersonController', ['$scope', '$location', '$http', '$rootScope', '$routeParams',
	function($scope, $location, $http, $rootScope, $routeParams){

		$scope.init = function(){
			$scope.personID = $routeParams.id;
			$scope.getPerson();
		}

    $scope.goBack = function() {
        $location.path('/people');
    }

		$scope.getPerson = function(){
			$http({
				method: 'GET',
				url: baseUrl + 'people/'  + $scope.personID
			}).then(function(response){
				$scope.person = response.data;
				console.log($scope.person);
			}, function(err) {
                console.error(err);
            });
		};

	}
]);

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
