'use strict';

$(document).ready(init);
var arrayOfAllUsersAlbumsG = [];

function init() {
  $('#list').on('click', '.useralbum', goToAlbum);
}

function goToAlbum(e){
  e.preventDefault();
  //arrayOfAllUsersAlbumsG = $('#all-users-albums').data('al');
    
  var albumId = $(this).data('album-id').replace(/\"/g,"");
  location.href = '/albums/userpublicalbum/' + albumId;
}