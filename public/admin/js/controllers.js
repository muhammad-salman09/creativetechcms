
adminApp.controller('NavCtrl', function($scope, $state){
	$scope.active = $state;
	$scope.isActive = function(viewLocation){
		var active = (viewLocation === $state.current.name);
		return active;
	};
});

adminApp.controller('dashCtrl', function($scope, $state){
    return true;
});

adminApp.controller('loginCtrl', function($scope, $state){
    return true;
});

adminApp.controller('settingsCtrl', function($scope, $state, FileUploader, settingList, Settings){
    var uploader = $scope.uploader = new FileUploader({
        url: '/admin/upload'
    });

    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };

    $scope.setting = settingList;

    /*if(settingList[0].maintenance == true){
        $scope.setting.maintenance = "on";
	}else{
        $scope.setting.maintenance = "off";
	}*/

    $scope.onChange = function(cbState) {
        $scope.setting[0].maintenance = cbState.maintenance;
        Settings.add(cbState).then(function(res){
            console.log(res);
        });
        console.log(cbState);
    };
    //console.log(__dirname);
    //console.log(settingList[0].logo);

    //return true;
});

adminApp.controller('AllPostsCtrl', function($scope, postList){
	$scope.posts = postList;
	$scope.activePost = false;
	$scope.setActive = function(post){
		$scope.activePost = post;
	}
});

adminApp.controller('AddPostCtrl', function($scope, Posts){
	$scope.post = {};
	$scope.addPost = function(newPost){
		Posts.add(newPost).then(function(res){
			console.log(res);
		});
	};
});