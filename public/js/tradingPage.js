$(document).ready(init);

function init(){
  //console.log('inside init of tradingPage.js');
  //getAllTransactions(); 
  getCurrentUserObject(); 
  $('#list').on('click', '.tradeRequestButton', tradeRequest);
}

var arrayOfAllItemsG = [];
var arrayOfRowContainersObjectsG = [];
var currentUserObject = [];

function getAllTransactions(){
  console.log('inside get all transactions in trading page.js');

  // AJAX call to get all transactions
  // items/allitems
  $.get('/items/allitems')
  .success(function(data){
    //console.log('data in trading page is: ', data);
    arrayOfAllItemsG = data; 
    displayItems();

      //arrayOfItemsObjectsG = data.slice();
      // Keep a copy of original array for sorting
      //originalArrayOfItemsObjectsG = data.slice();
      //calculatePriceTotal();
      //updateArrayOfRowContainers();
      //displayRowContainers();
   })
  .fail(function(err){
    console.log('error: ', err);
   });
}

/*
function tradeRequest(){
  console.log('in trade request');
  var itemIndex = $(this).closest('.row-container').index() - 1;
  var itemObject = arrayOfAllItemsG[itemIndex];  
  var itemId = itemObject._id;
  var requesteeId = itemObject.ownerObj;
  var transactionItemObject = {};

  transactionItemObject.requestee = requesteeId;
  transactionItemObject.requesteeItem = itemId;
  transactionItemObject.requester ='56b249f7dddb005cc769881b'; 
  transactionItemObject.requesterItem = '56b26c4e6a0dba42cc825e91'; 

  $.post('/transactions/createtraderequest', transactionItemObject)
  .success(function(savedTransaction) {
    console.log('data returned from post is: ', savedTransaction);
    //location.href = '/';
  }).fail(function(err) {
    console.log('err:', err)
    alert('something went wrong :(');
  });
}
*/

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
    //console.log('item in map function is: ', item._id);

    $rowContainer.data('itemId', item._id);

    //console.log('row container is: ', $rowContainer);

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