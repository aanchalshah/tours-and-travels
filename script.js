const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const surnameInput = document.getElementById('surname');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const dateInput = document.getElementById('date');
const nameError = document.getElementById('nameError');
const surnameError = document.getElementById('surname');
document.addEventListener('DOMContentLoaded', () => {

    const readMoreButton = document.querySelector('.read-more-button');

    readMoreButton.addEventListener('click', () => {
        window.location.href = 'aboutus.html';
    });
});


