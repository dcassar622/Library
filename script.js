let myLibrary = [];
let table = document.querySelector("table"); 

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

// grabs info from input form boxes, error checks, and then passes to add to library
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

// checks for empty/bad values on input form 
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
                         <td class = "status">${book.read}</td>
                         <td class = "removeOuter"><div class = "removeButton">Remove</div></td>
                     </tr>
                    `;
    }

    tbody.innerHTML = bookHTML; 
    document.querySelectorAll(".removeButton").forEach((button) => {
        button.addEventListener("click", () => {
            removeBook(button.parentElement.parentElement); 
        })
    })
}

function removeBook(e) {
    const bookTitle = e.children[0].innerHTML; 
    table.deleteRow(e.rowIndex); 

    for (i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title == bookTitle) {
            myLibrary.splice(i, 1); 
        }
    }

}
function showForm() {
    const inputForm = document.getElementById("inputForm"); 

    inputForm.style.left = (window.innerWidth / 2 - 165) + "px"; // centers input form on window
    inputForm.style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

// for the cancel button or when successfully inputing a new book
function hideForm() {
    document.getElementById("inputForm").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// hides input form on page load
window.onload = () => {
    const inputForm = document.getElementById("inputForm"); 
    inputForm.style.display = "none"; 
}

addBookToLibrary(new Book("1984", "George Orwell", 328, "Read"));
addBookToLibrary(new Book("The Hobbit", "J.R.R. Tolkien", 295, "Read"));
addBookToLibrary(new Book("The Martian", "Andy Weir", 369, "Read"));
addBookToLibrary(new Book("Neuromancer", "William Gibson", 271, "Not Read"));