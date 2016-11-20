/**
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
