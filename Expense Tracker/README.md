# Expense Tracker

A simple and user-friendly **Expense Tracker** built using **HTML, CSS, and JavaScript**.
The application allows users to create an account, log in, add their expenses, and view their spending records.

## Features

* User Registration & Login
* Username and password stored using **Browser LocalStorage**
* Add expense amount
* Add transaction/expense name
* View all added expenses
* Simple and clean user interface
* Expense data stored locally in the browser
* No backend or database required
* Fully built with Vanilla JavaScript

## Technologies Used

* **HTML5** – Structure of the application
* **CSS3** – Styling and responsive interface
* **JavaScript** – Application logic and expense management
* **LocalStorage** – Storing user credentials and expense data in the browser

## How It Works

### 1. User Login

Users can register and log in to the application using a username and password.

The login information is stored in the browser's **LocalStorage**, allowing the application to remember the user without requiring a backend server.

### 2. Add an Expense

After logging in, users can add their expenses by entering:

* Transaction/Expense Name
* Amount Spent

For example:

```text
Transaction: Grocery Shopping
Amount: ₹1200
```

### 3. View Expenses

All added transactions are displayed in the **Expenses section** below the input area.

Users can easily see the transactions they have added along with the amount spent.

## Project Structure

```text
Expense-Tracker/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/expense-tracker.git
```

### 2. Open the Project

Navigate to the project folder:

```bash
cd expense-tracker
```

### 3. Run the Application

Since this project uses only HTML, CSS, and JavaScript, no installation or server setup is required.

Simply open:

```text
index.html
```

in your web browser.

## Data Storage

This project uses **LocalStorage** to store:

* User username
* User password
* Expense/transaction information

Because LocalStorage is used, the data remains available in the browser even after refreshing or reopening the page, unless the browser's stored data is cleared.

> **Note:** This project is intended for learning and demonstration purposes. Storing passwords directly in LocalStorage is **not secure for a real-world application**. A production application should use a backend, secure authentication, password hashing, and a proper database.

## Example

A user can add expenses such as:

| Transaction      | Amount |
| ---------------- | -----: |
| Grocery Shopping | ₹1,200 |
| Movie            |   ₹500 |
| Food             |   ₹300 |
| Travel           |   ₹800 |

The added transactions are then displayed in the expense section so the user can keep track of their spending.

## Future Improvements

Some features that can be added in the future:

* Edit and delete transactions
* Total expense calculation
* Income and balance tracking
* Expense categories
* Search and filter transactions
* Monthly expense summary
* Expense charts and graphs
* Dark mode
* Backend authentication
* Database integration
* Secure password hashing

## Learning Outcomes

Through this project, I practiced:

* DOM manipulation with JavaScript
* JavaScript event handling
* Form handling and validation
* Working with LocalStorage
* Managing and displaying dynamic data
* Creating interactive web interfaces
* Structuring a frontend project using HTML, CSS, and JavaScript

## License

This project is created for **learning and portfolio purposes**.
