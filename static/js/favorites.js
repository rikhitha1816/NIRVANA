document.querySelectorAll('.btn-favorite').forEach(button => {
    button.addEventListener('click', function() {
        const itemId = this.getAttribute('data-item-id');
        const itemType = this.getAttribute('data-item-type');
        const url = `/favorites/remove/${itemId}/${itemType}/`;

        fetch(url, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Remove the item from the DOM
                this.closest('.col-md-4').remove();
            } else {
                alert(data.message || 'Failed to remove item from favorites.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});