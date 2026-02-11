document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('optinForm');
    const successMessage = document.getElementById('formSuccess');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;
        const ageConfirm = document.getElementById('ageConfirm').checked;
        const consent = document.getElementById('consent').checked;
        
        // Validate required fields
        if (!name || !phone || !email) {
            alert('Please fill out all required fields (Name, Phone, Email).');
            return;
        }
        
        // Check age confirmation
        if (!ageConfirm) {
            alert('You must confirm that you are 18 years of age or older to subscribe.');
            return;
        }
        
        // Check consent
        if (!consent) {
            alert('You must provide consent to receive SMS messages by checking the consent box.');
            return;
        }
        
        // In production, you would send this data to your backend
        // For now, we'll just show a success message
        console.log('Form submitted:', { name, phone, email, ageConfirm, consent });
        
        // Hide form and show success message
        form.style.display = 'none';
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
