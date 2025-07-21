
let transactions = [];

function updateValues() {
  const balanceEl = document.getElementById('balance');
  const incomeEl = document.getElementById('income');
  const expenseEl = document.getElementById('expense');

  const amounts = transactions.map(t => t.amount);
  const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
  const income = amounts.filter(a => a > 0).reduce((acc, val) => acc + val, 0).toFixed(2);
  const expense = amounts.filter(a => a < 0).reduce((acc, val) => acc + val, 0).toFixed(2);

  balanceEl.textContent = `$${total}`;
  incomeEl.textContent = `+$${income}`;
  expenseEl.textContent = `-$${Math.abs(expense)}`;
}

function addTransaction() {
  const desc = document.getElementById('desc').value.trim();
  const amount = document.getElementById('amount').value.trim();

  if (desc === '' || amount === '') {
    alert('Please enter both description and amount');
    return;
  }

  const transaction = {
    id: Date.now(),
    desc,
    amount: +amount
  };

  transactions.push(transaction);
  document.getElementById('desc').value = '';
  document.getElementById('amount').value = '';
  updateDOM();
  updateValues();
}

function removeTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateDOM();
  updateValues();
}

function updateDOM() {
  const list = document.getElementById('list');
  list.innerHTML = '';

  transactions.forEach(t => {
    const sign = t.amount < 0 ? '-' : '+';
    const item = document.createElement('div');
    item.classList.add('transaction', t.amount < 0 ? 'minus' : 'plus');
    item.innerHTML = `
      ${t.desc} <span>${sign}$${Math.abs(t.amount)}</span>
      <button onclick="removeTransaction(${t.id})">x</button>
    `;
    list.appendChild(item);
  });
}


