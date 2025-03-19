document.addEventListener('DOMContentLoaded', function () {
    
    // 🖼️ Profile Image Upload
    const imageUpload = document.getElementById('profile-image'); // Matches the input ID
    const imageForm = document.querySelector('form[enctype="multipart/form-data"]');
    const profileImage = document.getElementById('profile-preview'); // Matches the img ID

    if (imageUpload && imageForm && profileImage) {
        imageUpload.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const formData = new FormData(imageForm);

                fetch('/update-profile-image/', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
                    }
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        profileImage.src = URL.createObjectURL(file);
                    } else {
                        alert('Failed to upload image. Please try again.');
                    }
                })
                .catch(error => console.error('Error:', error));
            }
        });
    }

    // ✅ Form Validation
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
                alert('Please fill out all required fields correctly.');
            }
            form.classList.add('was-validated');
        });
    }

    // ✏️ Toggle Edit/Save Mode for Profile Form
    function toggleEditMode() {
        const inputs = document.querySelectorAll('input, textarea');
        const editBtn = document.getElementById('edit-btn');
        const saveBtn = document.getElementById('save-btn');

        // Toggle between read-only and editable state
        const isReadOnly = inputs[0].readOnly;

        inputs.forEach(input => {
            if (input.type !== 'file') {
                input.readOnly = !isReadOnly;
            } else {
                input.disabled = !isReadOnly;
            }
        });

        // Toggle button visibility
        if (isReadOnly) {
            editBtn.style.display = 'none';
            saveBtn.style.display = 'inline-block';
            inputs[0].focus(); // Focus on first input when enabling edit mode
        } else {
            editBtn.style.display = 'inline-block';
            saveBtn.style.display = 'none';
        }
    }

    // Attach the toggle function to the edit button
    const editBtn = document.getElementById('edit-btn');
    if (editBtn) {
        editBtn.addEventListener('click', toggleEditMode);
    }
});

function toggleEditMode() {
    const inputs = document.querySelectorAll('#profile-preview, #first_name, #last_name, #email, #bio, #phone, #address, #birth_date');
    const editBtn = document.getElementById('edit-btn');
    const saveBtn = document.getElementById('save-btn');

    inputs.forEach(input => input.removeAttribute('readonly'));
    document.getElementById('profile-image').removeAttribute('hidden');

    editBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
}

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function () {
        const output = document.getElementById('profile-preview');
        output.src = reader.result;
    };
    reader.readAsDataURL(event.target.files[0]);
}
