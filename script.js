const itemForm = document.querySelector('#item-form');
const itemInput = document.querySelector('#item-input');
const itemList = document.querySelector('#item-list');
const clearBtn = document.querySelector('#clear');
const items = itemList.querySelectorAll('li');
const itemFilter = document.querySelector('#filter');

function addItem(e) {
  e.preventDefault();
  //The is make the first letter of each string uppercase
  //itemInput.value.charAt(0).toUpperCase() + itemInput.value.slice(1).toLowerCase();
  const newItem = itemInput.value.charAt(0).toUpperCase() + itemInput.value.slice(1).toLowerCase();

  //Validate Input
  if (itemInput.value === '') {
    alert('please add an item');
    return;
  }

  //create list item

  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  // create the button
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  //add the li to the DOM
  itemList.appendChild(li);
  checkUI();

  //clear the input field
  itemInput.value = '';
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

function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
  checkUI();
}

function clearItems(e) {
  if (confirm('Are you sure you want to delete all?')) {
    while (itemList.firstChild) {
      itemList.removeChild(itemList.firstChild);
    }
  }
  checkUI();
}

function checkUI() {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

// Event listeners

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);

checkUI();
