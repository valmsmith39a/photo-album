'use strict';
$(document).ready(init);

function init() {
  getUserItems(); 
  $('#view-tradingpage').on('click', viewTradingPage);
  $('#list').on('click', '.useItemColumn', useItem);
  $('.requestTradeBtn').on('click', tradeRequest)

}


var userItemId='';
var arrayOfUserItemsG = [];
var arrayOfRowContainersObjectsG = [];

function tradeRequest(){

  var transactionItemObject= {};
  transactionItemObject.requestee = $('.requesteeItemObject').attr('data-type');
  transactionItemObject.requesteeItem = $('.requesteeItemObject').attr('id');
  transactionItemObject.requesterItem = userItemId; 
  $.post('/transactions/createtraderequest', transactionItemObject)
  .success(function(savedTransaction) {
    location.href = '/dashboard';
    //location.href = '/';
  }).fail(function(err) {
    alert('something went wrong :(');
  });
}
function viewTradingPage(){

  location.href = '/transactions/tradingpage';

}
// var selected = false;
function useItem(){
  $(this).closest('.row').toggleClass('green')
  var itemIndex = $(this).closest('.row-container').index() - 1;
  var itemObject = arrayOfUserItemsG[itemIndex];  
  userItemId = itemObject._id;
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
    var $nameColumn = $('<td>').addClass('name-col col-md-4 col-xs-4').text(item.itemName);
    $rowContainer.append($nameColumn);
    var $descriptionColumn = $('<td>').addClass('description-col col-md-4 col-xs-4').text(item.description);
    $rowContainer.append($descriptionColumn);
    var $useItemColumn = $('<button>').addClass('useItemColumn description-col col-md-4 col-xs-4').text('Use this Item');
    $rowContainer.append($useItemColumn);


    arrayOfRowContainersObjectsG.push($rowContainer);
  });

  $('#list').append(arrayOfRowContainersObjectsG);
}


function getUserItems(){

  $.get('/items/useritems', function(data){

    arrayOfUserItemsG = data; 

    displayItems();
   });
}