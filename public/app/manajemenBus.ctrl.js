/**
 */
myApp.controller('manajemenBusCtrl',function($scope,$http,$stateParams){
    $http.get('public/app/model/getKoridorOnly.php')
        .then(function(res){
            $scope.koridor = res.data
        },function(){
            console.log('error');
        });
    $scope.getBus = function(){
        $http.get('public/app/model/getListBus.php')
            .then(function(res){
                $scope.listBus = res.data;
            },function(){
                console.log('error');
            });

    }
    $scope.getBus();
    $scope.editBus = function(index){
        $scope.edit = {};
        $scope.edit.id_bus = $scope.listBus[index].id_bus;
        $scope.edit.nama_bus = $scope.listBus[index].nama_bus;
        $scope.edit.id_koridor = $scope.listBus[index].id_koridor;
        $scope.edit.status_bus = $scope.listBus[index].status_bus;

        $('#edit-modal').openModal();
    }

    $scope.editUser = function(index){
        $scope.edit2 = {};
        $scope.edit2.username = $scope.listBus[index].username;
        $scope.edit2.id = $scope.listBus[index].id;
        $scope.edit2.nama = $scope.listBus[index].nama;
        $scope.edit2.no_telp = $scope.listBus[index].no_telp;
        $scope.edit2.status = $scope.listBus[index].status;
        $scope.edit2.password = $scope.listBus[index].password;

        $('#edit-user-modal').openModal();
    }
    
    $scope.saveBus = function(){
        $http.post('public/app/model/saveBus.php',$scope.edit)
            .then(function(){
                $scope.getBus();
            },function(){
                console.log('error');
            })
    }
    
    $scope.saveUser = function(){
        $http.post('public/app/model/saveUser.php',$scope.edit2)
            .then(function(){
                $scope.getBus();
            },function(){
                console.log('error');
            })
    }
    
    $scope.confirmDelete = function(index){
        $scope.index_bus = index;
        $('#delete-modal').openModal();
    }
    
    $scope.hapusBus = function(index){
        var id_bus = $scope.listBus[index].id_bus;
        var id_user = $scope.listBus[index].id;
        $http.post('public/app/model/hapusBus.php',{'id_bus':id_bus,'id_user':id_user})
            .then(function(){
                $scope.getBus();
            },function(){
                console.log('error');
            })
    }
});
