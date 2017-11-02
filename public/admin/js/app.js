
var adminApp = angular.module('mean-blog.admin', [
	'ui.router',
	'btford.markdown',
    'ui.tinymce',
	'mean-blog.posts',
    'mean-blog.settings',
    'angularFileUpload',
	'ngMaterial'
]);

adminApp.config(function($stateProvider, $urlRouterProvider){
    //$urlRouterProvider.when('settings', '/admin/settings/');

	$urlRouterProvider.otherwise('/');
	
	$stateProvider
        .state('dashboard', {
            url: '/',
            templateUrl: '/admin/templates/dashboard.html',
            controller: 'dashCtrl'
        })
        .state('settings', {
            url: '/settings',
            views: {
                '': {
                		templateUrl: '/admin/templates/settings.html',
						resolve: {
							settingList: function(Settings){
								return Settings.all().then(function(data){
									return data;
								});
							}
						},
                    	controller: 'settingsCtrl'
                	}
            }
        })
		.state('allPosts', {
			url: '/allPosts',
			templateUrl: '/admin/templates/allPosts.html',
			resolve: {
				postList: function(Posts){
					return Posts.all().then(function(data){
						return data;
					});
				}
			},
			controller: 'AllPostsCtrl'
		})
		.state('addPost', {
			url: '/addPost',
			templateUrl: '/admin/templates/addPost.html',
			controller: 'AddPostCtrl'
		});
});

angular
    .module('MyAppMaterial',['ngMaterial'])
    .controller('MaterialCtrl', function($scope) {
        return true;
    })
    .config(function($mdThemingProvider) {

        // Configure a dark theme with primary foreground yellow

    });

