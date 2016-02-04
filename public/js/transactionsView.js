'use strict';
$(document).ready(init);
//var arrayOfUserItemsG = [];

var arrayOfAcceptDeclineItemsG = [];

var arrayOfRequestItemsG = [];

var arrayOfRowContainersObjectsG = [];

function init() {
  console.log('in init() of dashboard.js');
  


  $('#acceptDeclinelist').on('click', '.acceptBTNN', acceptRequest);

  $('#acceptDeclinelist').on('click', '.decline-btn', declineRequest);

  getRequestedItems(); 
  getAcceptDeclineItems(); 
}

function acceptRequest(e){
  e.preventDefault();
  console.log('inside accept Request');

  var itemIndex = $(e.target).closest('.row-container').index() - 1;
  var itemObject = arrayOfAcceptDeclineItemsG[itemIndex];  
 
  var transactionId = itemObject._id
  var requesterItemId = itemObject.requesterItem._id;
  var requesteeItemId = itemObject.requesteeItem._id; 
  var requesterUserId = itemObject.requester._id; 
  var requesteeUserId = itemObject.requestee._id; 

  

  console.log('ARRAY OF ACCEPT DECLINE ITEMS', {requesterItemId: requesterItemId});

  $.ajax({
    method: 'PUT',
    url: '/transactions/accept',
    data: {requesterItemId: requesterItemId, transactionId: transactionId, requesteeItemId: requesteeItemId, requesterUserId: requesterUserId, requesteeUserId: requesteeUserId}
    })
    .done(function(data, status) {
      alert('Your edits have been saved');
    });

  


}

function declineRequest(e){
  e.preventDefault();
  console.log('inside decline Request');

  var itemIndex = $(e.target).closest('.row-container').index() - 1;
  var itemObject = arrayOfAcceptDeclineItemsG[itemIndex];  


  var transactionId = itemObject._id
  var requesterItemId = itemObject.requesterItem._id;
  var requesteeItemId = itemObject.requesteeItem._id; 
  var requesterUserId = itemObject.requester._id; 
  var requesteeUserId = itemObject.requestee._id; 



  
  


  $.ajax({
    method: 'PUT',
    url: '/transactions/decline',
    data: {requesterItemId: requesterItemId, transactionId: transactionId, requesteeItemId: requesteeItemId, requesterUserId: requesterUserId, requesteeUserId: requesteeUserId}
    })
    .done(function(data, status) {
      alert('Your edits have been saved');
    });
    

  


}

function getRequestedItems(){
  console.log('get requested items');

  $.get('/transactions/requesteditems')
  .success(function(data){

    arrayOfRequestItemsG = data; 
    console.log('data is: ', data);
    console.log('requester item is: ', data[0].requesterItem.itemName);
    console.log('requestee item is: ', data[0].requesteeItem.itemName);
    console.log('requester is : ', data[0].requester.name);
    console.log('requestee is : ', data[0].requestee.name);

    displayRequestItems()

   })
  .fail(function(err){
    console.log('error: ', err);
   });

}

function getAcceptDeclineItems(){
  console.log('get accepted/decline items');
  $.get('/transactions/itemsacceptdecline')
  .success(function(data){

    arrayOfAcceptDeclineItemsG = data; 



    // debugger;
    console.log('array of accept decline items', arrayOfAcceptDeclineItemsG);

    displayAcceptDeclineItems();

    console.log('data is: ', data);
    console.log('requester item is: ', data[0].requesterItem.itemName);
    console.log('requestee item is: ', data[0].requesteeItem.itemName);
    console.log('requester is : ', data[0].requester.name);
    console.log('requestee is : ', data[0].requestee.name);

   })
  .fail(function(err){
    console.log('error: ', err);
   });

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

function displayAcceptDeclineItems(){

  $('#acceptDeclinelist').empty();
  arrayOfRowContainersObjectsG.splice(0, arrayOfRowContainersObjectsG.length);

  var $titleRow = $('<tr>').addClass('row-container row-title');
  var $itemTitle = $('<td>').addClass('name-title col-md-3 col-xs-3').text('Item Offered to You');
  $titleRow.append($itemTitle);

  var $personTitle = $('<td>').addClass('person-title col-md-3 col-xs-3').text('Person who offered');
  $titleRow.append($personTitle);

   var $itemAcceptDeclineTitle = $('<td>').addClass('item-accept-decline-title col-md-3 col-xs-3').text('Item Requested');
  $titleRow.append($itemAcceptDeclineTitle);

  arrayOfRowContainersObjectsG.push($titleRow);

  arrayOfAcceptDeclineItemsG.map(function(item){
    var $rowContainer = $('<tr>').addClass('row row-container');

    var $nameItemAcceptDeclineColumn = $('<td>').addClass('name-item-accept-decline-col ').text(item.requesterItem.itemName);
    $rowContainer.append($nameItemAcceptDeclineColumn);

    var $nameOppositeUserColumn = $('<td>').addClass('name-opposite-user-col ').text(item.requester.name);
    $rowContainer.append($nameOppositeUserColumn);

    var $nameItemOfferingColumn = $('<td>').addClass('name-item-offering-col ').text(item.requesteeItem.itemName);
    $rowContainer.append($nameItemOfferingColumn);

    var $acceptBtn = $('<button>').addClass('acceptBTNN description-col ').text('Accept');
    $rowContainer.append($acceptBtn);

    var $declineBtn = $('<button>').addClass('decline-btn description-col ').text('Decline');
    $rowContainer.append($declineBtn);

    arrayOfRowContainersObjectsG.push($rowContainer);
  });

  $('#acceptDeclinelist').append(arrayOfRowContainersObjectsG);
}

function displayRequestItems(){

  console.log('inside display Request Items');

  $('#requestlist').empty();
  arrayOfRowContainersObjectsG.splice(0, arrayOfRowContainersObjectsG.length);

  var $titleRow = $('<tr>').addClass('row-container row-title');
  var $itemTitle = $('<td>').addClass('name-title col-md-3 col-xs-3').text('Item That you Want');
  $titleRow.append($itemTitle);

  var $personTitle = $('<td>').addClass('person-title col-md-3 col-xs-3').text('Person You Request From');
  $titleRow.append($personTitle);

   var $itemYouOfferTitle = $('<td>').addClass('item-accept-decline-title col-md-3 col-xs-3').text('Item You Offer');
  $titleRow.append($itemYouOfferTitle);

  arrayOfRowContainersObjectsG.push($titleRow);

  console.log('array of request items ', arrayOfRequestItemsG);

  arrayOfRequestItemsG.map(function(item){

    console.log('item inside array of request is: ', item);
 

    var $rowContainer = $('<tr>').addClass('row row-container');



    var $nameItemRequestedColumn = $('<td>').addClass('name-item-requested-col ').text(item.requesteeItem.itemName);
    $rowContainer.append($nameItemRequestedColumn);

    var $nameOppositeUserColumn = $('<td>').addClass('name-opposite-user-col ').text(item.requestee.name);
    $rowContainer.append($nameOppositeUserColumn);

    var $nameItemOfferingColumn = $('<td>').addClass('name-item-offering-col ').text(item.requesterItem.itemName);
    $rowContainer.append($nameItemOfferingColumn);

    

    arrayOfRowContainersObjectsG.push($rowContainer);
  });

  $('#requestlist').append(arrayOfRowContainersObjectsG);
}


function getUserItems(){
  console.log('get user items');

  $.get('/items/useritems', function(data){
    console.log('data is: ', data);

    arrayOfUserItemsG = data; 

    displayItems();

   });
}