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
  var itemIndex = $(this).closest('.row-container').index() - 1;
  var itemObject = arrayOfUserItemsG[itemIndex];  
  var itemId = itemObject._id;

  $.ajax({
    method: "DELETE",
    url: "/albums/" + itemId
  })
  .done(function(status){
    getUserAlbums();
  });
}

function editAndShowDetailsPage(){
  var itemIndex = $(this).closest('.row-container').index() - 1;
  var itemObject = arrayOfUserItemsG[itemIndex];  
  var itemId = itemObject._id;

  location.href = '/albums/editshowdetailspage/' + itemId;
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








