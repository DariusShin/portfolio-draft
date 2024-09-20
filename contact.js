const formDOMS = {
    form: document.getElementById('contactForm'),
    firstname: document.getElementById('firstname'),
    lastname: document.getElementById('lastname'),
    subject: document.getElementById('subject'),
    email: document.getElementById('email'),
    details: document.getElementById('details'),
    submitButton: document.getElementsByClassName('submit-button'),
}

// class for creating user contact
class Contact {
    constructor(firstname, lastname, subject, email, details) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.subject = subject;
        this.email = email;
        this.details = details;
    }

    getData() {
        return {
            'firstname': this.firstname,
            'lastname': this.lastname,
            'subject': this.subject,
            'email': this.email,
            'details': this.details,
        };
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

    // Create new User object and make POST request to the server
    sendPostRequest(new Contact(firstname, lastname, subject, email, details));

    // Reset form
    this.reset();
});

/**
 * POST request to the server
 * @param {Object} contactObj 
 */
async function sendPostRequest(contactObj) {
    try {
        // make POST request
        const response = await fetch('https://sheetdb.io/api/v1/9y73ndq68d5sm', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                data: [
                    {
                        'id': "INCREMENT",
                        ...contactObj.getData(),
                        'date time': "DATETIME"
                    }
                ]
            })
        });

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}