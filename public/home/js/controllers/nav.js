app.controller('NavCtrl', function($scope, $state){
    $scope.active = $state;
    $scope.isActive = function(viewLocation){
        var active = (viewLocation === $state.current.name);
        return active;
    };
});