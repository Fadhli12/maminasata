    $('#map-picker').locationpicker({
        location: {latitude: -5.149417530110843, longitude: 119.43779541062008},
        radius: 0,
        inputBinding: {
            latitudeInput: $('#latitude'),
            longitudeInput: $('#longitude'),
            locationNameInput: $('#lokasi')
        },
        enableAutocomplete: true
    });
    
    $('#map-btn').on('click', function () {
        $('#map-picker').locationpicker('autosize');
    });
