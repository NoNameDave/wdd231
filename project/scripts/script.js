document.addEventListener("DOMContentLoaded", function() {
    // Budget Calculator
    const budgetForm = document.getElementById("budget-form");
    if (budgetForm) {
        budgetForm.addEventListener("submit", function(e) {
            e.preventDefault();
            let income = parseFloat(document.getElementById("income").value);
            let expenses = parseFloat(document.getElementById("expenses").value);
            let balance = income - expenses;

            document.getElementById("budget-result").textContent = `Your remaining balance: R${balance.toFixed(2)}`;
            localStorage.setItem("budgetBalance", balance);
        });
    }

    // Savings Tracker
    const savingsForm = document.getElementById("savings-form");
    if (savingsForm) {
        savingsForm.addEventListener("submit", function(e) {
            e.preventDefault();
            let goal = parseFloat(document.getElementById("goal").value);
            let saved = parseFloat(document.getElementById("saved").value);
            let percent = ((saved / goal) * 100).toFixed(2);

            document.getElementById("savings-result").textContent = `You have saved ${percent}% of your goal.`;
            localStorage.setItem("savingsProgress", percent);
        });
    }
});