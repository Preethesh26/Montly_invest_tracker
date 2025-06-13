
const form = document.getElementById("expenseForm");
const tableBody = document.getElementById("expenseTableBody");
const totalSpentEl = document.getElementById("totalSpent");
const remainingEl = document.getElementById("remaining");
const investmentEl = document.getElementById("investment");
const budget = 10000;

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let isEditing = false;
let editIndex = null;
function updateDisplay() {
  tableBody.innerHTML = "";
  let total = 0;

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
    tableBody.appendChild(row);
    total += exp.amount;
  });

  totalSpentEl.textContent = total;
  remainingEl.textContent = budget - total;
  investmentEl.textContent = ((budget - total) * 0.2).toFixed(2);
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  updateDisplay();
}
function editExpense(index) {
  const exp = expenses[index];
  document.getElementById("date").value = exp.date;
  document.getElementById("item").value = exp.item;
  document.getElementById("amount").value = exp.amount;
  
  isEditing = true;
  editIndex = index;
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

function resetAll() {
  if (confirm("Are you sure you want to delete all expenses?")) {
    localStorage.removeItem("expenses");
    expenses = [];
    updateDisplay();
  }
}

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

document.getElementById("searchInput").addEventListener("input", function () {
  const keyword = this.value.toLowerCase();
  const rows = document.querySelectorAll("#expenseTableBody tr");

  rows.forEach(row => {
    const item = row.children[1].textContent.toLowerCase();
    row.style.display = item.includes(keyword) ? "" : "none";
  });
});

updateDisplay();
