// Constants for valid credentials
const VALID_USERNAME = "Oshane Smith";
const VALID_PASSWORD = "123456789";

// Counter to track failed login attempts
let failedAttempts = 0;

/**
 * Handles the login process when the user clicks the login button.
 * Validates input fields, manages "Remember Me" functionality,
 * and redirects the user upon successful authentication or after three failed attempts.
 */
function handleLogin() {
    // Get the value of the username input field and remove any leading/trailing whitespace
    const usernameInput = document.getElementById('username').value.trim();

    // Get the value of the password input field and remove any leading/trailing whitespace
    const passwordInput = document.getElementById('password').value.trim();

    // Check if the "Remember Me" checkbox is checked
    const rememberMe = document.getElementById('rememberMe').checked;

    // Check if either the username or password fields are empty
    if (usernameInput === "" || passwordInput === "") {
        alert("All fields are required.");
        return; // Exit the function early since validation failed
    }

    // Check if the password is at least 8 characters long
    if (passwordInput.length < 8) {
        alert("Password must be at least 8 characters long.");
        return; // Exit the function early since validation failed
    }

    // Verify if the entered username and password match the valid credentials
    if (usernameInput === VALID_USERNAME && passwordInput === VALID_PASSWORD) {

        // If "Remember Me" is checked, store the username in Local Storage
        if (rememberMe) {
            localStorage.setItem('rememberedUsername', VALID_USERNAME);
        } else {
            // Remove any previously stored username from Local Storage
            localStorage.removeItem('rememberedUsername');
        }

        // Redirect the user to the services page upon successful login
        window.location.href = "http://127.0.0.1:5500/services.html";
    } else {
        // Increment the failed attempts counter
        failedAttempts++;

        // Alert the user if the credentials are invalid
        alert("Invalid username or password.");

        // Redirect to the error page after three failed attempts
        if (failedAttempts >= 3) {
            window.location.href = "http://127.0.0.1:5500/error.html";
        }
    }
}

/**
 * Initializes the login functionality once the DOM is fully loaded.
 * Attaches event listeners to necessary elements and pre-fills the username
 * field if a remembered username exists in Local Storage.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Select the login button from the DOM
    const loginButton = document.getElementById('loginButton');

    // Check if a username is stored in Local Storage
    const rememberedUsername = localStorage.getItem('rememberedUsername');

    if (rememberedUsername) {
        // If a username is remembered, pre-fill the username input field
        document.getElementById('username').value = rememberedUsername;

        // Optionally, check the "Remember Me" checkbox
        document.getElementById('rememberMe').checked = true;
    }

    // Attach the handleLogin function to the click event of the login button
    loginButton.addEventListener('click', handleLogin);
});


