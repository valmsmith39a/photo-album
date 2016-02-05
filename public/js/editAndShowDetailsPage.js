$(document).ready(init);

var arrayOfUserItemsG = []; 
var arrayOfRowContainersObjectsG = [];

function init(){
  console.log('inside edit init');
  $('#saveEditsBtn').on('click', saveEdits);
  $("#list").on('click', '.full-image', viewFullImage);
  $("#list").on('click', '.deleteBtn', deleteItem);
  $("#list").on('click', '#saveEditsBtn', saveEdits);

  getAllImages();
}

function getAllImages(){
  var albumId = $('.itemIdDiv').attr('id');

  $.get('/images/getalbumimages/' + albumId, function(data) {
      arrayOfUserItemsG = data; 
      displayItems();
   });
}

function viewFullImage() {
  console.log('In view full image');
  var imageIndex = $(this).closest('.row-container').index() - 1;
  var imageObject = arrayOfUserItemsG[imageIndex];  
  var imageURL = imageObject.url;
  var imageId = imageObject._id; 

  location.href = '/images/fullimage/' + imageId; 
}

function deleteItem() {
  var imageIndex = $(this).closest('.row-container').index() - 1;
  var imageObject = arrayOfUserItemsG[imageIndex];  
  var imageId = imageObject._id;
  var albumId = $('.itemIdDiv').attr('id');

  $.ajax({
    method: "DELETE",
    url: "/images/" + imageId + '/' + albumId + '/' + imageIndex
  })
  .done(function(status){
    getAllImages();
  });
}

function displayItems() {
  $('#list').empty();
  arrayOfRowContainersObjectsG.splice(0, arrayOfRowContainersObjectsG.length);

  var $titleRow = $('<tr>').addClass('row-container row-title');
  var $itemTitle = $('<td>').addClass('name-title ').text('Name');
  $titleRow.append($itemTitle);
  var $descriptionTitle = $('<td>').addClass('description-title ').text('Image');
  $titleRow.append($descriptionTitle);
  var $placeholder1 = $('<td>')
  $titleRow.append($placeholder1);
  var $placeholder2 = $('<td>')
  $titleRow.append($placeholder2);

  arrayOfRowContainersObjectsG.push($titleRow);

  arrayOfUserItemsG.map(function(item){
    var $rowContainer = $('<tr>').addClass('row row-container');
    
    var $nameColumn = $('<td>').addClass('name-col').text(item.name);
    $rowContainer.append($nameColumn);
    
    var $imageColumn = $('<img>').addClass('image-col').attr('src', item.url);
    $rowContainer.append($imageColumn);
    
    var $deleteBtn = $('<button>').addClass('deleteBtn description-col').text('Delete');
    $rowContainer.append($deleteBtn);
    
    var $edit = $('<button>').addClass('full-image description-col').text('Full Image');
    $rowContainer.append($edit);

    arrayOfRowContainersObjectsG.push($rowContainer);
  });

  $('#list').append(arrayOfRowContainersObjectsG);
}


function saveEdits(e){
  e.preventDefault();

  var name = $('#album-name').val();
  var description = $('#album-description').val(); 
  var albumId = $('.itemIdDiv').attr('id'); 
  
  var itemObj = {};
  itemObj.albumName = name; 
  itemObj.description = description; 

  $.ajax({
    method: 'PUT',
    url: '/albums/editalbum/' + albumId,
    data: itemObj
    })
    .done(function(data, status) {
      location.href = '/users/profilepage';
      alert('Your edits have been saved');
    });
}

