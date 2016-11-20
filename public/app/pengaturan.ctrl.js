/**
 */
myApp.controller('pengaturanCtrl',function($scope,$http){
    $scope.getUser = function(){
        $http.get('public/app/model/getUser.php')
            .then(function(res){
                $scope.user = res.data.user;
            },function(){

            })
    }
    $scope.getUser();

    $scope.editUser = function($index){
        $scope.edit = $scope.user[$index];
        $('#edit-modal').openModal();
    }
    $scope.saveUser = function(){
        $http.post('public/app/model/saveUser2.php',$scope.edit)
            .then(function(){
                $scope.getUser();
            },function() {

            })
    }
    $scope.add = {};
    $scope.tambahUser = function(){
        $('#tambah-user-modal').openModal()
    }
    $scope.saveUser2 = function(){
        $http.post('public/app/model/tambahUser.php',$scope.add)
            .then(function(){
                $scope.getUser();
            },function () {
                
            })
    }
    $scope.id_user = '';
    $scope.confirmDelete = function($index){
        $scope.id_user = $scope.user[$index].id_user;
        $('#delete-modal').openModal();
    }

    $scope.hapusUser = function(){
        $http.post('public/app/model/hapusUser.php',{id_user:$scope.id_user})
            .then(function(){
                $scope.getUser();
            },function(){
                console.log('error');
            })
    }

});
