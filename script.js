function Book(title, author, pages, haveRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.info = function() {
        if (read == true) {
            return title + " by " + author + ", " + pages + " pages, " + "have read."; 
        } else {
            return title + " by " + author + ", " + pages + " pages, " + "have not read.";
        }
    }
}

function addBookToLibrary() {

}

function generateTableHead(table) {
    let thead = table.createTHead();
    let row = thead.insertRow(); 

    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, mountains) {
    for (let element of mountains) {
        let row = table.insertRow(); 
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]); 
            cell.appendChild(text); 
        }
    }
}

let mountains = [
    { name: "Monte Falco", height: 1658, place: "Parco Foreste Casentinesi" },
    { name: "Monte Falterona", height: 1654, place: "Parco Foreste Casentinesi" }
  ];

let table = document.querySelector("table"); 
let data = ["Title", "Author", "Pages", "Status"];
generateTableHead(table, data);
generateTable(table, mountains); 