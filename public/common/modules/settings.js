
var settingsModule = angular.module('mean-blog.settings', []);

settingsModule.service('Settings', function($http){

	return {
		all: function(){
			return $http.get('/api/settings').then(function(settingsList){
				return settingsList.data;
			});
		},
		add: function(newPost){
			return $http({
				method: 'post',
				url: '/api/settings',
				data: newPost
			}).then(function(res){
				// return the new post
				return res.data;
			}).catch(function(err){
				console.error('Something went wrong adding the post!');
				console.error(err);
				return err;
			});
		},
		remove: function(){

		},
		update: function(){

		}
	};
});