// Get the form element
const form = document.querySelector('form');

// Add an event listener to the form
form.addEventListener('submit', (event) => {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Generate a random CAPTCHA code
  function generateCaptchaCode() {
    return Math.random().toString(36).substring(2, 8);
  }

  // Draw the CAPTCHA code on a canvas
  function drawCaptchaCode(code) {
    const canvas = document.getElementById('captcha-canvas');
    const context = canvas.getContext('2d');

    // Set the canvas dimensions
    canvas.width = 100;
    canvas.height = 30;

    // Set the font and text color
    context.font = 'bold 20px Arial';
    context.fillStyle = 'black';

    // Draw the CAPTCHA code on the canvas
    context.fillText(code, 10, 25);
  }

  // Generate a new CAPTCHA code and draw it on the canvas
  function generateCaptcha() {
    const code = generateCaptchaCode();
    drawCaptchaCode(code);

    // Store the CAPTCHA code in a session variable
    sessionStorage.setItem('captchaCode', code);
  }

  // Verify the submitted CAPTCHA code
  function verifyCaptcha() {
    const captchaInput = document.getElementById('captcha-input');
    const captchaCode = sessionStorage.getItem('captchaCode');

    // Check if the submitted CAPTCHA code matches the stored one
    if (captchaInput.value === captchaCode) {
      // If the CAPTCHA is valid, show a success message
      alert('CAPTCHA verified successfully!');
      // Get the form data
      const name = document.querySelector('input[name="name"]').value;
      const mobileNumber = document.getElementById('mobile-number').value;
      const email = document.getElementById('email').value;
      const message = document.querySelector('textarea[name="message"]').value;
      // Do something with the form data (e.g. send it to a server)
      get_eOTP(email);
      get_mOTP(mobileNumber);
      get_creds(name, mobileNumber, email, message);
    } else {
      // If the CAPTCHA is invalid, show an error message
      alert('Invalid CAPTCHA. Please try again.');
    }
  }

  // Clear the form fields
  document.querySelector('input[name="name"]').value = '';
  document.querySelector('input[name="email"]').value = '';
  document.querySelector('textarea[name="message"]').value = '';
  document.getElementById('mobile-number').value = '';

  // Generate a new CAPTCHA code when the page loads
  window.onload = generateCaptcha();

  // Call the verifyCaptcha function when the form is submitted
  verifyCaptcha();
});

async function get_mOTP(mobileNumber) {
  // Send the OTP to the specified API
  const url = 'https://sms77io.p.rapidapi.com/sms';
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'X-RapidAPI-Key': process.env.API_KEY
      'X-RapidAPI-Host': 'sms77io.p.rapidapi.com'
    },
    body: new URLSearchParams({
      to: mobileNumber,
      p: otp,
      text: `Dear ${name}. We want to say thanks for your trust. Use code ${otp} for continue the application process.`
    })
  };
  try {
    const response = await fetch(url, options);
    const result = await response.text();
    confirm("Status: ", result);
  } catch (error) {
    alert(`Èrror: ${error}, a Customer Support Agent will be informed and will get in touch with You via e-mail soon.`);
    const url = 'http://127.0.0.1/help-desk'
    const options = {
      method: 'Post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({'email': email, 'name': name, 'error': error, 'message': message, 'mobileNumber': mobileNumber})
    };
    if (error == True) {
      try {
        const response = await fetch(url, options);
        const result = await response.json();
      } catch (error) {
        if (error == True){
        alert(`Sorry ${name}. A Ticket was created. Be ready, a Customer Support Agent will call You.`, error);
        } else {
          alert('Help-Desk informed. ', result);
        }
      };      
    }
  }
}

async function get_eOTP(email) {
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
      let url = `https://email-authentication-system.p.rapidapi.com/?recipient=${encodeURIComponent(email)}&app=Login%20System`;
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
        alert('Error: ', error);
      }
    }
  } catch (error) {
    alert('Error: ', error);
  }
}

function get_creds(name, mobileNumber, email, message) {
  let options_server = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, email, message, mobileNumber })
  };

  fetch('https://example.com/api/submit', options_server)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}
