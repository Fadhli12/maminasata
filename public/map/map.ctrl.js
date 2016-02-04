/**
 * Created by Genesis on 03/02/2016.
 */
myApp.controller('mapCtrl',function($scope,$http){
    // init map
    <!-- Modal -->
    $(document).ready(function(){
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal-trigger').leanModal();});
    $('#modal1').openModal();
    $('#modal1').closeModal();

    //google map
    var myOptions = {
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    // init directions service
    var dirService = new google.maps.DirectionsService();
    var dirRenderer = new google.maps.DirectionsRenderer({suppressMarkers: true});
    dirRenderer.setMap(map);

    // highlight a street
    var request = {
        origin: "-5.1352519,119.4216353",
        destination: "-5.1352519,119.4216353",
        //waypoints: [{location:"48.12449,11.5536"}, {location:"48.12515,11.5569"}],
        waypoints: [
                    {location:"-5.1352519,119.4216353"},
                    {location:"-5.1408939,119.4237934"},
                    {location:"-5.1582229,119.422984"},
                    {location:"-5.1719245,119.4274351"},
                    {location:"-5.1544616,119.4367416"}
                    ],
        travelMode: google.maps.TravelMode.DRIVING
    };
    dirService.route(request, function(result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            dirRenderer.setDirections(result);
        }
    });


    //marker
    var halte =
        [
            {latitude: -5.1352519,longitude:119.4216353},
            {latitude: -5.1408939,longitude:119.4237934},
            {latitude:-5.1582229,longitude:119.422984},
            {latitude:-5.1719245,longitude:119.4274351}
        ];
    $scope.markers = [];

    var infoWindow = new google.maps.InfoWindow();

    var createMarker = function (halte) {

        var marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(halte.latitude, halte.longitude),
            title: 'halte'
        });
        marker.content = '' +
            '<div class="infoWindowContent">' +
            '   <h4>' + marker.title + '</h4>  ' +
            '   <p><i class="fa fa-map-marker"></i> Lokasi :' + halte.latitude + ' ,' + halte.longitude + '</p>' +
            '</div>';
        google.maps.event.addListener(marker, 'click', function () {
            /*open map default content*/
            infoWindow.setContent(marker.content);
            infoWindow.open(map, marker);
        });

        $scope.markers.push(marker);
    };

    //inisiasi marker
    for (i = 0; i < halte.length; i++){
        createMarker(halte[i]);
    }
    var iconBase = 'assets/img/icon/';
    var createMarkerBus = function (bus) {

        var marker = new google.maps.Marker({
            map: map,
            position: new google.maps.LatLng(bus.latitude, bus.longitude),
            icon : iconBase+'icon-bus.png',
            title: 'Maminasata 1'
        });
        marker.content = '' +
            '<div class="infoWindowContent">' +
            '   <h4>' + marker.title + '</h4>  ' +
            '   <p><i class="fa fa-dashboard"></i> Keceptan : 30 km/jam</p>' +
            '   <p><i class="fa fa-bus"></i> Status : OTW</p>' +
            '   <p><i class="fa fa-clock-o"></i> ETA : 15 menit</p>' +
            '</div>';
        google.maps.event.addListener(marker, 'click', function () {
            /*open map default content*/
            infoWindow.setContent(marker.content);
            infoWindow.open(map, marker);
        });

        $scope.markers.push(marker);
    };

    var bus = {latitude:-5.138828,longitude:119.420517};
    createMarkerBus(bus)

    ,119.4183705
});