var app = angular.module('myStarWarsApp', ['ngRoute']);

var baseUrl = 'http://swapi.co/';

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
				url: baseUrl + '/api/people/'
			}).then(function(response){
				$scope.people = response.data.results;
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
			.otherwise({
				redirectTo: '/welcome'
			})
}]);
