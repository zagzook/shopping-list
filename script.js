const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const itemFilter = document.querySelector('#filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

function onAddItemsSubmit(e) {
  e.preventDefault();
  //The is make the first letter of each string uppercase
  //itemInput.value.charAt(0).toUpperCase() + itemInput.value.slice(1).toLowerCase();
  const newItem = itemInput.value.charAt(0).toUpperCase() + itemInput.value.slice(1).toLowerCase();

  //Validate Input
  if (itemInput.value === '') {
    alert('please add an item');
    return;
  }

  //check if it is in edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = true;
  } else {
    if (checkIfItemExists(newItem)) {
      alert(`Item ${newItem} already exists`);
      checkUI();
      return;
    }
  }

  //create item to DOM element
  addItemToDOM(newItem);

  //Add items to local storage
  addItemToStorage(newItem);

  checkUI();

  //clear the input field
  itemInput.value = '';
}

function addItemToDOM(item) {
  //create list item

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  // create the button
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  //add the li to the DOM
  itemList.appendChild(li);
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  console.log(itemsFromStorage);

  //Add new item to array
  itemsFromStorage.push(item);

  //convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    console.log(1);
    setItemToEdit(e.target);
  }
}

function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();

  return itemsFromStorage.includes(item);
}

function setItemToEdit(item) {
  isEditMode = true;

  itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));

  item.classList.add('edit-mode');
  formBtn.innerHTML = ' <i class="fa-solid fa-pen"></i>   Update Item';
  formBtn.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
}

function removeItem(item) {
  if (confirm('Are you sure')) {
    //Removed item from DOM
    item.remove();

    //remove item from storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();
  console.log('removeItemFromStorage', itemsFromStorage);

  //filter out the item to be removed
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // re-set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function clearItems(e) {
  if (confirm('Are you sure you want to delete all?')) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
    //clear from local storage
    localStorage.removeItem('items');
  }

  checkUI();
}

function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });

  console.log(text);
}

function checkUI() {
  itemInput.value = '';
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }

  formBtn.innerHTML = ' <i class="fa-solid fa-plus"></i>   Add Item';
  formBtn.style.backgroundColor = '#333';

  isEditMode = false;
}

//Initialixed app
function init() {
  // Event listeners
  itemForm.addEventListener('submit', onAddItemsSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);
  checkUI();
}

init();
