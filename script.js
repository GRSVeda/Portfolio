/**
 * Rajeswari Srikruthi Veda - Portfolio Script
 * This script handles Form Validation and Formspree Submission
 */

const contactForm = document.getElementById('contactForm');
const feedbackDiv = document.getElementById('formFeedback');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = contactForm.querySelector('input[name="name"]').value.trim();
  const email = contactForm.querySelector('input[name="email"]').value.trim();
  const message = contactForm.querySelector('textarea[name="message"]').value.trim();
  if (!name || !email || !message) {
    feedbackDiv.innerHTML = '<span style="color:#fca5a5;">❌ Please fill in all fields before sending.</span>';
    setTimeout(() => { feedbackDiv.innerHTML = ''; }, 3000);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    feedbackDiv.innerHTML = '<span style="color:#fca5a5;">📧 Provide a valid email address.</span>';
    setTimeout(() => { feedbackDiv.innerHTML = ''; }, 3000);
    return;
  }
  feedbackDiv.innerHTML = '<span style="color:#60a5fa;">⏳ Sending your message...</span>';

  const formData = new FormData(contactForm);

  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      // Success Message
      feedbackDiv.innerHTML = '<span style="color:#b9f6ca; font-weight:bold;">✅ Success! Message sent to Srikruthi. ✨</span>';
      contactForm.reset();
    } else {
      // Error Message from Server
      feedbackDiv.innerHTML = '<span style="color:#fca5a5;">❌ Server error. Please try again later.</span>';
    }
  } catch (error) {
    // Network Error
    feedbackDiv.innerHTML = '<span style="color:#fca5a5;">❌ Network error. Check your connection.</span>';
  }
  setTimeout(() => {
    feedbackDiv.innerHTML = '';
  }, 5000);
});
