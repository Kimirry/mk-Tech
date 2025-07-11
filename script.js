// === Render services from local JSON file ===
fetch('services.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('services');
    data.services.forEach(service => {
      const div = document.createElement('div');
      div.classList.add('service-card');
      div.innerHTML = `
        <img src="${service.image}" alt="${service.title}" class="service-img">
        <h3>${service.title}</h3>
        <p>${service.description}</p>
      `;
      container.appendChild(div);
    });
  })
  .catch(error => console.error('Failed to load services:', error));

const hamburger = document.getElementById('hamburger');
const navmenu = document.getElementById('menu-in'); // Make sure you're toggling the correct menu

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('fa-bars');
  hamburger.classList.toggle('fa-xmark');
  
  navmenu.classList.toggle('active'); // Toggle the class

  if (navmenu.classList.contains('active')) {
    navmenu.style.display = 'flex';
    navmenu.style.flexDirection = 'column';
    navmenu.style.gap = '1rem';
    navmenu.style.marginTop = '1rem';
  } else {
    navmenu.style.display = 'none';
  }
});


// === Phone dial code setup ===
const countrySelect = document.getElementById('country-select');
const phoneInput = document.getElementById('phone');

fetch('countries.json')
  .then(res => res.json())
  .then(countries => {
    countries.forEach(country => {
      const option = document.createElement('option');
      option.value = country.dial_code;
      option.textContent = `${country.name} (${country.dial_code})`;
      countrySelect.appendChild(option);
    });
  })
  .catch(err => {
    console.error("Failed to load countries:", err);
    countrySelect.innerHTML = '<option value="">Failed to load countries</option>';
  });

// === Update phone input on country selection ===
countrySelect.addEventListener('change', () => {
  const code = countrySelect.value;

  if (phoneInput.value.startsWith('+')) {
    phoneInput.value = code + phoneInput.value.replace(/^\+\d+/, '');
  } else {
    phoneInput.value = code;
  }

  phoneInput.focus();
});


// === Contact Form ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // stop page from reloading

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        status.textContent = "Success! Thanks for your message.";
        status.style.color = "green";
        form.reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          status.textContent = data.errors.map(error => error.message).join(", ");
        } else {
          status.textContent = "An error occurred while submitting the form.";
        }
        status.style.color = "red";
      }
    } catch (error) {
      status.textContent = "Network error. Please try again later.";
      status.style.color = "red";
    }
  });
});
