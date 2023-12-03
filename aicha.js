// Get the form element
const form = document.querySelector('form');

// Add an event listener to the form
form.addEventListener('submit', (event) => {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Get the form data
  const name = document.querySelector('name').value;
  const email = document.getElementById('email').value;
  const message = document.querySelector('message').value;

  // Do something with the form data (e.g. send it to a server)
  sendFormData(name, email, message);

  // Clear the form fields
  document.querySelector('name').value = '';
  document.querySelector('email').value = '';
  document.querySelector('message').value = '';
});

async function sendFormData(name, email, message) {
  // Validate the email address
  const url = 'https://emailvalidator3.p.rapidapi.com/validate';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': 'emailvalidator3.p.rapidapi.com'
    },
    body: JSON.stringify({ email: email })
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (result.error) {
      alert('Please don\'t use temp or fake emails!');
    } else {
      confirm('Thank you. The provided email does meet our requirements. You can go on with the registration process.');

      // Send email to server and otp to email
      const url = 'https://email-authentication-system.p.rapidapi.com/?recipient=' + encodeURIComponent(email) + '&app=Login%20System';
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.API_KEY,
          'X-RapidAPI-Host': 'email-authentication-system.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        confirm(result);
      } catch (error) {
        alert(error);
      }
    }
  } catch (error) {
    alert(error);
  }

  console.log(`Name: ${name}, Email: ${email}, Message: ${message}`);
}

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
