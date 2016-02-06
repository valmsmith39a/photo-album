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
  /*
  $.get('/albums/userpublicalbum/' + albumId, function(err, data){
    console.log('get to public user album succeeded');
  });
  */
  // var albumObject = 

  /*
  // Get the index of the album 
  // Get the albumId 
  var albumIndex = $(this).closest('.row-container').index() - 1;
  var albumObject = arrayOfUserItemsG[albumIndex];  
  // Get reqest by sending album's id in a param 
  // render the page similar to edit details page 
  var albumId = albumObject._id;

  $.get('', object).
    .done(data){
      console.log(data);
    })
    .fail(err){
      console.log(err);
    });
  */
}