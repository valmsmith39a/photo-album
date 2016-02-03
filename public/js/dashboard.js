$(document).ready(init);

function init() {
  console.log('in init() of dashboard.js');
  getUserItems(); 
  $('#view-tradingpage').on('click', viewTradingPage);

  /*
  $.post('/transactions', itemObject)
  .success(function(data) {
    console.log('data:', data)
    location.href = '/';
  }).fail(function(err) {
    console.log('err:', err)
    alert('something went wrong :(')
  });
  */

  /*
  $.ajax({
    method: 'PUT',
    url: '/transactions/' + itemId,
    data: itemObject
    })
    .done(function(data, status) {
      alert('Your edits have been saved');
    });
  */

  /*
  $.ajax({
    method: "DELETE",
    url: "/transactions/" + itemId
    })
    .done(function(status){
      arrayOfItemsObjectsG.splice(indexOfItem,1);
      calculatePriceTotal();
      updateArrayOfRowContainers();
      displayRowContainers();
    });
  */
}

var arrayOfUserItemsG = [];
var arrayOfRowContainersObjectsG = [];

function viewTradingPage(){
  console.log('in view trading page');

  location.href = '/transactions/tradingpage';




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
    var $nameColumn = $('<td>').addClass('name-col col-md-6 col-xs-6').text(item.itemName);
    $rowContainer.append($nameColumn);
    var $descriptionColumn = $('<td>').addClass('description-col col-md-6 col-xs-6').text(item.description);
    $rowContainer.append($descriptionColumn);

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

      //arrayOfItemsObjectsG = data.slice();
      // Keep a copy of original array for sorting
      //originalArrayOfItemsObjectsG = data.slice();
      //calculatePriceTotal();
      //updateArrayOfRowContainers();
      //displayRowContainers();
   });

  // AJAX GET to items rou
  // Send 

}