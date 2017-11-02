
var app = angular.module('mean-blog.home', [
	'ui.router',
    'mean-blog.settings',
	'ngMaterial'
]);

app.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "/home/templates/main.html",
			controller: 'MainCtrl'
		});

	$urlRouterProvider.otherwise("/");
});