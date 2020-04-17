//BOOK CLASS: REPRESENTS A BOOK
class Record {
    constructor(title, author, isbn) {
        //HERE YOU WANT TO TAKE WHATEVER WAS PASSED IN AND ASSIGN THEM TO THE PROPERTIES OF THE OBJECT
        this.title = title; //<= THE TITLE THAT IS PASSED IN IS BEING ASSIGNED TO THE OBJECTS TITLE PROPERTY
        this.author = author;
        this.isbn = isbn;
    }
}




//UI CLASS: HANDLE UI TASKS
//HERE YOU ARE CREATING STATIC METHODS FOR STORAGE SO THAT YOU DO NOT HAVE TO INSTANTIATE
class UI {
    static displayRecords() {
        //HERE IS THE NEW LOCAL STORAGE METHOD
        const records = Store.getRecords();

        //NOW YOU WILL LOOP THROUGH THE RECORDS STORED IN LOCAL STORAGE ARRAY AND WILL
        //CALL METHOD ADD RECORD TO LIST PASSING IN THE RECORD AND ADDING TO THE LIST
        records.forEach((record) => UI.addRecordToList(record));

        
        //RIGHT NOW YOU ARE USING HARD CODED DATA SO THAT YOU CAN ENSURE THE APP WORKS BUT LATER
        //YOU WILL SUBSTITUTE THIS CODE BELOW WITH SOMETHING ELSE
        /*const StoredRecords = [
            {
                title: 'Houses of the Holy',
                author: 'Led Zeppelin',
                isbn: '497728'
            },
            {
                title: 'Dark Side of the Moon',
                author: 'Pink Floyd',
                isbn: '897720'
            }
        ];
        
       const records = StoredRecords;

       /*NOW YOU WANT TO LOOP THROUGH THE RECORDS STORED IN THE ARRAY AND THEN CALL
       THE METHOD ADD RECORD TO LIST WHICH WILL ADD THE RECORD TO THE LIST
       records.forEach((record) => UI.addRecordToList(record));
       */
    }

    static addRecordToList(record) {

        //HERE YOU GRABBED YOUR LIST YOU CREATED IN THE HTML
        const list = document.querySelector('#book-list');

        //THIS IS A STANDARD METHOD IN JAVASCRIPT WHERE YOU CAN CREATE AN ELEMENT
        //AFTER GRABBING LIST IN HTML NOW YOU CREATE A ROW THAT HAS HTML YOU CREATE
        const row = document.createElement('tr');

        //NOW YOU WANT TO ADD THE HTML THAT WIL BE IN THE TR WHICH IS COLUMNS
        row.innerHTML = `
            <td>${record.title}</td>
            <td>${record.author}</td>
            <td>${record.isbn}</td>
            <td><a href="#" class="btn btn-warning btn-sm delete">Delete Record</a></td>
        `;

        //HERE YOU WILL APPEND THE ROW TO THE LIST
        list.appendChild(row);
    }

    //HERE IS THE METHOD TO DELETE BOOKS WITH THE (X)
    static deleteRecord(el) {
        //NOW YOU IF THE ELEMENT DOT CLASS LIST CONTAINS (DELETE) IF THATS SO THEN REMOVE
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }


    //HERE YOU WANT TO SHOW AN ALERT IF THE LIST IS NOT COMPLETELY FILLED OUT
    static showAlert(message, className) {
        //HERE YOU ARE CREATING THE DIV ELEMENT
        const div = document.createElement('div');
        //NOW YOUR ASSIGNING DIV.CLASSNAME THE ALERT WITH BOOTSTRAP 
        div.className = `alert alert-${className}`;
        //NOW YOUR APPENDING THE MESSAGE TO THE DIV(ADDING THE TEXT WHICHI IS THE MESSAGE BEING PASSED IN)
        div.appendChild(document.createTextNode(message));
        //NOW YOUR GOING TO INSERT THE MESSAGE SO YOU ARE GRABBING THE CONTAINER
        //YOU ARE INSERTING THIS INTO THE HTML PAGE YOU CAN FIND IN COMMENTS
        const container = document.querySelector('.container');
        //NOW YOUR GRABBING HOLD OF THE ID BOOK-FORM
        const form = document.querySelector('#book-form');
        //NOW YOUR STATING AT THE CONTAINER YOUR INSERTING A DIV AND INSERT BEFORE THE FORM
        container.insertBefore(div, form);
        //NOW YOU MUST CALL THE FUNCTION SO YOU WILL DO THIS AT THE VALIDATE FOR ALERT

        //NOW THE ABOVE INSERTS THE ALERT HOWEVER THESE STAY ON THE PAGE SO
        //WE MUST NOW USE A FUNCTION CALLED SETTIMEOUT
        //SETTIMEOUT TAKES A FUNCTION AND ASSIGNS THIS TO WHATEVER HAS A CLASS OF ALERT REMOVE
        //YOULL REMOVE THIS AFTER 3000 SECONDS
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }



    //HERE IS THE METHOD YOU CREATED THAT GETS CALLED BELOW
    static clearFields() {
        //NOW YOU JUST TAKE HOLD OF THE FIELDS AND THEN ASSIGN THEM TO EMPTY STRINGS
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

}










//STORE CLASS: HANDLES STORAGE
class Store {
    /*THIS IS 1 OF 3 METHODS INSIDE THE STORE CLASS WHEN YOU PUT AND GET STUFF FROM LOCAL STORAGE YOU 
    MUST PARSE EVERYTHING
    GETRECORDS WILL GET THE RECORDS AND PARSE IT INTO LOCAL STORAGE*/
    static getRecords() {
        //FIRST YOU CREATE A VARIABLE CALLED RECORDS
        let records;
        //THEN YOU CHECK FOR A CURRENT RECORD ITEM *if local storage.getItem(which is a method of local storage)records === empty 
        if(localStorage.getItem('records') === null) {
            //THEN....SET IT TO AN EMPTY ARRAY
            records = [];
        //ELSE IF THERE IS SOMETHING FOUND WITHIN LOCALSTORAGE
        } else {
            //SET RECORDS TO LOCALSTORAGE.GETITEM PASSING IN RECORDS IT IS PASSED IN AS STRING SO IT MUST BE PARSED
            records = JSON.parse(localStorage.getItem('records'));

        }
        //NOW YOU MUST RETURN WHATEVER IS IN RECORDS
        return records;
    }


    static addRecord(record) {
        //FIRST YOU WANT TO GET THE RECORDS FROM THE LOCAL STORAGE
        const records = Store.getRecords();
        //THEN YOUR GOING TO PUSH ONTO THE ARRAY OF RECORDS THAT GETRECORDS HOLDS FROM ABOVE AND ADD RECORD
        records.push(record);
        //THEN YOU WANT TO SET ITEM IN LOCAL STORAGE IN RECORDS
        localStorage.setItem('records', JSON.stringify(records));
    }



    static removeRecord(isbn) {
        //FIRST GET RECORDS FROM THE LOCAL STORAGE
        const records = Store.getRecords();

        //NOW YOU WILL LOOP THROUGH THE ARRAY OF RECORDS AND FOR EACH RECORD IF THE RECORD ISBN === TO THE ISBN 
        //YOU PASSED IN THEN SPLICE THAT SHIT OUT! YOU ALSO HAVE ACCESS TO THE INDEX SO YOU PASS THAT INTO THE FOR EACH
        //AND YOU USE THAT AS THE INDEX TO SPLICE
        records.forEach((record, index) => {
            if(record.isbn === isbn) {
                records.splice(index, 1);
            }
        });

        //THEN SET THE ITEM 
        localStorage.setItem('records', JSON.stringify(records));
    }
}









//EVENT: DISPLAY BOOKS
//HERE YOU ARE ADDING AN EVENT LISTENER (THE EVENT YOUR LISTENING FOR WHEN THE PAGE LOADS IT WILL CALL THE UI.DISPLAYRECORDS)
document.addEventListener('DOMContentLoaded', UI.displayRecords);


//EVENT ADD A BOOK
document.querySelector('#book-form').addEventListener('submit', (e) => {
    //PREVENT ACTUAL SUBMIT OF FORM
    e.preventDefault();


    //GET FORM VALUES
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;


    //VALIDATE 
    //HERE YOU ARE ADDING A STANDARD JAVASCRIPT ALERT
    if(title === '' || author === '' || isbn === ''){
        //alert('Please Fill in all Fields');  <= HERE IS WHAT THE OLD ALERT WAS NOW YOU HAVE A METHOD
        UI.showAlert('Please fill in all fields', 'danger');
    } else {

        //INSTANTIATE RECORD
        const record = new Record(title, author, isbn);
        console.log(record)     //<=CHECK TO SEE IF THE RECORD COMES THOUGH
        
        //ADD RECORD TO UI
        UI.addRecordToList(record);

        //HERE AFTER LOCAL STORAGE WAS ADDED YOU PUT THIS METHOD IN WHICH WILL ADD RECORD TO LOCAL STORAGE
        Store.addRecord(record);

        //HERE WE ADD A SUCCESS MESSAGE AFTER THE FORM COMPLETES
        UI.showAlert('Record Added! Keep Listening...', 'warning');

        //CLEAR THE FIELDS AFTER THE INPUT IS ENTERED AND BUTTON CLICKED
        UI.clearFields();
    }

});


//EVENT: REMOVE A BOOK (HERE YOU ARE ADDING AN EVENT LISTENER FOR THE X TO REMOVE RECORD)
document.querySelector('#book-list').addEventListener('click', (e) => {
    //HERE YOU ARE REMOVING THE BOOK FROM THE UI **HOWEVER THIS DOES NOT REMOVE FROM THE LOCAL STORAGE YOU ADDED AT THE END
    UI.deleteRecord(e.target)

    //THIS WILL REMOVE THE RECORD FROM THE LOCAL STORAGE AS WELL
    Store.removeRecord(e.target.parentElement.previousElementSibling.texContent);

    //HERE YOU ARE ADDING A SUCCESS MESSAGE AFTER A RECORD IS DELETED
    UI.showAlert('Record Removed', 'danger')

});
