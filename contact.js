const formDOMS = {
    form: document.getElementById('contactForm'),
    firstname: document.getElementById('firstname'),
    lastname: document.getElementById('lastname'),
    subject: document.getElementById('subject'),
    email: document.getElementById('email'),
    details: document.getElementById('details'),
    btnContainer: document.getElementsByClassName('submit')[0],
    submitButton: document.getElementsByClassName('submit-button')[0],
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
}

formDOMS.form.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    // Get form values
    const firstname = formDOMS.firstname.value;
    const lastname = formDOMS.lastname.value;
    const subject = formDOMS.subject.value;
    const email = formDOMS.email.value;
    const details = formDOMS.details.value;

    // changing the text of the button and disbale it
    formDOMS.submitButton.value = 'Sending...';
    formDOMS.submitButton.disabled = true;

    // Create new User object and make POST request to the server
    sendPostRequest(new Contact(firstname, lastname, subject, email, details))
    .then(() => {
        // On success, change button text back
        formDOMS.submitButton.value = 'Message Sent!';
        formDOMS.btnContainer.classList.add('submit-success'); // Add success class
        formDOMS.btnContainer.classList.remove('submit-error'); // Remove error class if it exists
        setTimeout(() => {
            formDOMS.submitButton.value = 'Send Message'; // Reset after a short delay
            formDOMS.submitButton.disabled = false; // Re-enable button
            formDOMS.btnContainer.classList.remove('submit-success'); // Remove success class
        }, 4000);
    })
    .catch(error => {
        console.error('Error occurred:', error);
        formDOMS.submitButton.value = 'Try Again!';
        formDOMS.btnContainer.classList.add('submit-error'); // Add error class
        setTimeout(() => {
            formDOMS.submitButton.value = 'Send Message'; // Reset after a short delay
            formDOMS.submitButton.disabled = false; // Re-enable button
            formDOMS.btnContainer.classList.remove('submit-error'); // Remove error class
        }, 4000);
    });

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
                        ...contactObj,
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
        return data; // Return data for further processing in .then()
    } catch (error) {
        console.error('Error occurred:', error);
        throw error; // Rethrow error to be caught in event listener
    }
}