document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll('.slider_item');
    const points = document.querySelectorAll('.point');
    const slider = document.querySelector('.slider');
    let currentIndex = 0;
    let isTransitioning = false;

    function updateActiveLink(index) {
        points.forEach((point, i) => {
            const link = point.querySelector('.slide_button');
            if (i === index) {
                link.style.display = 'block';
            } else {
                link.style.display = 'none';
            }
        });
    }

    function changeSlide(index) {
        slider.style.transition = 'transform 0s ease-in-out';
        slider.style.transform = `translateX(-${index * 1920}px)`; 

        points.forEach((point, i) => {
            point.classList.remove('p_active');
            if (i === index) {
                point.classList.add('p_active');
            }
        });

        updateActiveLink(index);

        setTimeout(() => {
            slider.style.transition = 'transform 1s ease-in-out';
        }, 50);
    }

    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;

        currentIndex = (currentIndex + 1) % slides.length;
        changeSlide(currentIndex);

        setTimeout(() => {
            isTransitioning = false;
        }, 1000);
    }

    let slideInterval = setInterval(nextSlide, 5000);

    points.forEach((point, index) => {
        point.addEventListener('click', function () {
            if (isTransitioning) return;
            currentIndex = index;
            changeSlide(currentIndex);
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        });
    });

    updateActiveLink(currentIndex);
});