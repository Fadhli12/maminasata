/**
 * Created by Fadhli on 11/25/2015.
 */
myApp.factory('userModel', function ($http,$location,$cookies,$log) {
    var userModel = {};
    var statusUser;
    userModel.doLogin = function (loginForm) {
        return $http.post('public/app/model/login.php', {username: loginForm.username, password: loginForm.password})
            .then(function (response) {
                console.log(response);
                if (response.data.status_login == '0') {
                    alert(response.data.message);
                }
                if (response.data.status_login == '1') {
                    statusUser = response.data.status_user;
                    $location.path('/app/map/3');
                    $cookies.put('id_user',response.data.id_user);
                    $cookies.put('nama',response.data.nama)
                }
            }, function (response) {
                $log.info(response);
            })
    };
    userModel.doLogout = function(){
        $cookies.remove('id_user');
        $cookies.remove('nama');
    }
    userModel.getAuthStatus = function(){
        var status = $cookies.get('id_user');
        if (status){
            return true;
        } else {
            return false;
        }
    };
    return userModel;
});