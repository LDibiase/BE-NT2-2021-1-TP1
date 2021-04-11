const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
};

const list = document.getElementById('todo-list');
const itemCount = document.getElementById('item-count');
const checkedCount = document.getElementById('checked-count');
const uncheckedCount = document.getElementById('unchecked-count');

function addTodo() {
  const itemId = getItemCount() + 1;

  const itemText = prompt("Agrega una tarea", "Aprender React");

  if (itemText) {
    // Create item checkbox
    const newCheckbox = document.createElement('input');
    newCheckbox.setAttribute('type', 'checkbox');
    newCheckbox.setAttribute('id', `checkbox${itemId}`);
    newCheckbox.setAttribute('value', `checkbox${itemId}`);
    newCheckbox.setAttribute('onchange', 'updateCounters()');
    newCheckbox.setAttribute('class', classNames.TODO_CHECKBOX);

    // Create item label
    const newLabelText = document.createTextNode(itemText);
    const newLabel = document.createElement('label');
    newLabel.setAttribute('class', classNames.TODO_TEXT);
    newLabel.appendChild(newCheckbox);
    newLabel.appendChild(newLabelText);

    // Create "Delete" button
    const newDeleteButton = document.createElement('button');
    newDeleteButton.setAttribute('onclick', 'deleteTodo(this)');
    newDeleteButton.setAttribute('class', classNames.TODO_DELETE);
    newDeleteButton.innerText = 'x';

    // Create item
    const newItem = document.createElement('li');
    newItem.setAttribute('class', classNames.TODO_ITEM);
    newCheckbox.setAttribute('id', `item${itemId}`);
    newItem.appendChild(newLabel);
    newItem.appendChild(newDeleteButton);

    // Append item
    list.appendChild(newItem);

    // Update counters
    itemCount.innerText = itemId;
    uncheckedCount.innerText = getUncheckedCount();
  }
}

function getItemCount() {
  return document.getElementsByClassName(classNames.TODO_ITEM).length;
}

function getCheckboxCount(condition) {
  return () => {
    const checkboxes = [...document.getElementsByClassName(classNames.TODO_CHECKBOX)];
    return checkboxes.filter(condition).length;
  }
}

const getUncheckedCount = getCheckboxCount(el => !el.checked);
const getCheckedCount = getCheckboxCount(el => el.checked);

function updateCounters() {
  uncheckedCount.innerText = getUncheckedCount();
  checkedCount.innerText = getCheckedCount();
}

function deleteTodo(el) {
  // Remove item
  el.parentNode.remove();

  // Update counters
  itemCount.innerText = getItemCount();
  checkedCount.innerText = getCheckedCount();
  uncheckedCount.innerText = getUncheckedCount();
}
