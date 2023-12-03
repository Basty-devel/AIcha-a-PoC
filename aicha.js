// Get the form element
const form = document.querySelector('form');

// Add an event listener to the form
form.addEventListener('submit', (event) => {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Get the form data
  const name = document.querySelector('#name').value;
  const email = document.querySelector('#email').value;
  const message = document.querySelector('#message').value;

  // Do something with the form data (e.g. send it to a server)
  console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);

  // Clear the form fields
  document.querySelector('#name').value = '';
  document.querySelector('#email').value = '';
  document.querySelector('#message').value = '';
});
// Generate a random alphanumeric string for the CAPTCHA
function generateCaptcha() {
    const length = 5;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"§$%&/()=?-+.,#;:_<>*{[]}€';
    let captcha = '';
    for (let i = 0; i < length; i++) {
        captcha += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return captcha;
}
      
// Display the CAPTCHA on page load
document.getElementById('captcha').textContent = generateCaptcha();
      
// Refresh the CAPTCHA
function refreshCaptcha() {
    document.getElementById('captcha').textContent = generateCaptcha();
}
      
// Validate user input
function validateCaptcha() {
    const userInput = document.getElementById('userInput').value;
    const actualCaptcha = document.getElementById('captcha').textContent;
      
    if (userInput.toLowerCase() === actualCaptcha.toLowerCase()) {
        alert('Captcha is correct. Form submission allowed!');
        // Submit the form
        document.getElementById('captcha').submit();
    } else {
        // Handle incorrect Captcha (e.g., clear input or show an error message)
        errorMessageElement.textContent = 'Incorrect Captcha. Please try again.';      
        refreshCaptcha(); // Optional: Refresh the Captcha after an incorrect attempt
}
