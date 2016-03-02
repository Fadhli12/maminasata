    $('.modal-trigger').leanModal();
    $('select').material_select();

    $('#map-picker').locationpicker({
        location: {latitude: -5.149417530110843, longitude: 119.43779541062008},
        radius: 0,
        inputBinding: {
            latitudeInput: $('#latitude'),
            longitudeInput: $('#longitude'),
            locationNameInput: $('#lokasi-kordinat')
        },
        enableAutocomplete: true
    });
    $('#map-btn').on('click', function () {
        $('#map-picker').locationpicker('autosize');
    });

    $('#map-picker-halte').locationpicker({
        location: {latitude: -5.149417530110843, longitude: 119.43779541062008},
        radius: 0,
        inputBinding: {
            latitudeInput: $('#latitude-halte'),
            longitudeInput: $('#longitude-halte'),
            locationNameInput: $('#lokasi-kordinat-halte')
        },
        enableAutocomplete: true
    });