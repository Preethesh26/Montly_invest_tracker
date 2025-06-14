let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let budget = parseFloat(localStorage.getItem("budget")) || 0;
let isEditing = false;
let editIndex = null;

const form = document.getElementById("expense-form");

function updateDisplay() {
  const table = document.getElementById("expense-table");
  table.innerHTML = "";
  expenses.forEach((exp, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${exp.date}</td>
      <td>${exp.item}</td>
      <td>₹${exp.amount}</td>
      <td>
        <button onclick="editExpense(${index})" class="edit-btn"><i class="fas fa-pen"></i></button>
        <button onclick="deleteExpense(${index})" class="delete-btn"><i class="fas fa-trash"></i></button>
      </td>
    `;
    table.appendChild(row);
  });
  updateBudgetDisplay();
}

form.addEventListener("submit", e => {
  e.preventDefault();
  const date = document.getElementById("date").value;
  const item = document.getElementById("item").value;
  const amount = parseFloat(document.getElementById("amount").value);

  if (isEditing) {
    expenses[editIndex] = { date, item, amount };
    isEditing = false;
    editIndex = null;
  } else {
    expenses.push({ date, item, amount });
  }

  localStorage.setItem("expenses", JSON.stringify(expenses));
  form.reset();
  updateDisplay();
});

function editExpense(index) {
  const exp = expenses[index];
  document.getElementById("date").value = exp.date;
  document.getElementById("item").value = exp.item;
  document.getElementById("amount").value = exp.amount;

  isEditing = true;
  editIndex = index;
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  updateDisplay();
}

function setBudget() {
  const input = document.getElementById("budgetInput").value;
  budget = parseFloat(input) || 0;
  localStorage.setItem("budget", budget);
  updateBudgetDisplay();
}

function updateBudgetDisplay() {
  const totalSpent = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount), 0);
  const remaining = budget - totalSpent;
  document.getElementById("budgetDisplay").innerText = `Budget: ₹${budget} | Remaining: ₹${remaining}`;
}

updateDisplay();
