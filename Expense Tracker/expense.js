// ===== DETERMINE WHICH PAGE WE'RE ON =====
const isLoginPage = document.getElementById('register-section') !== null;
const isTrackerPage = document.getElementById('balance-section') !== null;

// ===== IF ON LOGIN PAGE =====
if (isLoginPage) {
    const registerSection = document.getElementById('register-section');
    const loginSection = document.getElementById('login-section');
    const registerBtn = document.getElementById('register-btn');
    const loginBtn = document.getElementById('login-btn');
    const goLoginLink = document.getElementById('go-login');
    const goRegisterLink = document.getElementById('go-register');
    const authError = document.getElementById('auth-error');

    // Toggle between forms
    goLoginLink.addEventListener('click', function() {
        registerSection.style.display = 'none';
        loginSection.style.display = 'flex';
        authError.textContent = '';
    });

    goRegisterLink.addEventListener('click', function() {
        loginSection.style.display = 'none';
        registerSection.style.display = 'flex';
        authError.textContent = '';
    });

    // REGISTER
    registerBtn.addEventListener('click', function() {
        const regUsername = document.getElementById('reg-username').value.trim();
        const regPassword = document.getElementById('reg-password').value;
        const regConfirm = document.getElementById('reg-confirm').value;

        if (!regUsername || !regPassword || !regConfirm) {
            authError.textContent = '❌ All fields are required!';
            return;
        }

        if (regPassword !== regConfirm) {
            authError.textContent = '❌ Passwords do not match!';
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];
        
        if (users.find(u => u.username === regUsername)) {
            authError.textContent = '❌ Username already exists!';
            return;
        }

        users.push({ username: regUsername, password: regPassword });
        localStorage.setItem('users', JSON.stringify(users));
        
        authError.textContent = '✅ Registration successful! Logging in...';
        document.getElementById('reg-username').value = '';
        document.getElementById('reg-password').value = '';
        document.getElementById('reg-confirm').value = '';
    });

    // LOGIN
    loginBtn.addEventListener('click', function() {
        const loginUsername = document.getElementById('login-username').value.trim();
        const loginPassword = document.getElementById('login-password').value;

        if (!loginUsername || !loginPassword) {
            authError.textContent = '❌ Please fill all fields!';
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];
        let user = users.find(u => u.username === loginUsername && u.password === loginPassword);

        if (!user) {
            authError.textContent = '❌ Invalid username or password!';
            return;
        }


        localStorage.setItem('currentUser', loginUsername);
        window.location.href = 'tracker.html';
    });
}

// ===== IF ON TRACKER PAGE =====
if (isTrackerPage) {
    const currentUser = localStorage.getItem('currentUser');
    
    // Check if logged in
    if (!currentUser) {
        window.location.href = 'login.html';
    } else {
        // Display username
        
        document.getElementById('welcome-msg').innerHTML = `Welcome, <strong> ${currentUser} </strong> `;

        // Get elements
        const expenseNameInput = document.getElementById('expense-name');
        const expenseAmountInput = document.getElementById('expense-amount');
        const addBtn = document.getElementById('add-btn');
        const expenseList = document.getElementById('expense-list');
        const balanceAmount = document.getElementById('balance-amount');
        const logoutBtn = document.getElementById('logout-btn');

        // Load and display expenses
        function loadExpenses() {
            const expenses = JSON.parse(localStorage.getItem(`expenses_${currentUser}`)) || [];
            expenseList.innerHTML = '';
            let total = 0;

            expenses.forEach((expense, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <div>
                        <strong>${expense.name}</strong> - <span>₹${expense.amount}</span>
                    </div>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                `;
                expenseList.appendChild(li);
                total += parseFloat(expense.amount);
            });

            balanceAmount.textContent = `₹${total.toFixed(2)}`;

            // Add delete listeners
            document.querySelectorAll('.delete-btn').forEach(btn => {
                btn.addEventListener('click', function() {
                    const index = this.getAttribute('data-index');
                    deleteExpense(index);
                });
            });
        }

        // Add expense
        addBtn.addEventListener('click', function() {
            const name = expenseNameInput.value.trim();
            const amount = expenseAmountInput.value.trim();

            if (!name || !amount) {
                alert('❌ Please fill all fields!');
                return;
            }

            if (isNaN(amount) || amount <= 0) {
                alert('❌ Please enter a valid amount!');
                return;
            }

            let expenses = JSON.parse(localStorage.getItem(`expenses_${currentUser}`)) || [];
            expenses.push({
                name: name,
                amount: amount,
                date: new Date().toLocaleDateString()
            });

            localStorage.setItem(`expenses_${currentUser}`, JSON.stringify(expenses));
            expenseNameInput.value = '';
            expenseAmountInput.value = '';
            loadExpenses();
        });

        // Delete expense
        function deleteExpense(index) {
            let expenses = JSON.parse(localStorage.getItem(`expenses_${currentUser}`)) || [];
            expenses.splice(index, 1);
            localStorage.setItem(`expenses_${currentUser}`, JSON.stringify(expenses));
            loadExpenses();
        }

        // Logout
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        });

        // Initial load
        loadExpenses();
    }
}