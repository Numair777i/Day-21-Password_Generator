const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";
const password = document.querySelector(".in");

function generate(){
  let pw = "";
  for(let i=0; i<8; i++){
    let randomindex = Math.floor(Math.random
      ()*chars.length);
    pw += chars[randomindex];
  }
  password.value = pw;

}


let items = [];
const itemsDiv = document.querySelector("#saved");
const saveBtn = document.querySelector(".btn2");
const storageKey = "items";

function renderItems(){
  itemsDiv.innerHTML = "";

  items.forEach((item, idx) => {
    const container = document.createElement("div");
    container.classList.add("item-row");

     const text = document.createElement("p");
    text.style.display = "inline";
    text.textContent = "🔑 " + item;

    const button = document.createElement("button");
    button.classList.add("delete-btn"); 
    button.innerHTML = "<box-icon name='x' color = '#c9184a'></box-icon>";
    button.onclick = () => removeItems(idx)

     container.appendChild(text);
    container.appendChild(button);

    itemsDiv.appendChild(container);
  });

}

function loadItems() {
  const oldItems = localStorage.getItem(storageKey);
  if(oldItems) {
    items = JSON.parse(oldItems);
  }
     else {
      items = ["You", "Can", "Save", "Passwords", "Here"];
    saveItems();
  }
  renderItems();
}

function saveItems() {
  const stringItems = JSON.stringify(items);
  localStorage.setItem(storageKey, stringItems);
}

function addItems() {
  const value = password.value;
  if(!value){
    showAlert("Generate or enter a password first!");
    return;
  }
  items.push(value);
  renderItems();
  password.value = "";
  saveItems()
  generate();
}

function removeItems(idx) {
  items.splice(idx,1);
  renderItems();
  saveItems();
}

document.addEventListener("DOMContentLoaded", () => {
  loadItems();
generate();});
saveBtn.addEventListener("click", addItems);


function showAlert(msg) {
  document.getElementById("alertMsg").textContent = "⚠️ " + msg;
  document.getElementById("overlay").style.display = "flex";
}

function closeAlert() {
  document.getElementById("overlay").style.display = "none";
}

document.getElementById("okBtn").addEventListener("click", closeAlert);

