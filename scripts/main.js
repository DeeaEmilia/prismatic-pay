// import class Account
import Account from './account.js';

//Note: Variables creation for evenListeners and other functionalities

// Selecting modal window elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnOpenModal = document.querySelectorAll('.btn--show-modal');

// Selecting input fields, labels, and buttons related to user account
const btnTransfer = document.querySelector('.form-btn--transfer');
const btnLoan = document.querySelector('.form-btn--loan');
const btnClose = document.querySelector('.form-btn--close');
const btnSort = document.querySelector('.btn--sort');

// Selecting various elements related to UI
const marketing = document.getElementById('marketing-content');
const headerTitle = document.querySelector('.header-title');
const accountInfo = document.getElementById('account-info');

const showSuggestionsButton = document.getElementById('show-suggestions');

//Note: Data

const account1 = new Account(
    'Violet Summers',
    [200, 450, -400, 3000, -650, -130, 70, 1300],
    1.2,
    'ArrayOfSunshine'
);

const account2 = new Account(
    'Cyan Thompson',
    [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    1.5,
    'JSBankVault!'
);

const account3 = new Account(
    'Amber Lynn Rayleigh',
    [200, -200, 340, -300, -20, 50, 400, -460],
    0.7,
    'SassMaster2000'
);

const account4 = new Account(
    'Indigo Martinez',
    [430, 1000, 700, 50, 90],
    1,
    'MethodToTheMadness'
);

const accounts = [account1, account2, account3, account4];

// Note: Function to open the modal window and display the overlay
const openModal = function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
};

//Note: Function to close the modal window and hide the overlay
const closeModal = function () {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
};

// Note: Function for hiding the landing page
const hideMarketing = function () {
    marketing.style.display = 'none';
    headerTitle.style.display = 'none';
    accountInfo.style.display = 'grid';
};

// Note: Function for showing the landing page
const showMarketing = function () {
    marketing.style.display = 'grid';
    headerTitle.style.display = 'grid';
    accountInfo.style.display = 'none';
};

//Note: change to banking view

let currentAccount;

const currencies = new Map([
    ['USD', 'United States dollar'],
    ['EUR', 'Euro'],
    ['GBP', 'Pound sterling'],
    ['RON', 'Romanian leu'],
]);

// Note: function for creating usernames
const createUsernames = function (accs) {
    // Loop through each account and create a username for it
    accs.forEach(function (acc) {
        // Split the owner's name into an array of words and get the first letter of the first word
        const names = acc.owner.toLowerCase().split(' ');
        const firstNameInitial = names[0][0];

        // Get the last name
        const lastName = names[names.length - 1];

        // Combine the first letter of the first name and the last name to create the username
        acc.username = firstNameInitial + lastName;
    });
};

// Note: Call the createUsernames function with the accounts array as an argument
createUsernames(accounts);

// Note: function to show the marketing content and smoothly navigate to a section
const showMarketingAndNavigate = function (event) {
    // Call the showMarketing function
    showMarketing();

    // Prevent the default navigation behavior
    event.preventDefault();

    // Scroll to the desired section smoothly
    const target = event.target.getAttribute('href');
    if (target !== '#') {
        document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
    }
};

//Note: function for displaying deposits, withdrawals and loans
const displayMovements = function (movements, sort = false) {
    // Get the container for the movements
    const containerMovements = document.querySelector('.movements');
    // Clear previous user's movements
    containerMovements.innerHTML = '';

    const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

    // Loop through each movement and create a new HTML element for it
    movs.forEach(function (mov, i) {
        // Determine whether the movement is a deposit or withdrawal
        const type = mov > 0 ? 'deposit' : 'withdrawal';

        // Create a new HTML element for the movement using template literals
        const html = `
        <div class="movements-row">
          <div class="movements-type movements-type--${type}">${
            i + 1
        } ${type}</div>
          <div class="movements-value">${mov}</div>
        </div>
        `;

        // Insert the new HTML element into the containerMovements element
        containerMovements.insertAdjacentHTML('afterbegin', html);
    });
};

// Note: function to add up all withdrawals and deposits and display them
const calcDisplayBalance = function (acc) {
    // Get the balance label
    const labelBalance = document.querySelector('.balance-value');

    // Calculate the total balance of the account by summing up all movements
    acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

    // Display the balance on the UI
    labelBalance.textContent = `${acc.balance}€`;
};

// Note: function to calculate and display the total income, total outgoing, and total interest earned by an account
const calcDisplaySummary = function (acc) {
    // Get the labels for sumIn, sumOut and sumInterest
    const labelSumIn = document.querySelector('.summary-value--in');
    const labelSumOut = document.querySelector('.summary-value--out');
    const labelSumInterest = document.querySelector('.summary-value--interest');

    // Calculate the total income (i.e. sum of all deposits)
    const incomes = acc.movements
        .filter((mov) => mov > 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumIn.textContent = `${Math.abs(incomes)}€`;

    // Calculate the total outgoing (i.e. sum of all withdrawals)
    const out = acc.movements
        .filter((mov) => mov < 0)
        .reduce((acc, mov) => acc + mov, 0);
    labelSumOut.textContent = `${Math.abs(out)}€`;

    // Calculate the total interest earned by the account (i.e. sum of interest on all deposits)
    const interest = acc.movements
        .filter((mov) => mov > 0)
        .map((deposit) => (deposit * acc.interestRate) / 100)
        .filter((int) => int >= 1)
        .reduce((acc, int) => acc + int, 0);
    labelSumInterest.textContent = `${Math.abs(interest)}€`;
};

// Note: function to update the entire UI with the current account information
const updateUI = function (acc) {
    // Display the account movements on the UI
    displayMovements(acc.movements);

    // Display the account balance on the UI
    calcDisplayBalance(acc);

    // Display the account summary (i.e. total income, total outgoing, and total interest earned) on the UI
    calcDisplaySummary(acc);
};

// Note: function to display a list of all usernames and passwords for demo purposes
function displaySuggestions() {
    const suggestions = document.getElementById('suggestions');
    // Clear the suggestions container
    suggestions.innerHTML = '';

    // Display each username and password as a paragraph
    for (let account of accounts) {
        const suggestion = document.createElement('p');
        suggestion.innerHTML = `User ID: ${account.username}<br>Password: ${account.password}`;
        suggestions.appendChild(suggestion);
    }
}

// Event listener for the login form
document.getElementById('login-form').addEventListener('submit', function (e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the user inputs
    const inputLoginUsername = document.getElementById('user-id');
    const inputLoginPassword = document.getElementById('user-password');

    const labelWelcome = document.querySelector('.welcome');

    // Find the account with the entered username
    currentAccount = accounts.find(
        (acc) => acc.username === inputLoginUsername.value
    );

    // If the account is found and the password is correct, log the user in and update the UI
    if (currentAccount) {
        if (currentAccount.password === inputLoginPassword.value) {
            // Close the modal window
            closeModal();

            // Hide the marketing content and show the account information
            hideMarketing();
            labelWelcome.textContent = `Welcome back, ${currentAccount.owner}`;

            // Update the UI with the current account information
            updateUI(currentAccount);
        } else {
            // Show an error message for incorrect password
            alert('Invalid password. Please try again!');
        }
    } else {
        // Show an error message for non-existing or incorrect username
        alert(
            'Invalid username. Please check the FAQ section for the correct username and password.'
        );
    }
});

// Event listener for transfer money button
btnTransfer.addEventListener('click', function (e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get the user input for transfer to and the amount
    const inputTransferTo = document.querySelector('.form-input--to');
    const inputTransferAmount = document.querySelector('.form-input--amount');

    // Get the amount to transfer and the receiver account
    const amount = Number(inputTransferAmount.value);
    const receiverAcc = accounts.find(
        (acc) => acc.username === inputTransferTo.value
    );

    // Reset the input fields
    inputTransferAmount.value = inputTransferTo.value = '';

    // Check if the transfer is valid and perform the transfer if it is
    if (
        amount > 0 &&
        receiverAcc &&
        currentAccount.balance >= amount &&
        receiverAcc?.username !== currentAccount.username
    ) {
        currentAccount.movements.push(-amount);
        receiverAcc.movements.push(amount);

        // Update the UI with the new account intnLoanformation
        updateUI(currentAccount);
    } else if (amount <= 0) {
        alert('The amount must be higher than 0.');
    } else if (!receiverAcc) {
        alert('Plese check documentation for valid receiver accounts.');
    } else if (currentAccount.balance < amount) {
        alert('Insuficient funds for transfer.');
    } else if (receiverAcc.username === currentAccount.username) {
        alert('You cannot transfer money to yourself.');
    } else {
        alert(
            'Something went wrong. Please consult documentation on Github for more information on how to transfer money!'
        );
    }
});

// Event listener for requesting a loan
btnLoan.addEventListener('click', function (e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get user input for loan amount request
    const inputLoanAmount = document.querySelector('.form-input--loan-amount');

    // Get the loan amount
    const amount = Number(inputLoanAmount.value);

    // Check if the loan amount is valid and perform the loan request if it is
    if (
        amount > 0 &&
        currentAccount.movements.some((mov) => mov >= amount * 0.1)
    ) {
        // Add the loan amount to the account's movements
        currentAccount.movements.push(amount);

        // Update the UI with the new account information
        updateUI(currentAccount);
    } else {
        alert(
            'The amount you are requesting is too high. Loans can go up to a max of 10 times higher than your highest deposit.'
        );
    }

    // Reset the input field
    inputLoanAmount.value = '';
});

// Event listener for closing an account
btnClose.addEventListener('click', function (e) {
    // Prevent the default form submission behavior
    e.preventDefault();

    // Get username and password
    const inputCloseUsername = document.querySelector('.form-input--user');
    const inputClosePassword = document.querySelector('.form-input--password');

    // Check if the username and password are correct and close the account if they are
    if (
        inputCloseUsername.value === currentAccount.username &&
        inputClosePassword.value === currentAccount.password
    ) {
        const index = accounts.findIndex(
            (acc) => acc.username === currentAccount.username
        );
        accounts.splice(index, 1);

        // Show the marketing content after closing the account
        showMarketing();
    } else {
        alert('Wrong username or password');
    }

    // Reset the input fields
    inputCloseUsername.value = inputClosePassword.value = '';
});

// Event listener to the logo and the nav-links
document.addEventListener('DOMContentLoaded', function () {
    const navLogo = document.querySelector('.nav-logo');
    const navLinks = document.querySelectorAll('.nav-link');
    const backLink = document.querySelector('.back');

    navLogo.addEventListener('click', showMarketingAndNavigate);
    backLink.addEventListener('click', showMarketingAndNavigate);
    navLinks.forEach((link) => {
        link.addEventListener('click', showMarketingAndNavigate);
    });
});

// Event listeners to all open buttons to open the modal window
btnOpenModal.forEach((btn) => btn.addEventListener('click', openModal));

// Event listener to close button to close the modal window
btnCloseModal.addEventListener('click', closeModal);

// Event listener to overlay to close the modal window
overlay.addEventListener('click', closeModal);

// Event listener to close the modal window when 'Escape' key is pressed
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});

// Event listener for the "Show Suggestions" button
showSuggestionsButton.addEventListener('click', displaySuggestions);

// Event listener for sort button
btnSort.addEventListener('click', function (e) {
    // define a state variable
    let sorted = false;
    e.preventDefault();
    displayMovements(currentAccount.movements, !sorted);
    sorted = !sorted;
});

//Get the mobile navbar
const navToggle = document.querySelector('.mobile-nav-toggle');
