let myLibrary = [];
let table = document.querySelector("table"); 
let tableHeaders = ["Title", "Author", "Pages", "Status", ""];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function getBookInfo() {
    const titleText = document.getElementById("titleText").value; 
    const authorText = document.getElementById("authorText").value; 
    const pagesText = document.getElementById("pagesText").value; 
    const e = document.getElementById("selectMenu");
    const readText = e.options[e.selectedIndex].value; 

    if (!checkBoxValues(titleText, authorText, pagesText)) {
        return; 
    }

    addBookToLibrary(new Book(titleText, authorText, pagesText, readText))
}

function checkBoxValues(titleText, authorText, pagesText) {
    let checker = true; 
    if (titleText == "" || titleText == null) {
        document.getElementById("titleText").style.border = "solid 1px red"; 
        checker = false; 
    } else { 
        document.getElementById("titleText").style.border = "solid 1px black"; 
    }
    if (authorText == "" || authorText == null) {
        document.getElementById("authorText").style.border = "solid 1px red"; 
        checker = false;  
    } else { 
        document.getElementById("authorText").style.border = "solid 1px black"; 
    }
    if (pagesText == "" || pagesText == null || pagesText <= 0 || isNaN(pagesText)) {
        document.getElementById("pagesText").style.border = "solid 1px red"; 
        checker = false; 
    } else { 
        document.getElementById("pagesText").style.border = "solid 1px black"; 
    }
    return checker; 
}

function addBookToLibrary(book){
    myLibrary.push(book); 
    hideForm(); 
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

function showForm() {
    const inputForm = document.getElementById("inputForm"); 
    const mainBody = document.getElementById("mainBody"); 

    inputForm.style.left = (window.innerWidth / 2 - 165) + "px"; 
    inputForm.style.display = "block";
    mainBody.style.backgroundColor = "black"; 
}

// for the cancel button
function hideForm() {
    const inputForm = document.getElementById("inputForm"); 
    const mainBody = document.getElementById("mainBody"); 

    inputForm.style.display = "none";
    mainBody.style.backgroundColor = "white"; 
}

// hides input form on page load
window.onload = () => {
    const inputForm = document.getElementById("inputForm"); 
    inputForm.style.display = "none"; 
}

addBookToLibrary(new Book("1984", "George Orwell", 328, "Read"));
addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", 295, "Read"));
addBookToLibrary(new Book("The Martian", "Andy Weir", 369, "Read"));

render(myLibrary); 