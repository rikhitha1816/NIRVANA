document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.trends-filters button');
    const trendItems = document.querySelectorAll('.trend-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Show/hide trend items based on filter
            trendItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.opacity = '1';
                    item.style.display = 'block';
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Story View functionality
    const storyButtons = document.querySelectorAll('.view-story');
    const modal = new bootstrap.Modal(document.getElementById('storyModal'));

    const stories = {
        1: {
            title: 'Summer Breeze Collection',
            description: 'Discover our latest summer collection featuring light, breathable fabrics and vibrant colors. Perfect for those warm summer days and cool evening gatherings.'
        },
        2: {
            title: 'Urban Minimalist',
            description: 'Clean lines and modern silhouettes define our urban collection. Explore contemporary fashion that seamlessly blends comfort with style.'
        },
        3: {
            title: 'Evening Elegance',
            description: 'Sophisticated evening wear that makes a statement. From subtle details to bold designs, find your perfect evening look.'
        },
        4: {
            title: 'Casual Chic',
            description: 'Elevate your everyday style with our casual collection. Comfortable, versatile pieces that transition effortlessly from day to night.'
        },
        5: {
            title: 'Accessories Edit',
            description: 'Complete your look with our carefully curated accessories collection. From subtle accents to bold statements.'
        },
        6: {
            title: 'Modern Classics',
            description: 'Timeless pieces reimagined for the modern wardrobe. Classic silhouettes with contemporary twists.'
        }
    };

    storyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const storyId = button.getAttribute('data-story');
            const storyCard = button.closest('.trend-card');
            const storyImage = storyCard.querySelector('img').src;
            const story = stories[storyId];

            // Update modal content
            document.getElementById('storyImage').src = storyImage;
            document.getElementById('storyTitle').textContent = story.title;
            document.getElementById('storyDescription').textContent = story.description;

            // Show modal
            modal.show();
        });
    });

    // Quick View Modal functionality
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const quickViewModal = new bootstrap.Modal(document.getElementById('quickViewModal'));

    quickViewButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const productImage = productCard.querySelector('img').src;
            const productTitle = productCard.querySelector('.product-title').textContent;
            const productDescription = productCard.querySelector('.product-description').textContent;

            // Update modal content
            document.getElementById('modalProductImage').src = productImage;
            document.getElementById('modalProductTitle').textContent = productTitle;
            document.getElementById('modalProductDescription').textContent = productDescription;

            // Show modal
            modal.show();
        });
    });

    // Size selection in modal
    const sizeButtons = document.querySelectorAll('.size-options .btn');
    sizeButtons.forEach(button => {
        button.addEventListener('click', () => {
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Color selection in modal
    const colorDots = document.querySelectorAll('.color-options .color-dot');
    colorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            colorDots.forEach(d => d.style.transform = 'scale(1)');
            dot.style.transform = 'scale(1.2)';
        });
    });
}); 