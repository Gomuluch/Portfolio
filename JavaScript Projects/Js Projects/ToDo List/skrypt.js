let $todoInput; 
let $alertInfo;
let $addBtn;
let $ullist;
let $newTask;
let $popup;
let $popupInfo;
let $editedTodo;
let $popupInput;
let $addPopupBtn;
let $closeTodoBtn;
let $idNumber = 0;
let $allTask;

const main = () => {
    prepareDOMElements();
    prepareDOMEvenets();
}

const prepareDOMElements = () => {
    $todoInput = document.querySelector('.todoInput');
    $alertInfo = document.querySelector('.alertInfo');
    $addBtn = document.querySelector('.addBtn');
    $ullist = document.querySelector('.todoList ul');
    $popup = document.querySelector('.popup');
    $popupInfo = document.querySelector('.popupInfo');
    $popupInput = document.querySelector('.popupInput');
    $addPopupBtn = document.querySelector('.accept');
    $closeTodoBtn = document.querySelector('.cancel');
    $allTask = document.getElementsByTagName('li');
};




const prepareDOMEvenets = () => {
$addBtn.addEventListener('click', addNewTask);
$ullist.addEventListener('click', checkClick);
$closeTodoBtn.addEventListener('click', closePopup);
$addPopupBtn.addEventListener('click', changeTodo);
$todoInput.addEventListener('keyup', EnterCheck);
};



const addNewTask = () => {
    if ($todoInput.value !== '') {
        $idNumber++;
        $newTask = document.createElement('li');
        $newTask.innerText = $todoInput.value;
        $newTask.setAttribute('id', `todo-${$idNumber}`);
        $ullist.appendChild($newTask);
    

        $todoInput.value = ""
        $alertInfo.innerText = ""
        createToolsArea()
    } else {
        $alertInfo.innerText = "Wpisz treść zadania!"
    }
};

const EnterCheck = () => {
    if(event.keyCode === 13) {
        addNewTask()
    }
}

const createToolsArea = () => {
    const toolsPanel = document.createElement('div');
    toolsPanel.classList.add('tools');
    const completeBtn = document.createElement('button');
    completeBtn.classList.add('complete');
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit');
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete');
    $newTask.appendChild(toolsPanel);


    completeBtn.innerHTML = '<i class="fas fa-check"></i>';
    editBtn.innerText = "EDIT";
    deleteBtn.innerHTML = '<i class="fas fa-times"></i>';


    toolsPanel.appendChild(completeBtn);
    toolsPanel.appendChild(editBtn);
    toolsPanel.appendChild(deleteBtn);
}

const checkClick = (e) => {
    if (e.target.closest('button').classList.contains('complete'))
    {
    e.target.closest('li').classList.toggle('completed');
    e.target.closest('button').classList.toggle('completed');
    } else if (e.target.closest('button').className === 'edit')
    {
        editTask(e);
    }
    else if (e.target.closest('button').className === 'delete')
    {
        deleteTask(e)
    }

};


const editTask = (e) => {
    const oldTodo = e.target.closest('li').id;
    $editedTodo = document.getElementById(oldTodo);
    $popupInput.value = $editedTodo.firstChild.textContent;

    $popup.style.display = 'flex';
}


const changeTodo = () => {
    if ($popupInput.value !== '') {
        $editedTodo.firstChild.textContent = $popupInput.value;
        $popup.style.display = 'none'
        $popupInfo.innerText = '';
    } else {
        $popupInfo.innerText = 'musisz podać jakąś treść!'
    }
};

const closePopup = () => {
    $popup.style.display = 'none';
}

const deleteTask = (e) => {
    const deleteTodo = e.target.closest('li');
    deleteTodo.remove();
    if ($allTask.length === 0) {
        $alertInfo.innerText = 'Brak zadań na liście';
    };
};



document.addEventListener('DOMContentLoaded', main);

