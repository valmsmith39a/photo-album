$(document).ready(init);

function init(){
  console.log('inside edit init');
  $('#saveEditsBtn').on('click', saveEdits);
}

function saveEdits(){
  console.log('inside save edits function');
  
  /*
  var name = $('#name').val();
  var description = $('#description').val(); 
  var itemId = $('.itemIdDiv').attr('id'); 
  
  var itemObj = {};

  itemObj.name = name; 
  itemObj.description = description; 
  itemObj.itemId = itemId; 

  $.ajax({
    method: 'PUT',
    url: '/items/edititem',
    data: itemObj
    })
    .done(function(data, status) {
      location.href = '/dashboard';
      alert('Your edits have been saved');
    });
  */
   
}