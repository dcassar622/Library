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
    
    let bookHTML = ""; 

    for (let book of myLibrary) {

        let a, b; 
        if (book.read == "Read"){           // gets correct value for read status
            a = `${selected = "selected"}`; // and has that value selected when input into table
        } else {
            b = `${selected = "selected"}`; 
        } 

        bookHTML += `<tr><td>${book.title}</td>
                         <td>${book.author}</td>
                         <td>${book.pages}</td>
                         <td class = "status">
                            <select>
                                <option ${a}>Read</option>
                                <option ${b}>Not Read</option>
                            </select>
                         </td>
                         <td class = "removeOuter"><div class = "removeButton">Remove</div></td>
                     </tr>
                    `;
    }

    document.querySelector("tbody").innerHTML = bookHTML; 
    createRemoveListeners(); 
    createSelectListeners(); 
}

function createRemoveListeners() {
    document.querySelectorAll(".removeButton").forEach((button) => {
        button.addEventListener("click", () => {
            removeBook(button.parentElement.parentElement); // passes same row as remove button
        })
    })
}

function removeBook(selectedRow) {
    const bookTitle = selectedRow.children[0].innerHTML; // gets title of book on row
    table.deleteRow(selectedRow.rowIndex);               // removes row from table

    for (i = 0; i < myLibrary.length; i++) {             // finds book title in myLibrary
        if (myLibrary[i].title == bookTitle) {           // and splices out book
            myLibrary.splice(i, 1); 
        }
    }
}

function createSelectListeners() {
    document.querySelectorAll("select").forEach((select) => {
        select.addEventListener("change", () => {
            updatedReadStatus(select);
        })
    })
}

function updatedReadStatus(select) {
    //gets title of book on same row as select option was changed
    const bookTitle = select.parentElement.parentElement.children[0].innerHTML;

    for (i = 0; i < myLibrary.length; i++) {   
        if (myLibrary[i].title == bookTitle) {  // compares title against all books in myLibrary
            myLibrary[i].read = select.value;   // and changes read value of appropriate book
        }
    }
}

function showForm() {
    const inputForm = document.getElementById("inputForm"); 

    inputForm.style.display = "block";
    document.getElementById("overlay").style.display = "block";
    inputForm.style.left = ((window.innerWidth / 2) - 
                            (inputForm.offsetWidth / 2)) + "px"; // centers input form on window
}

// hides form after cancel/add book and resets values to empty
function hideForm() {
    document.getElementById("inputForm").style.display = "none";
    document.getElementById("overlay").style.display = "none";

    document.getElementById("titleText").value = ""; 
    document.getElementById("authorText").value = ""; 
    document.getElementById("pagesText").value = ""; 
    document.getElementById("selectMenu").value = "Read"; 

    document.getElementById("titleText").style.border = "solid 1px black"; 
    document.getElementById("authorText").style.border = "solid 1px black"; 
    document.getElementById("pagesText").style.border = "solid 1px black"; 
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