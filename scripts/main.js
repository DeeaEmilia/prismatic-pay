'use strict';

//Note: Begin Modal window functionality

// Select modal window, overlay, close button, and open buttons from the DOM
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnOpenModal = document.querySelectorAll('.btn--show-modal');

const inputLoginUsername = document.getElementById('user-id');
const inputLoginPassword = document.getElementById('user-password');

const labelWelcome = document.querySelector('.welcome');

const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance-value');
const labelSumIn = document.querySelector('.summary-value--in');
const labelSumOut = document.querySelector('.summary-value--out');
const labelSumInterest = document.querySelector('.summary-value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnTransfer = document.querySelector('.form-btn--transfer');
const btnLoan = document.querySelector('.form-btn--loan');
const btnClose = document.querySelector('.form-btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputTransferTo = document.querySelector('.form-input--to');
const inputTransferAmount = document.querySelector('.form-input--amount');
const inputLoanAmount = document.querySelector('.form-input--loan-amount');
const inputCloseUsername = document.querySelector('.form-input--user');
const inputClosePassword = document.querySelector('.form-input--password');

//Note: Data

const account1 = {
  owner: 'Violet Summers',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  password: 'ArrayOfSunshine',
};

const account2 = {
  owner: 'Cyan Thompson',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  password: 'JSBankVault!',
};

const account3 = {
  owner: 'Amber Lynn Rayleigh',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  password: 'SassMaster2000',
};

const account4 = {
  owner: 'Indigo Martinez',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  password: 'MethodToTheMadness',
};

const accounts = [account1, account2, account3, account4];

// Function to open the modal window and display the overlay
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

// Function to close the modal window and hide the overlay
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Add click event listeners to all open buttons to open the modal window
btnOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

// Add click event listener to close button to close the modal window
btnCloseModal.addEventListener('click', closeModal);
// Add click event listener to overlay to close the modal window
overlay.addEventListener('click', closeModal);

// Add keydown event listener to document to close the modal window when 'Escape' key is pressed
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Note: change to banking view

let currentAccount;

document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount) {
    if (currentAccount.password === inputLoginPassword.value) {
      closeModal();
      // Hide marketing content and show account information
      document.getElementById('marketing-content').style.display = 'none';
      document.getElementById('account-info').style.display = 'grid';
      labelWelcome.textContent = `Welcome back, ${currentAccount.owner}`;
      displayMovements(currentAccount.movements);
        calcDisplayBalance(currentAccount.movements);
        calcDisplaySummary(currentAccount.movements);
    } else {
      // Show an error message for incorrect password
      alert('Invalid password. Please try again!');
    }
  } else {
    // Show an error message for non-existing or incorrect username
    alert(
      'Invalid username. Please check the documentation on GitHub for the correct username and password'
    );
  }
});

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
  ['RON', 'Romanian leu'],
]);

const displayMovements = function (movements) {
  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements-row">
          <div class="movements-type movements-type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements-value">${mov}</div>
        </div>
        `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (movements) {
  const balance = movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${balance}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    const names = acc.owner.toLowerCase().split(' ');
    const firstNameInitial = names[0][0];
    const lastName = names[names.length - 1];
    // const randomNumber = Math.floor(Math.random() * 1000);
    acc.username = firstNameInitial + lastName;
  });
};
createUsernames(accounts);

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${Math.abs(interest)}€`;
};


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
