$(document).ready(init);
var arrayOfUserItemsG = [];
var arrayOfRowContainersObjectsG = [];

function init() {
  getUserAlbums(); 
  $('#addBtn').on('click', addNewAlbum);
  $('#list').on('click', '.deleteBtn', deleteItem);
  $('#list').on('click', '.edit', editAndShowDetailsPage);
}

function getUserAlbums(){
  $.get('/albums/getalluseralbums', function(data) {
      arrayOfUserItemsG = data; 
      displayItems();
   });
}

function addNewAlbum(){
  var name = $('#name').val();
  var description = $('#description').val();
  var albumObject = {};

  albumObject.albumName = name;
  albumObject.description = description; 
  albumObject.albumsArray = [];

  $.post("/albums/createalbum", albumObject)
  .done(function(data){
    getUserAlbums();
  })
  .fail(function(err){
    console.log(err)
    alert(err);
  })
}

function deleteItem(){
  var albumIndex = $(this).closest('.row-container').index() - 1;
  var albumObject = arrayOfUserItemsG[albumIndex];  
  var albumId = albumObject._id;

  $.ajax({
    method: "DELETE",
    url: "/albums/" + albumId + '/' + albumIndex
  })
  .done(function(status){
    getUserAlbums();
  });
}

function editAndShowDetailsPage(){
  var itemIndex = $(this).closest('.row-container').index() - 1;
  var itemObject = arrayOfUserItemsG[itemIndex];  
  var albumId = itemObject._id;
  var albumName = itemObject.albumName;
  
  location.href = '/albums/editshowdetailspage/' + albumId + '/' + albumName;
}

function displayItems(){
  $('#list').empty();
  arrayOfRowContainersObjectsG.splice(0, arrayOfRowContainersObjectsG.length);

  var $titleRow = $('<tr>').addClass('row-container row-title');
  var $itemTitle = $('<td>').addClass('name-title col-md-6 col-xs-6').text('Name');
  $titleRow.append($itemTitle);
  var $descriptionTitle = $('<td>').addClass('description-title col-md-6 col-xs-6').text('Description');
  $titleRow.append($descriptionTitle);
  var $placeholder1 = $('<td>')
  $titleRow.append($placeholder1);
  var $placeholder2 = $('<td>')
  $titleRow.append($placeholder2);

  arrayOfRowContainersObjectsG.push($titleRow);

  arrayOfUserItemsG.map(function(item){
    var $rowContainer = $('<tr>').addClass('row row-container');
    var $nameColumn = $('<td>').addClass('name-col col-md-3 col-xs-3').text(item.albumName);
    $rowContainer.append($nameColumn);
    var $descriptionColumn = $('<td>').addClass('description-col col-md-3 col-xs-3').text(item.description);
    $rowContainer.append($descriptionColumn);
    var $deleteBtn = $('<button>').addClass('deleteBtn description-col col-md-3 col-xs-3').text('Delete');
    $rowContainer.append($deleteBtn);
    var $edit = $('<button>').addClass('edit description-col col-md-3 col-xs-3').text('View');
    $rowContainer.append($edit);

    arrayOfRowContainersObjectsG.push($rowContainer);
  });

  $('#list').append(arrayOfRowContainersObjectsG);
}








