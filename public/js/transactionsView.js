'use strict';
$(document).ready(init);
var arrayOfUserItemsG = [];
var arrayOfRowContainersObjectsG = [];

function init() {
  console.log('in init() of dashboard.js');
  // getUserItems(); 
  //$("#view-tradingpage").on('click', viewTradingPage)
  /*$('#addBtn').on('click', addNewItem);
  $('#list').on('click', '.deleteBtn', deleteItem)*/

  getRequestedItems(); 
  getAcceptDeclineItems(); 
}

function getRequestedItems(){
  console.log('get requested items');

}

function getAcceptDeclineItems(){
  console.log('get accepted/decline items');

}



function deleteItem(){
  console.log("we are in")
  var itemIndex = $(this).closest('.row-container').index() - 1;
  var itemObject = arrayOfUserItemsG[itemIndex];  
  var itemId = itemObject._id;

    $.ajax({
    method: "DELETE",
    url: "/items/" + itemId
    })
    .done(function(status){
      getUserItems()
    });

}
function displayItems(){

  $('#list').empty();
  arrayOfRowContainersObjectsG.splice(0, arrayOfRowContainersObjectsG.length);

  var $titleRow = $('<tr>').addClass('row-container row-title');
  var $itemTitle = $('<td>').addClass('name-title col-md-6 col-xs-6').text('Name');
  $titleRow.append($itemTitle);
  var $descriptionTitle = $('<td>').addClass('description-title col-md-3 col-xs-3').text('Description');
  $titleRow.append($descriptionTitle);

  arrayOfRowContainersObjectsG.push($titleRow);

  arrayOfUserItemsG.map(function(item){
    var $rowContainer = $('<tr>').addClass('row row-container');
    var $nameColumn = $('<td>').addClass('name-col ').text(item.itemName);
    $rowContainer.append($nameColumn);
    var $descriptionColumn = $('<td>').addClass('description-col ').text(item.description);
    $rowContainer.append($descriptionColumn);
    var $deleteBtn = $('<button>').addClass('deleteBtn description-col ').text('Delete');
    $rowContainer.append($deleteBtn);
    var $edit = $('<button>').addClass('edit description-col ').text('Edit');
    $rowContainer.append($edit);



    arrayOfRowContainersObjectsG.push($rowContainer);
  });

  $('#list').append(arrayOfRowContainersObjectsG);
}


function getUserItems(){
  console.log('get user items');

  $.get('/items/useritems', function(data){
    console.log('data is: ', data);

    arrayOfUserItemsG = data; 

    displayItems();

   });


}