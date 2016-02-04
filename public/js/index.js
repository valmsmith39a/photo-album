$(document).ready(init);

function init(){
  console.log('in init() of index.js');
  $('.splash').on('click', splash)
}

function splash(){
  $('.splash').remove()
}

function registration(){

// Upon successful registration, direct to login

}

function login(){
// Upon successful login, direct to dashboard
// 'a.href = '../dashboard'
}
