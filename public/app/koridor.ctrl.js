/**
 * Created by Genesis on 03/02/2016.
 */
myApp.controller('koridorCtrl',function(){
    $(document).ready(function(){
        // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
        $('.modal-trigger').leanModal();
        $('select').material_select();

        $('#map-modal').openModal();
        $('#map-modal').closeModal();

        $('#edit-modal').openModal();
        $('#edit-modal').closeModal();
    });
});
