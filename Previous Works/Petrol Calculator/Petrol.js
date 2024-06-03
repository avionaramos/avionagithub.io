document.addEventListener('DOMContentLoaded', function() {
    // Get references to the input fields, button, and display area
    const costPerLiterInput = document.getElementById('petrol-cost-per-liter');
    const litersPurchasedInput = document.getElementById('petrol-liters-consumed');
    const calculateBtn = document.getElementById('calculate-btn');
    const totalCostDisplay = document.getElementById('total-cost-petrol');

    calculateBtn.addEventListener('click', function() {
        // Retrieve the values entered by the user and convert them to floating-point numbers
        const costPerLiter = parseFloat(costPerLiterInput.value);
        const litersPurchased = parseFloat(litersPurchasedInput.value);

        // Calculate the total cost of petrol
        const totalCost = costPerLiter * litersPurchased;

       // Display the total cost with two decimal places
        totalCostDisplay.textContent = `Total cost: ${totalCost.toFixed(2)}`;
    });
});