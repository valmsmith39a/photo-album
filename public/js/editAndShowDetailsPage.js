$(document).ready(init);

var arrayOfUserItemsG = []; 
var arrayOfRowContainersObjectsG = [];

function init(){
  console.log('inside edit init');
  $('#saveEditsBtn').on('click', saveEdits);
  $("#list").on('click', '.full-image',viewFullImage);

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
  var itemIndex = $(this).closest('.row-container').index() - 1;
  var itemObject = arrayOfUserItemsG[itemIndex];  
  var imageURL = itemObject.url;
  /*
  $.get('/images/fullimage/' + 'aaa', function(data) {
      console.log('get success');
   });
   */
  location.href = imageURL; 
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


function saveEdits(){
  console.log('inside save edits function');
  
  /*
  var name = $('#name').val();
  var description = $('#description').val(); 
  var itemId = $('.itemIdDiv').attr('id'); 
  
  var itemObj = {};

  itemObj.name = name; 
  itemObj.description = description; 
  itemObj.itemId = itemId; 

  $.ajax({
    method: 'PUT',
    url: '/items/edititem',
    data: itemObj
    })
    .done(function(data, status) {
      location.href = '/dashboard';
      alert('Your edits have been saved');
    });
  */ 
}

