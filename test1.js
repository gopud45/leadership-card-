document.addEventListener('DOMContentLoaded', function() {
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const cardsContainer = document.querySelector('.leadership-cards-container');
    const leaderCards = document.querySelectorAll('.leader-card');

    if (prevArrow && nextArrow && cardsContainer && leaderCards.length > 0) {
        let scrollPosition = 0;
        // Calculate the scroll amount: width of one card + the gap (30px from CSS)
        // Adjust '30' if you change the 'gap' in style.css
        const cardScrollAmount = leaderCards[0].offsetWidth + 30;

        // Check if there are more cards than can be displayed initially
        // This makes the arrows only appear if necessary
        const maxScrollableWidth = cardsContainer.scrollWidth - cardsContainer.clientWidth;
        if (maxScrollableWidth <= 0) {
            // Hide arrows if all cards fit without scrolling
            prevArrow.style.display = 'none';
            nextArrow.style.display = 'none';
        } else {
            // Show arrows if scrolling is needed
            prevArrow.style.display = 'block'; // Or 'inline-block' depending on styling
            nextArrow.style.display = 'block'; // Or 'inline-block'
        }


        nextArrow.addEventListener('click', () => {
            scrollPosition += cardScrollAmount;
            // Prevent scrolling too far right
            if (scrollPosition > maxScrollableWidth) {
                scrollPosition = maxScrollableWidth;
            }
            cardsContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        });

        prevArrow.addEventListener('click', () => {
            scrollPosition -= cardScrollAmount;
            // Prevent scrolling too far left
            if (scrollPosition < 0) {
                scrollPosition = 0;
            }
            cardsContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        });
    }

    // No need for click handlers on individual cards for the hover effect,
    // as that's purely CSS-driven now.
});