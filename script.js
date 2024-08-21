document.addEventListener('DOMContentLoaded', loadFromLocalStorage);

function newElement() {
    var inputValue = document.getElementById("myInput").value;
    if (inputValue === '') {
        alert("You must write something!");
        return;
    }
    
    // Check if item already exists
    var existingItems = Array.from(document.querySelectorAll('#myUL li')).map(li => li.textContent.trim());
    if (existingItems.includes(inputValue)) {
        alert("Item already exists!");
        document.getElementById("myInput").value = "";
        return;
    }
    
    var li = document.createElement("li");
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    document.getElementById("myUL").appendChild(li);
    saveToLocalStorage();
    document.getElementById("myInput").value = "";
}

function saveToLocalStorage() {
    var items = [];
    var listItems = document.querySelectorAll('#myUL li');
    listItems.forEach(function(item) {
        items.push({
            text: item.textContent,
            checked: item.classList.contains('checked')
        });
    });
    localStorage.setItem('todoList', JSON.stringify(items));
}

function loadFromLocalStorage() {
    var items = JSON.parse(localStorage.getItem('todoList'));
    if (items) {
        items.forEach(function(item) {
            var li = document.createElement("li");
            li.textContent = item.text;
            if (item.checked) {
                li.classList.add('checked');
            }
            document.getElementById("myUL").appendChild(li);
        });
    }
}

document.querySelector('ul').addEventListener('click', function(ev) {   
    if (ev.target.tagName === 'LI') {
        ev.target.classList.toggle('checked');
        saveToLocalStorage();
    }
}, false);
