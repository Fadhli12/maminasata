/**
 * Created by Genesis on 03/02/2016.
 */
myApp.controller('mapCtrl', function ($scope, $http, $interval, $stateParams) {
    var myOptions = {
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    //app api

    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    // init directions service
    var dirService = new google.maps.DirectionsService();
    var dirRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
    dirRenderer.setMap(map);
    //var infoWindow = new google.maps.InfoWindow();

    if ($stateParams.id_koridor) {
        var koridor = $stateParams.id_koridor;
    } else {
        var koridor = 3;
    }
    var halteMarkers = [];
    var infowindow = [];
    var busMarkers = [];
    $scope.getRute = function (id_koridor) {
        // console.log('set rute');
        $http.post('public/app/model/getRute.php', {koridor: id_koridor})
            .then(function (res) {
                getMap(res.data);
                setHalte(res.data.halte);
            }, function () {
                console.log('error');
            });
    };
    $scope.getRute(koridor);

    function getMap(rute) {
        //google app
        // console.log('get app');
        var request = {
            origin: rute.start,
            destination: rute.end,
            waypoints: rute.direction,
            travelMode: google.maps.TravelMode.DRIVING
        };
        dirService.route(request, function (result, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                dirRenderer.setDirections(result);
            }
        });
    }

    function setHalte(halte) {
        // console.log('set halte');
        for (i = 0; i < halte.length; i++) {
            var marker = new google.maps.Marker({
                map: map,
                position: new google.maps.LatLng(halte[i].latitude, halte[i].longitude),
                title: halte[i].nama,
                animation: google.maps.Animation.DROP
            });
            marker.content = '' +
                '<div id="content">' +
                '   <div id="siteNotice">' +
                '       Informasi Halte' +
                '   </div>' +
                '   <h5 id="firstHeading" class="firstHeading">'+halte[i].nama+'</h5>' +
                '     <div id="bodyContent">' +
                '       <p></p>' +
                '     </div>' +
                '</div>';
            halteMarkers.push(marker);
        }
        var infowindow = null;
        infowindow = new google.maps.InfoWindow({
            content: ''
        });

        for (var i = 0; i < halteMarkers.length; i++) {
            var marker = halteMarkers[i];
            google.maps.event.addListener(marker, 'click', function () {
                infowindow.setContent(this.content);
                infowindow.open(map, this);
            });
        }
    }

    function setBus() {
        // console.log('set bus')
        $http.post('public/app/model/getPerjalananBus.php',{id_koridor : koridor})
            .then(function(res){
                if (res.data != 'null'){
                    $scope.dataBus = res.data;
                    var latitude = res.data.latitude;
                    var longitude = res.data.longitude;
                    var title = res.data.nama;

                    var bus = {latitude: latitude, longitude: longitude};
                    var iconBase = 'assets/img/icon/';
                    var marker = new google.maps.Marker({
                        map: map,
                        position: new google.maps.LatLng(bus.latitude, bus.longitude),
                        title: title,
                        icon: iconBase + 'icon-bus.png'
                    });

                    busMarkers.push(marker);
                    for (m = 1; m <= busMarkers.length; m++) {
                        if (m < busMarkers.length) {
                            busMarkers[m - 1].setMap(null);
                        }
                        if (m == busMarkers.length) {
                            busMarkers[m - 1].setMap(map);
                        }
                    }
                    $scope.getETA();
                } else {
                    console.log('tidak ada bus!');
                }

            },function(){
                console.log('error');
            })
    }

    /*for (x = 0 ; x < busMarkers.length; x++){
     halteMarkers[x].setMap(map);
     infowindow[x].setMap(map);
     }*/
    $interval(setBus, 5000);

    //materalizecss jquery script

    $http.post('public/app/model/getHalte.php',{'id_koridor':koridor})
        .then(function(res){
            $scope.dataKoridor = res.data
        },function(){
            console.log('error');
        })
    $scope.pencarian = {};

    $scope.getETA = function(){
        if (($scope.pencarian.halte != undefined) && ($scope.pencarian.halte != '')){
            var latitude_bus = $scope.dataBus.latitude;
            var longitude_bus = $scope.dataBus.longitude;
            $http.post('public/app/model/getLocationHalte.php',{'id_halte':$scope.pencarian.halte})
                .then(function(res){
                    console.log(res.data);
                    var latitude_halte = res.data.latitude;
                    var longitude_halte = res.data.longitude;

                    var request = {
                        origin:  latitude_bus+','+longitude_bus,
                        destination: latitude_halte+','+longitude_halte,
                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                    };

                    dirService.route(request, function(response, status) {
                        if (status == google.maps.DirectionsStatus.OK) {

                            // Display the distance:
                            //     console.log('distance='+response.routes[0].legs[0].distance.value);

                            // Display the duration:
                            //     console.log('time='+response.routes[0].legs[0].duration.value);


                            $scope.eta = parseInt(response.routes[0].legs[0].distance.value)/ (parseInt($scope.dataBus.kecepatan)*1000/3600) ;
                            if ($scope.eta > 3600){
                                $scope.etaJam = Math.floor($scope.eta/3600);
                                $scope.eta = $scope.eta - ($scope.eatJam * 3600);
                            }
                            if ($scope.eta > 60){
                                $scope.etaMenit = Math.floor($scope.eta/60);
                                $scope.eta = $scope.eta - ($scope.etaMenit * 60);
                            }
                            $scope.etaDetik = Math.floor($scope.eta);
                            dirRenderer.setDirections(response);
                        }
                    });
                },function(){
                    console.log('error');
                });
        }
    }

});
