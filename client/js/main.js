var app = angular.module('myStarWarsApp', ['ngRoute']);




app.config(['$routeProvider',
	function($routeProvider){
		$routeProvider
			.when('/welcome', {
				templateUrl: 'views/welcome.html',
				controller: 'LandingPageController'
			})
			.when('/people', {
				templateUrl: 'views/people.html',
				controller: 'MyListController'
			})
			.otherwise({
				redirectTo: '/welcome'
			})
}]);
