'use strict';

//Note: Begin Modal window functionality

//Note: Select modal window, overlay, close button, and open buttons from the DOM
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

//Note: Function to open the modal window and display the overlay
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

//Note: Function to close the modal window and hide the overlay
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//Note: Add click event listeners to all open buttons to open the modal window
btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

//Note: Add click event listener to close button to close the modal window
btnCloseModal.addEventListener('click', closeModal);
//Note: Add click event listener to overlay to close the modal window
overlay.addEventListener('click', closeModal);

//Note: Add keydown event listener to document to close the modal window when 'Escape' key is pressed
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  //Note: Get user inpurt
  const userID = document.getElementById('user-id').value;
  const userPassword = document.getElementById('user-password').value;

  //Note: Validate user credentials
  if (userID === 'test' && userPassword === 'test') {
    //Note: Hide marketing content and show account information
    document.getElementById('marketing-content').style.display = 'none';
    document.getElementById('account-info').style.display = 'block';
  } else {
    //Note: Show an error message or handle invalid credentials
    alert('Invalid ID or password. Please try again');
  }
});
