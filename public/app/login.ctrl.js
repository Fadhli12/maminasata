/**
 * Created by Genesis on 03/02/2016.
 */
myApp.controller('loginCtrl', function ($scope,userModel) {
    $scope.login={};
    $scope.doLogin = function(valid){
        if (valid){
            var data = {
                username : $scope.login.username,
                password : $scope.login.password
            };
            userModel.doLogin(data);
        }
    }
});
