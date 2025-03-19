document.addEventListener('DOMContentLoaded', () => {
    // === FILTER FUNCTIONALITY ===
    const filterButtons = document.querySelectorAll('.collection-filters button');
    const collectionItems = document.querySelectorAll('.collection-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and add to the clicked one
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            collectionItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // === SMOOTH SCROLL FUNCTIONALITY ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // === FAVORITES FUNCTIONALITY ===
    const favoriteButtons = document.querySelectorAll('.btn-favorite');

    favoriteButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const itemId = button.getAttribute('data-item-id');
            const itemType = button.getAttribute('data-item-type');
            const isFavorited = button.classList.contains('favorited');

            try {
                const url = isFavorited
                    ? `/favorites/remove/${itemId}/${itemType}/`
                    : `/favorites/add/${itemId}/${itemType}/`;

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': getCSRFToken(),
                    },
                });

                const data = await response.json();

                if (data.success) {
                    button.classList.toggle('favorited');
                    button.innerHTML = data.favorited 
                        ? '❤️ Remove from Favorites' 
                        : '🤍 Add to Favorites';
                }
            } catch (error) {
                console.error('Error:', error);
            }
        });
    });

    // === GET CSRF TOKEN ===
    function getCSRFToken() {
        const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]');
        return csrfToken ? csrfToken.value : '';
    }
});
