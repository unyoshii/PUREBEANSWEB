document.addEventListener('DOMContentLoaded', () => {
    /** ===============================
     *  1. Element Selection and Initialization
     *  ===============================
     */

    // Select all product cards within the cards container
    const cards = document.querySelectorAll('.cards-container .card');
    
    // Select navigation buttons
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    
    // Select action buttons
    const checkoutButton = document.getElementById('checkout-button');
    const cancelAllButton = document.getElementById('cancel-all-button');
    
    // Pagination settings
    const cardsPerPage = 3; // Number of cards displayed per page
    const totalCards = cards.length; // Total number of product cards
    const totalPages = Math.ceil(totalCards / cardsPerPage); // Total number of pages
    let currentPage = 1; // Initialize to the first page
    
    // Set to store indices of selected products
    const selectedProducts = new Set();

    /** ===============================
     *  2. Pagination Functions
     *  ===============================
     */

    /**
     * Displays the product cards for the specified page.
     * Adds the 'active' class to visible cards and removes it from others.
     * @param {number} page - The current page number to display.
     */
    function showCards(page) {
        const start = (page - 1) * cardsPerPage;
        const end = start + cardsPerPage;

        cards.forEach((card, index) => {
            if (index >= start && index < end) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        updateNavigationButtons();
        updateSelectionUI();
    }

    /**
     * Updates the state (enabled/disabled) of navigation buttons.
     * Disables the Previous button on the first page and the Next button on the last page.
     */
    function updateNavigationButtons() {
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    /** ===============================
     *  3. Selection Handling Functions
     *  ===============================
     */

    /**
     * Updates the appearance of Select buttons and card styles based on selection.
     * Adds 'selected' class and changes button text for selected products.
     */
    function updateSelectionUI() {
        cards.forEach((card, index) => {
            const selectButton = card.querySelector('.buy-button');

            if (selectedProducts.has(index)) {
                selectButton.classList.add('selected');
                selectButton.textContent = 'Selected';
                card.classList.add('selected');
            } else {
                selectButton.classList.remove('selected');
                selectButton.textContent = 'Select';
                card.classList.remove('selected');
            }
        });

        toggleActionButtonsVisibility();
    }

    /**
     * Toggles the visibility of the Checkout and Cancel All buttons.
     * Shows them only if there are selected products.
     */
    function toggleActionButtonsVisibility() {
        const hasSelections = selectedProducts.size > 0;
        checkoutButton.style.display = hasSelections ? 'block' : 'none';
        cancelAllButton.style.display = hasSelections ? 'block' : 'none';
    }

    /** ===============================
     *  4. Event Listeners for Navigation
     *  ===============================
     */

    /**
     * Event listener for the Next button to navigate to the next page.
     */
    nextButton.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            showCards(currentPage);
        }
    });

    /**
     * Event listener for the Previous button to navigate to the previous page.
     */
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            showCards(currentPage);
        }
    });

    /** ===============================
     *  5. Event Listeners for Product Selection
     *  ===============================
     */

    /**
     * Adds event listeners to each Select button to handle product selection.
     */
    cards.forEach((card, index) => {
        const selectButton = card.querySelector('.buy-button');

        /**
         * Event listener for the Select button.
         * Toggles the selection state of the product.
         */
        selectButton.addEventListener('click', () => {
            if (selectedProducts.has(index)) {
                // Deselect the product
                selectedProducts.delete(index);
            } else {
                // Select the product
                selectedProducts.add(index);
            }

            // Update the Select buttons and card styles
            updateSelectionUI();
        });
    });

    /** ===============================
     *  6. Event Listeners for Action Buttons
     *  ===============================
     */

    /**
     * Event listener for the Checkout button.
     * Collects selected products, stores them in Local Storage, and redirects to the Invoice page.
     */
    checkoutButton.addEventListener('click', () => {
        if (selectedProducts.size === 0) {
            alert('No products selected.');
            return;
        }

        // Gather selected products' details
        const selectedItems = Array.from(selectedProducts).map(index => {
            const card = cards[index];
            const productName = card.querySelector('h3').textContent;
            const productPriceText = card.querySelector('.price').textContent;
            const productPrice = parseFloat(productPriceText.replace('$', ''));

            return {
                name: productName,
                price: productPrice
            };
        });

        try {
            // Store selected products in Local Storage
            localStorage.setItem('selectedProducts', JSON.stringify(selectedItems));

            // Redirect to the Invoice page
            window.location.href = 'invoice.html';
        } catch (error) {
            console.error('Error storing selected products:', error);
            alert('An error occurred while processing your selection. Please try again.');
        }
    });

    /**
     * Event listener for the Cancel All Selections button.
     * Clears all selections and updates the UI accordingly.
     */
    cancelAllButton.addEventListener('click', () => {
        const confirmation = confirm('Are you sure you want to cancel and exit all selections?');
        if (confirmation) {
            // Clear all selections
            selectedProducts.clear();

            // Update the Select buttons and card styles
            updateSelectionUI();
        }
    });

    /** ===============================
     *  7. Initial Setup
     *  ===============================
     */

    /**
     * Initializes the display by showing the first set of cards and updating button visibility.
     */
    showCards(currentPage);
    toggleActionButtonsVisibility();
});


