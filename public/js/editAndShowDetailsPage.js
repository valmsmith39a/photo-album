$(document).ready(init);

var arrayOfUserItemsG = []; 

function init(){
  console.log('inside edit init');
  $('#saveEditsBtn').on('click', saveEdits);
  getAllImages();
}

function getAllImages(){
  console.log('inside get all images');
  var albumId = $('.itemIdDiv').attr('id');
  console.log('album id', albumId);
  
  $.get('/images/getalbumimages/' + albumId, function(data) {
      arrayOfUserItemsG = data; 
      console.log('array of images', data);
      console.log('array of images', data[0].url);
      displayItems();
   });
}

function displayItems(){
  $('#list').empty();
  arrayOfRowContainersObjectsG.splice(0, arrayOfRowContainersObjectsG.length);

  var $titleRow = $('<tr>').addClass('row-container row-title');
  var $itemTitle = $('<td>').addClass('name-title ').text('Name');
  $titleRow.append($itemTitle);
  var $descriptionTitle = $('<td>').addClass('description-title ').text('Description');
  $titleRow.append($descriptionTitle);
  var $placeholder1 = $('<td>')
  $titleRow.append($placeholder1);
  var $placeholder2 = $('<td>')
  $titleRow.append($placeholder2);

  arrayOfRowContainersObjectsG.push($titleRow);

  arrayOfUserItemsG.map(function(item){
    var $rowContainer = $('<tr>').addClass('row row-container');
    var $nameColumn = $('<td>').addClass('name-col ').text(item.albumName);
    $rowContainer.append($nameColumn);
    var $descriptionColumn = $('<td>').addClass('description-col ').text(item.description);
    $rowContainer.append($descriptionColumn);
    var $deleteBtn = $('<button>').addClass('deleteBtn description-col ').text('Delete');
    $rowContainer.append($deleteBtn);
    var $edit = $('<button>').addClass('edit description-col ').text('View');
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

