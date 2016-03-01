/**
 * Created by Genesis on 03/02/2016.
 */
myApp.controller('globalCtrl',function($scope,$http){
    $scope.koridor = [];
    $http.get('public/app/model/getKoridor.php')
        .then(function(res){
            $scope.koridor = res.data
        },function(){
            console.log('error')
        });

});
