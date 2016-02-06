'use strict';

$(document).ready(init);
var arrayOfAllUsersAlbumsG = [];

function init() {
  console.log('inside init of all Users Albums .js');
  $('#list').on('click', '.useralbum', goToAlbum);
}

function goToAlbum(e){
  e.preventDefault();
  //arrayOfAllUsersAlbumsG = $('#all-users-albums').data('al');
  console.log('array of users albums', arrayOfAllUsersAlbumsG);
  console.log('inside go to album');
  console.log('clicking on this item: ', typeof $(this).data('album-id').replace(/\"/g,""));
  
  var albumId = $(this).data('album-id').replace(/\"/g,"");

  location.href = '/albums/userpublicalbum/' + albumId;
  
}