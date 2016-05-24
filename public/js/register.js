'use strict';

var $email, $password, $password2, $name;

$(function() {
  console.log('inside function of reg.js');
  hidelogout()
  $email = $('#email');
  $password = $('#password');
  $password2 = $('#password2');
  $name = $('#name');
  $('form').on('submit', registerUser);
});

function hidelogout(){
  $(".resetpassBtn, .logoutBtn").hide();
}

function registerUser(e) {
  e.preventDefault();
  var name = $name.val()
  var email = $email.val();
  var password = $password.val();
  var password2 = $password2.val();

  if(password !== password2) {
    $('.password').val('');
    return alert('Passwords must match.');
  }

  $.post('/users/register', {email: email, password: password, name: name})
  .success(function(data) {
    console.log(data);
    location.href = '/login';
  })
  .fail(function(err) {
    alert('Error.  Check console.');
    console.log('err:', err);
  });
}
