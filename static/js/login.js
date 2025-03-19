document.addEventListener('DOMContentLoaded', function() {
    // Form validation
    const form = document.querySelector('.needs-validation');
    if (form) {
        form.addEventListener('submit', function(event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    }

    // Password visibility toggle
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.password-toggle-icon');
    
    if (passwordInput && toggleIcon) {
        toggleIcon.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            const icon = this.querySelector('i');
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
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

    // Remember me functionality
    const rememberCheckbox = document.getElementById('remember');
    if (rememberCheckbox) {
        const remembered = localStorage.getItem('rememberedUsername');
        if (remembered) {
            document.getElementById('username').value = remembered;
            rememberCheckbox.checked = true;
        }

        rememberCheckbox.addEventListener('change', function() {
            const username = document.getElementById('username').value;
            if (this.checked) {
                localStorage.setItem('rememberedUsername', username);
            } else {
                localStorage.removeItem('rememberedUsername');
            }
        });
    }
}); 