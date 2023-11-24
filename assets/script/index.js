'use strict';

class Contact {
    constructor(name, city, email) {
        this._name = name;
        this._city = city;
        this._email = email;
    }

    get name() {
        return this._name;
    }

    get city() {
        return this._city;
    }

    get email() {
        return this._email;
    }
}

const contactsArray = [];

function addContact() {
    const inputElement = document.getElementById('input');
    const input = inputElement.value;
    const inputValues = input.split(',').map(value => value.trim());

    if (inputValues.length !== 3 || !validateEmail(inputValues[2])) {
        inputElement.style.border = '0.5px solid red';
        return;
    }

    inputElement.style.border = '';

    const [name, city, email] = inputValues;
    const newContact = new Contact(name, city, email);

    contactsArray.unshift(newContact);

    if (contactsArray.length > 15) {
        contactsArray.pop();
    }
    listContacts();

    inputElement.value = '';
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function listContacts() {
    const contactsListDiv = document.getElementById('contactsList');

    contactsListDiv.innerHTML = '';

    contactsArray.forEach((contact, index) => {
        const contactDiv = document.createElement('div');
        contactDiv.classList.add('contact-item');

        const namePara = document.createElement('p');
        namePara.textContent = `Name: ${contact.name}`;
        contactDiv.appendChild(namePara);

        const cityPara = document.createElement('p');
        cityPara.textContent = `City: ${contact.city}`;
        contactDiv.appendChild(cityPara);

        const emailPara = document.createElement('p');
        emailPara.textContent = `Email: ${contact.email}`;
        contactDiv.appendChild(emailPara);

        contactDiv.onclick = () => deleteContact(index);

        contactsListDiv.appendChild(contactDiv);
    });
    const countPara = document.getElementById('contactCount');
    if (countPara) {
        countPara.textContent = `Number of Contacts: ${contactsArray.length}`;
    }
}
function deleteContact(index) {
    contactsArray.splice(index, 1);
    listContacts();
}