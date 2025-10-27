let currentSlideIndex = 0;
let galleryImages = []; // All gallery image elements
let visibleImages = []; // Only currently visible images

document.addEventListener('DOMContentLoaded', () => {
    galleryImages = Array.from(document.querySelectorAll('.gallery img'));
    updateVisibleImages();
    addImageClickListeners();

    document.querySelector('.close-btn').addEventListener('click', closeLightbox);
    
    // Close lightbox when clicking outside the image
    document.getElementById('lightbox').addEventListener('click', (event) => {
        if (event.target.id === 'lightbox') {
            closeLightbox();
        }
    });

    // Keyboard navigation (optional enhancement)
    document.addEventListener('keydown', (e) => {
        if (document.getElementById('lightbox').style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                plusSlides(-1);
            } else if (e.key === 'ArrowRight') {
                plusSlides(1);
            } else if (e.key === 'Escape') {
                closeLightbox();
            }
        }
    });
    
        // Filter button active state
        const filterButtons = document.querySelectorAll('.filter-buttons button');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                filterButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            });
        });
});

    function updateVisibleImages() {
        visibleImages = galleryImages.filter(img => img.style.display !== 'none');
    }

    function addImageClickListeners() {
        galleryImages.forEach(img => {
            img.replaceWith(img.cloneNode(true)); // Remove old listeners
        });
        galleryImages = Array.from(document.querySelectorAll('.gallery img'));
        updateVisibleImages();
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', () => {
                // Only open if visible
                if (img.style.display !== 'none') {
                    // Find the index in visibleImages
                    const visibleIndex = visibleImages.indexOf(img);
                    openLightbox(visibleIndex);
                }
            });
        });
    }

function openLightbox(index) {
    document.getElementById('lightbox').style.display = 'flex';
    currentSlideIndex = index;
    showSlide(currentSlideIndex);
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function plusSlides(n) {
    currentSlideIndex += n;
    if (currentSlideIndex >= visibleImages.length) {
        currentSlideIndex = 0; // Loop back to start
    }
    if (currentSlideIndex < 0) {
        currentSlideIndex = visibleImages.length - 1; // Loop to end
    }
    showSlide(currentSlideIndex);
}

function showSlide(index) {
    const lightboxImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('caption');
    const selectedImage = visibleImages[index];

    lightboxImg.src = selectedImage.src;
    captionText.textContent = selectedImage.alt;
}

// --- BONUS: Image Filters/Categories (Example Implementation) ---
// You would need to add buttons or a dropdown for filtering in your HTML
// Example HTML for filter buttons:
/*
<div class="filter-buttons">
    <button onclick="filterImages('all')">All</button>
    <button onclick="filterImages('nature')">Nature</button>
    <button onclick="filterImages('city')">City</button>
    <button onclick="filterImages('art')">Art</button>
</div>
*/

function filterImages(category) {
    galleryImages.forEach(img => {
        if (category === 'all' || img.dataset.category === category) {
            img.style.display = '';
            img.style.animation = 'fadeInGrid 0.5s';
        } else {
            img.style.display = 'none';
        }
    });
    updateVisibleImages();
    addImageClickListeners();
}

// Optional CSS for filter animation if you implement it
/*
@keyframes fadeInGrid {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}
*/