const form = document.querySelector('form');
const submitButton = document.querySelector('button[type="submit"]');
const FullName = document.getElementById("name");
const emailing = document.getElementById("email");
const mess = document.getElementById("message");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const recaptchaResponse = grecaptcha.getResponse();

  if (!recaptchaResponse) {
    Swal.fire({
      title: "NOT SENT",
      text: "Please complete the reCAPTCHA",
      icon: "error"
    });
    return;
  }

  submitButton.disabled = true;
  submitButton.textContent = 'Sending...';

  try {
    console.time('Form submission');
    console.time('Fetch request');
    const response = await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: FullName.value,
        email: emailing.value,
        message: mess.value,
        'g-recaptcha-response': recaptchaResponse
      })
    });
    console.timeEnd('Fetch request');

    console.time('Response json');
    const data = await response.json();
    console.timeEnd('Response json');
    console.timeEnd('Form submission');

    if (data.success) {
      checkInput(true); 
      form.reset();
      grecaptcha.reset(); 
    } else {
      checkInput(false); 
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    checkInput(false); 
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Submit';
  }
});

function checkInput(success) {
  if (success) {
    Swal.fire({
      title: "SENT",
      text: "YOUR EMAIL WAS SENT",
      icon: "success"
    });
  } else {
    Swal.fire({
      title: "NOT SENT",
      text: "An error occurred while sending your email",
      icon: "error"
    });
  }
}

