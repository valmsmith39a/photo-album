$(document).ready(init);

var arrayOfUserItemsG = []; 
var arrayOfRowContainersObjectsG = [];

function init(){
  console.log('inside edit init');
  $("#list").on('click', '.user-image', viewFullImage);
}

function viewFullImage(e) {
  e.preventDefault();
  var imageId = $(this).data('image-id').replace(/\"/g,"");  
  location.href = '/images/fullimage/' + imageId; 
}
