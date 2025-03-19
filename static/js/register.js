// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const form = document.querySelector('.needs-validation');
    const password1 = document.getElementById('password1');
    const password2 = document.getElementById('password2');

    // Password strength validation
    function validatePasswordStrength(password) {
        const minLength = 8;
        const hasLetter = /[a-zA-Z]/.test(password);
        const hasNumber = /\d/.test(password);
        
        return password.length >= minLength && hasLetter && hasNumber;
    }

    // Password match validation
    function validatePasswordMatch() {
        if (password1.value !== password2.value) {
            password2.setCustomValidity("Passwords don't match");
        } else {
            password2.setCustomValidity('');
        }
    }

    // Password strength check
    password1.addEventListener('input', function() {
        if (!validatePasswordStrength(this.value)) {
            this.setCustomValidity('Password must be at least 8 characters long and include both letters and numbers');
        } else {
            this.setCustomValidity('');
        }
    });

    // Password match check
    password1.addEventListener('change', validatePasswordMatch);
    password2.addEventListener('input', validatePasswordMatch);

    // Form submission handling
    if (form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    }

    // Auto-dismiss alerts
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            const closeButton = alert.querySelector('.btn-close');
            if (closeButton) {
                closeButton.click();
            }
        }, 5000);
    });

    // Terms checkbox validation
    const termsCheckbox = document.getElementById('terms');
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', function() {
            if (!this.checked) {
                this.setCustomValidity('You must accept the Terms & Conditions');
            } else {
                this.setCustomValidity('');
            }
        });
    }
}); 
