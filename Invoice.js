document.addEventListener('DOMContentLoaded', () => {
    /** ===============================
     *  1. Element Selection and Initialization
     *  ===============================
     */

    // Retrieve elements from the DOM
    const orderItemsTbody = document.getElementById('order-items');
    const subtotalSpan = document.getElementById('subtotal');
    const taxesSpan = document.getElementById('taxes');
    const discountSpan = document.getElementById('discount');
    const totalSpan = document.getElementById('total');
    const purchaseButton = document.getElementById('purchase-button');
    const cancelExitButton = document.getElementById('cancel-exit-button');
    const printButton = document.getElementById('print-button');

    // Customer Information (
    const customerName = 'Oshane Smith';
    const customerEmail = 'oshanesmith55@gmail.com';
    document.getElementById('customer-name').textContent = customerName;
    document.getElementById('customer-email').textContent = customerEmail;

    // Function to format numbers to two decimal places
    function formatNumber(num) {
        return num.toFixed(2);
    }

    /** ===============================
     *  2. Data Retrieval and Initialization
     *  ===============================
     */

    // Retrieve selected products from Local Storage
    const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

    // Initialize subtotal
    let subtotal = 0;

    /** ===============================
     *  3. Invoice Table Population
     *  ===============================
     */

    /**
     * Populates the invoice table with selected products.
     * Calculates the subtotal based on product prices and quantities.
     */
    selectedProducts.forEach(product => {
        const { name, price } = product;

        // Assuming quantity is 1 as per the main page without quantity selectors
        const quantity = 1;
        const total = price * quantity;
        subtotal += total;

        // Create table row
        const tr = document.createElement('tr');

        // Product Name
        const tdName = document.createElement('td');
        tdName.textContent = name;
        tr.appendChild(tdName);

        // Price
        const tdPrice = document.createElement('td');
        tdPrice.textContent = formatNumber(price);
        tr.appendChild(tdPrice);

        // Quantity
        const tdQuantity = document.createElement('td');
        tdQuantity.textContent = quantity;
        tr.appendChild(tdQuantity);

        // Total
        const tdTotal = document.createElement('td');
        tdTotal.textContent = formatNumber(total);
        tr.appendChild(tdTotal);

        // Append row to tbody
        orderItemsTbody.appendChild(tr);
    });

    /** ===============================
     *  4. Charge Calculations
     *  ===============================
     */

    // Calculate Charges
    const taxes = subtotal * 0.10;      // 10% Taxes
    const discount = subtotal * 0.05;   // 5% Discount
    const total = subtotal + taxes - discount;

    /** ===============================
     *  5. Update DOM with Calculated Values
     *  ===============================
     */

    /**
     * Updates the DOM elements with the calculated subtotal, taxes, discount, and total.
     */
    subtotalSpan.textContent = formatNumber(subtotal);
    taxesSpan.textContent = formatNumber(taxes);
    discountSpan.textContent = formatNumber(discount);
    totalSpan.textContent = formatNumber(total);

    /** ===============================
     *  6. Event Handler Functions
     *  ===============================
     */

    /**
     * Handles the Purchase button click event.
     * Displays a success alert, shows a detailed receipt, clears selections, and redirects to the services page.
     */
    function handlePurchase() {
        // Step 1: Alert Order Successful
        alert('Order successful!');

        // Step 2: Prepare Receipt Details
        const orderDate = new Date().toLocaleString();
        let receipt = `----- PureBeans Receipt -----\n\n`;
        receipt += `Order Date: ${orderDate}\n\n`;
        receipt += `Customer Name: ${customerName}\n`;
        receipt += `Customer Email: ${customerEmail}\n\n`;
        receipt += `Purchased Products:\n`;

        selectedProducts.forEach((product, index) => {
            receipt += `${index + 1}. ${product.name} - $${formatNumber(product.price)}\n`;
        });

        receipt += `\nSubtotal: $${formatNumber(subtotal)}\n`;
        receipt += `Taxes (10%): $${formatNumber(taxes)}\n`;
        receipt += `Discount (5%): -$${formatNumber(discount)}\n`;
        receipt += `\nTotal: $${formatNumber(total)}\n`;
        receipt += `\nThank you for your purchase!\n-----------------------------`;

        // Step 3: Display Receipt Alert
        alert(receipt);

        // Step 4: Clear selected products from Local Storage
        localStorage.removeItem('selectedProducts');

        // Step 5: Redirect to the main service page
        window.location.href = 'http://127.0.0.1:5500/services.html'; // Update the path if necessary
    }

    /**
     * Handles the Cancel & Exit button click event.
     * Alerts the user of cancellation and asks if they want to go back to the service page.
     */
    function handleCancelExit() {
        alert('Order canceled.');
        const goBack = confirm('Would you like to go back to the service page?');
        if (goBack) {
            // Redirect to the main service page
            window.location.href = 'http://127.0.0.1:5500/services.html'; // Update the path if necessary
        }
    }

    /**
     * Handles the Print Invoice button click event.
     * Opens the print dialog.
     */
    function handlePrintInvoice() {
        window.print();
    }

    /** ===============================
     *  7. Event Listeners Attachment
     *  ===============================
     */

    // Attach event listeners to buttons
    purchaseButton.addEventListener('click', handlePurchase);
    cancelExitButton.addEventListener('click', handleCancelExit);
    printButton.addEventListener('click', handlePrintInvoice);
});



