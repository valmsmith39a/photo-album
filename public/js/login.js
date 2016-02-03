'use strict';

var $email, $password;

$(function() {
  console.log("has this started?");
  $email = $('#email');
  $password = $('#password');
  $('form').on('submit', loginUser);
});

function loginUser(e) {
  console.log('inside login user');
  debugger;
  e.preventDefault();
  var email = $email.val();
  var password = $password.val();
  $.post('/users/login', {email: email, password: password})
  .success(function(data) {
    location.href = 'users/dashboard';
      /*
      $.get('/u')
      .done()
      */
  })
  .fail(function(err) {
    alert('Error.  Apple');
    console.log('err:', err);
  });
}
