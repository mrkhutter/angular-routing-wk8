var app = angular.module('myStarWarsApp', ['ngRoute']);


// this is our router config for url routing
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
