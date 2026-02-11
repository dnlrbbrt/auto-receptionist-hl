document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('optinForm');
    const successMessage = document.getElementById('formSuccess');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const transactionalConsent = document.getElementById('transactionalConsent').checked;
        const marketingConsent = document.getElementById('marketingConsent').checked;
        
        // Validate required fields
        if (!firstName || !lastName || !phone || !email) {
            alert('Please fill out all required fields (First Name, Last Name, Phone, Email).');
            return;
        }
        
        // Check if at least one consent type is provided (optional but recommended)
        if (!transactionalConsent && !marketingConsent) {
            const proceed = confirm('You have not opted in to receive any SMS messages. Would you like to submit the form anyway?');
            if (!proceed) {
                return;
            }
        }
        
        // In production, you would send this data to your backend
        // For now, we'll just show a success message
        const consentTypes = [];
        if (transactionalConsent) consentTypes.push('transactional');
        if (marketingConsent) consentTypes.push('marketing');
        
        console.log('Form submitted:', { 
            firstName, 
            lastName, 
            phone, 
            email, 
            consentTypes,
            timestamp: new Date().toISOString()
        });
        
        // Build success message based on consent
        let successText = '✓ Thank you for submitting your information!';
        if (consentTypes.length > 0) {
            successText += ' You have opted in to receive ' + consentTypes.join(' and ') + ' messages.';
            successText += ' You will receive a confirmation message shortly.';
        }
        
        // Hide form and show success message
        form.style.display = 'none';
        successMessage.innerHTML = '<p>' + successText + '</p>';
        successMessage.style.display = 'block';
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
    
    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 10) {
            value = value.slice(0, 10);
        }
        
        if (value.length >= 6) {
            e.target.value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`;
        } else if (value.length >= 3) {
            e.target.value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            e.target.value = value;
        }
    });
});
