// Pricing Toggle for Monthly/Yearly
document.addEventListener('DOMContentLoaded', function() {
    const billingToggle = document.getElementById('billingToggle');
    
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            const monthlyPrices = document.querySelectorAll('.monthly-price');
            const yearlyPrices = document.querySelectorAll('.yearly-price');
            const monthlyBilling = document.querySelectorAll('.monthly-billing');
            const yearlyBilling = document.querySelectorAll('.yearly-billing');
            
            if (this.checked) {
                // Show yearly prices
                monthlyPrices.forEach(el => el.style.display = 'none');
                yearlyPrices.forEach(el => el.style.display = 'inline');
                monthlyBilling.forEach(el => el.style.display = 'none');
                yearlyBilling.forEach(el => el.style.display = 'inline');
            } else {
                // Show monthly prices
                monthlyPrices.forEach(el => el.style.display = 'inline');
                yearlyPrices.forEach(el => el.style.display = 'none');
                monthlyBilling.forEach(el => el.style.display = 'inline');
                yearlyBilling.forEach(el => el.style.display = 'none');
            }
        });
    }
});
