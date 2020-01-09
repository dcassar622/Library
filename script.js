let myLibrary = [];
let table = document.querySelector("table"); 
let tableHeaders = ["Title", "Author", "Pages", "Status", ""];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary(book){
    myLibrary.push(book); 
    render(myLibrary); 
}

function render(myLibrary) {
    let tbody = document.querySelector("tbody"); 
    let bookHTML = ""; 

    for (let book of myLibrary) {
        bookHTML += `<tr><td>${book.title}</td>
                         <td>${book.author}</td>
                         <td>${book.pages}</td>
                         <td>${book.read}</td>
                         <td></td>
                    `;
    }

    tbody.innerHTML = bookHTML; 
}

addBookToLibrary(new Book("1984", "George Orwell", 328, "Read"));
addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", 295, "Read"));
addBookToLibrary(new Book("The Martian", "Andy Weir", 369, "Read"));

render(myLibrary); 