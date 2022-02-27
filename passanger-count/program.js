const number = document.getElementById('number');
const item = document.getElementById('item');
let count = 0;

function increment () {
    count ++;
    number.textContent = count;
}

function save () {
    item.textContent += count + " - ";
    number.textContent = 0;
    count = 0;
}