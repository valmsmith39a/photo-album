'use strict';

console.log('index.js!');

$(document).ready(init);
function init(){
  console.log('IN INIT');
  hideLoginStuff()
  $("#resetPassPage").on('click', viewPassReset)
  $("#resetBtn").on('click', resetPassword)
}

function hideLoginStuff(){
  $(".registerBtn, .loginBtn, .logoutBtn, .resetpassBtn").hide();
}

function viewPassReset(){
    $.get('/resetpass')
    .success(function(data) {
    })
    .fail(function(err) {
      alert('Error.  Check console.');
      console.log('err:', err);
    });
}

function resetPassword(e){
  console.log("IN");
  e.preventDefault;
  var email = $('#email').val();
  console.log(email);
  $.post('users/resetpass', {email: email})
  .done(function(data){
    location.href = '/'
  })
}
