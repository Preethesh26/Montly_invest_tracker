let expenses = [];

function addExpense() {
  const date = document.getElementById("dateInput").value;
  const item = document.getElementById("itemInput").value;
  const amount = document.getElementById("amountInput").value;

  if (date && item && amount) {
    expenses.push({ date, item, amount: parseFloat(amount) });
    document.getElementById("itemInput").value = "";
    document.getElementById("amountInput").value = "";
    updateDisplay();
  }
}

function updateDisplay() {
  const table = document.getElementById("expenseTable");
  table.innerHTML = "";

  expenses.forEach(exp => {
    const row = `<tr>
      <td>${exp.date}</td>
      <td>${exp.item}</td>
      <td>₹${exp.amount.toFixed(2)}</td>
    </tr>`;
    table.innerHTML += row;
  });

  updateBudgetDisplay();
  generateDailySummary();
}

function updateBudgetDisplay() {
  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  document.getElementById("totalBudget").textContent = `Total Spent: ₹${total.toFixed(2)}`;
}

function toggleSummary() {
  const display = document.getElementById("toggleSummary").checked;
  document.getElementById("dailySummary").style.display = display ? "block" : "none";
}

function generateDailySummary() {
  const dailyTotals = {};

  // Group totals by date
  expenses.forEach(exp => {
    const date = exp.date;
    const amount = parseFloat(exp.amount);
    if (dailyTotals[date]) {
      dailyTotals[date] += amount;
    } else {
      dailyTotals[date] = amount;
    }
  });

  // Cumulative total by date
  const sortedDates = Object.keys(dailyTotals).sort();
  let runningTotal = 0;

  const summaryList = document.getElementById("summaryList");
  summaryList.innerHTML = "";

  sortedDates.forEach(date => {
    runningTotal += dailyTotals[date];
    const li = document.createElement("li");
    li.textContent = `📅 ${date} → ₹${runningTotal.toFixed(2)}`;
    summaryList.appendChild(li);
  });
}
