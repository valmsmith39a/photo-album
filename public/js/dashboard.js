$(document).ready(init);
var arrayOfUserItemsG = [];
var arrayOfRowContainersObjectsG = [];

function init() {
  console.log('in init() of dashboard.js');
  getUserItems(); 
  $("#view-tradingpage").on('click', viewTradingPage);
  $("#view-transactions").on('click', viewTransactionsPage);
  $('#addBtn').on('click', addNewItem);
  $('#list').on('click', '.deleteBtn', deleteItem);
  $('#list').on('click', '.edit', editAndShowDetailsPage);
}

function editAndShowDetailsPage(){
  console.log('in show details page');
  var itemIndex = $(this).closest('.row-container').index() - 1;
  var itemObject = arrayOfUserItemsG[itemIndex];  
  var itemId = itemObject._id;

///editshowdetailspage

  location.href = '/items/editshowdetailspage/' + itemId;

/*
  $.post("/items/editshowdetailspage", itemObject)
  .done(function(data){
     //location.href = '/items/editshowdetailspage';
    //getUserItems()
  })
  .fail(function(err){
    console.log(err)
  })
  */
}

function viewTransactionsPage(){
  console.log('view transactions page');
  location.href = '/transactions/viewtransactionspage';
}

function addNewItem(){
  var name = $('#name').val();
  var description = $('#description').val();
  console.log("in addNewItem")
  $.post("/items/createitem", {itemName: name, description: description})
  .done(function(data){
    getUserItems()
      })
  .fail(function(err){
    console.log(err)
  })
}

function viewTradingPage(){
  console.log('in view trading page');
  location.href = '/transactions/tradingpage';
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
  var $itemTitle = $('<td>').addClass('name-title ').text('Name');
  $titleRow.append($itemTitle);
  var $descriptionTitle = $('<td>').addClass('description-title ').text('Description');
  $titleRow.append($descriptionTitle);
  var $extraSecret = $('<td>').addClass('shhhhh')
  $titleRow.append($extraSecret);
  var $extraSecret2 = $('<td>').addClass('shhhhh')
  $titleRow.append($extraSecret2);


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
