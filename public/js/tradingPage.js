$(document).ready(init);

var arrayOfAllItemsG = [];
var arrayOfRowContainersObjectsG = [];
var currentUserObject = [];

function init(){
  getAllTransactions(); 
  $('#list').on('click', '.tradeRequestButton', userChoicePage);
}

function getAllTransactions(){
  console.log('inside get all transactions in trading page.js');
  $.get('/items/allitems')
  .success(function(data){
    arrayOfAllItemsG = data; 
    displayItems();
   })
  .fail(function(err){
    console.log('error: ', err);
   });
}

function userChoicePage(){
  var itemIndex = $(this).closest('.row-container').index() - 1;
  var itemObject = arrayOfAllItemsG[itemIndex];  
  var itemId = itemObject._id;
  
  location.href = '/transactions/requesterchoice/' + itemId;
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

  arrayOfAllItemsG.map(function(item){
    var $rowContainer = $('<tr>').addClass('row row-container');
    $rowContainer.data('itemId', item._id);

    var $nameColumn = $('<td>').addClass('name-col col-md-4 col-xs-4').text(item.itemName);
    $rowContainer.append($nameColumn);
    var $descriptionColumn = $('<td>').addClass('description-col col-md-4 col-xs-4').text(item.description);
    $rowContainer.append($descriptionColumn);
    var $tradeRequestButtonColumn = $('<button>').addClass('tradeRequestButton description-col col-md-4 col-xs-4').text('Trade Request');
    $rowContainer.append($tradeRequestButtonColumn);

    arrayOfRowContainersObjectsG.push($rowContainer);
  });

  $('#list').append(arrayOfRowContainersObjectsG);
}