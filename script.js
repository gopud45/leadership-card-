document.addEventListener('DOMContentLoaded', function() {
    // JavaScript for custom arrows (only for desktop/tablet grid view)
    const prevArrow = document.querySelector('.custom-navigation-arrows .prev-arrow');
    const nextArrow = document.querySelector('.custom-navigation-arrows .next-arrow');
    // Target the specific row that contains the cards for desktop,
    // and make it horizontally scrollable with flex-nowrap.
    const desktopGridContainer = document.getElementById('desktopGridContainer');

    if (prevArrow && nextArrow && desktopGridContainer) {
        // Initialize scrollPosition to current scroll if page loads scrolled
        let scrollPosition = desktopGridContainer.scrollLeft;

        // Function to get the scroll amount (width of one column + its margin/gap)
        const getCardScrollAmount = () => {
            // Find the first visible 'col' element within the grid container
            const firstCardCol = desktopGridContainer.querySelector('.col');
            if (firstCardCol) {
                const cardWidth = firstCardCol.offsetWidth;
                // Get the actual grid gap, Bootstrap's g-4 is variable but typically uses rem for gap
                const computedStyle = window.getComputedStyle(desktopGridContainer);
                // Bootstrap uses `gap` CSS property for `g-` classes
                const gap = parseFloat(computedStyle.columnGap || computedStyle.getPropertyValue('column-gap')) || 0;
                return cardWidth + gap;
            }
            return 0;
        };

        // Function to update custom arrow visibility based on scroll position
        const updateArrowVisibility = () => {
            const maxScrollableWidth = desktopGridContainer.scrollWidth - desktopGridContainer.clientWidth;

            // If content fits without scrolling, hide arrows
            if (maxScrollableWidth <= 1) { // Small threshold for floating point math
                prevArrow.style.display = 'none';
                nextArrow.style.display = 'none';
            } else {
                prevArrow.style.display = 'block';
                nextArrow.style.display = 'block';

                // Hide prev arrow if at the start
                if (desktopGridContainer.scrollLeft === 0) {
                    prevArrow.style.display = 'none';
                }
                // Hide next arrow if at the end (allowing for minor pixel variations)
                if (desktopGridContainer.scrollLeft >= maxScrollableWidth - 1) {
                    nextArrow.style.display = 'none';
                }
            }
        };

        // Add an event listener for scrolling on the container itself
        desktopGridContainer.addEventListener('scroll', updateArrowVisibility);
        // Call on initial load and window resize
        updateArrowVisibility();
        window.addEventListener('resize', updateArrowVisibility);

        nextArrow.addEventListener('click', () => {
            const scrollAmount = getCardScrollAmount();
            scrollPosition = desktopGridContainer.scrollLeft + scrollAmount; // Use current scrollLeft as base
            desktopGridContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        });

        prevArrow.addEventListener('click', () => {
            const scrollAmount = getCardScrollAmount();
            scrollPosition = desktopGridContainer.scrollLeft - scrollAmount; // Use current scrollLeft as base
            if (scrollPosition < 0) {
                scrollPosition = 0; // Don't scroll past the beginning
            }
            desktopGridContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        });
    }

    // Bootstrap Carousel automatically handles navigation on mobile.
    // No custom JS is needed for the carousel beyond its initialization (data-bs-ride="carousel").
});
