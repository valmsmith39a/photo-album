'use strict';
$(document).ready(init);
//var arrayOfUserItemsG = [];

var arrayOfAcceptDeclineItemsG = [];

var arrayOfRowContainersObjectsG = [];

function init() {
  console.log('in init() of dashboard.js');
  // getUserItems(); 
  //$("#view-tradingpage").on('click', viewTradingPage)
  /*$('#addBtn').on('click', addNewItem);
  $('#list').on('click', '.deleteBtn', deleteItem)*/

  $('#acceptDeclinelist').on('click', $('.accept-btn'), acceptRequest);

  //getRequestedItems(); 
  getAcceptDeclineItems(); 
}

function acceptRequest(e){
  e.preventDefault();
  console.log('inside accept Request');

  var itemIndex = $(e.target).closest('.row-container').index() - 1;
  var itemObject = arrayOfAcceptDeclineItemsG[itemIndex];  
 
  //var itemId = itemObject._id;

  // Update transactions object 
  // status pending -> closed
  // result '' -> accpeted/declined

  console.log('ARRAY OF ACCEPT DECLINE ITEMS', arrayOfAcceptDeclineItemsG);

  $.ajax({
    method: 'PUT',
    url: '/transactions/accept',
    data: itemObject
    })
    .done(function(data, status) {
      alert('Your edits have been saved');
    });

  // Update items object
  // available false -> true 
  // if accepted
  //  swap - ownerObj values save
  // 
}

function getRequestedItems(){
  console.log('get requested items');

  $.get('/transactions/requesteditems')
  .success(function(data){
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

    var $acceptBtn = $('<button>').addClass('accept-btn description-col ').text('Accept');
    $rowContainer.append($acceptBtn);

    var $declineBtn = $('<button>').addClass('decline-btn description-col ').text('Decline');
    $rowContainer.append($declineBtn);

    arrayOfRowContainersObjectsG.push($rowContainer);
  });

  $('#acceptDeclinelist').append(arrayOfRowContainersObjectsG);
}


function getUserItems(){
  console.log('get user items');

  $.get('/items/useritems', function(data){
    console.log('data is: ', data);

    arrayOfUserItemsG = data; 

    displayItems();

   });


}