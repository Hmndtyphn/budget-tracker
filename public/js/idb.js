// variable for database connection
let db;

// connect to indexedDB database, and set to version 1
const request = indexedDB.open('budget_tracker', 1);

// event to update database version if applicable
request.onupgradeneeded = function(event) {
    // save to database
    const db = event.target.result;
    // create table and set it to auto increment db results with a primary key
    db.createObjectStore('new_transaction', { autoIncrement: true });
};

// triggers if successful 
request.onsuccess = function(event) {
    // saves reference of db to global variable above upon connection
    db = event.target.result;

    // if app is online, send new data to local db/ api
    if (navigator.onLine) {

    }
};

// triggers if error
request.onerror = function(event) { 
    // logs the error
    console.log(event.target.errorCode);
};

// function to save transaction data if currently offline
function saveRecord(record) {
    // starts a new transaction
    const transaction = db.transaction(['new_transaction'], 'readwrite');
    // new transction object store
    const budgetObjectStore = transaction.objectStore('new_transaction');
    // adds record
    budgetObjectStore.add(record);
}



