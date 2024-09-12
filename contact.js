const formDOMS = {
    form: document.getElementById('contactForm'),
    firstname: document.getElementById('firstname'),
    lastname: document.getElementById('lastname'),
    subject: document.getElementById('subject'),
    email: document.getElementById('email'),
    details: document.getElementById('details'),
    submitButton: document.getElementsByClassName('submit-button'),
}

class User {
    constructor(firstname, lastname, subject, email, details) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.subject = subject;
        this.email = email;
        this.details = details;
    }
}

formDOMS.form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    // Get form values
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const subject = document.getElementById('subject').value;
    const email = document.getElementById('email').value;
    const details = document.getElementById('details').value;

    // Create new User object
    const newUser = new User(firstname, lastname, subject, email, details);

    // Log the user object (you can replace this with your desired action)
    console.log(newUser);

    // Reset form
    this.reset();
});