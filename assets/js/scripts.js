// Seleção dos elementos
const toDoForm = document.querySelector('#toDoForm');
const toDoInput = document.querySelector('#toDoInput');
const toDoListContent = document.querySelector('#toDoListContent');
const editForm = document.querySelector('#editForm');
const editInput = document.querySelector('#editInput');
const cancelEdit = document.querySelector('#headerEditTask i');

let oldValuetask;

// Funções
const saveAddToDoTask = (textInput) => {
   const toDoContent = document.createElement('div');
   toDoContent.classList.add('toDoTasks');

   const toDoText = document.createElement('h3');
   toDoText.innerText = textInput;
   toDoContent.appendChild(toDoText);

   const boxButtons = document.createElement('div');
   boxButtons.classList.add('boxButtonsTasks');
   toDoContent.appendChild(boxButtons);

   const buttonTaskDone = document.createElement('button');
   buttonTaskDone.classList.add('finishTask');
   buttonTaskDone.innerHTML = '<i class="fa-solid fa-check"></i>';
   boxButtons.appendChild(buttonTaskDone);

   const buttonEditTask = document.createElement('button');
   buttonEditTask.classList.add('editTask');
   buttonEditTask.innerHTML = '<i class="fa-solid fa-pen"></i>';
   boxButtons.appendChild(buttonEditTask);

   const buttonRemoveTask = document.createElement('button');
   buttonRemoveTask.classList.add('removeTask');
   buttonRemoveTask.innerHTML = '<i class="fa-solid fa-xmark"></i>';
   boxButtons.appendChild(buttonRemoveTask);

   toDoListContent.appendChild(toDoContent);

   toDoInput.value = '';
   toDoInput.focus();
};

const toggleForms = () => {
   editForm.classList.toggle('hideElement');
   toDoForm.classList.toggle('hideElement');
   toDoListContent.classList.toggle('hideElement');
};

const updateValueTask = (text) => {
   const tasks = document.querySelectorAll('.toDoTasks');

   tasks.forEach((task) => {
      let taskTitle = task.querySelector('h3');

      if (taskTitle.innerText === oldValuetask) {
         taskTitle.innerText = text;
      }
   });
};

// Eventos
toDoForm.addEventListener('submit', (e) => {
   e.preventDefault();

   const toDoInputValue = toDoInput.value;

   if (toDoInputValue) {
      saveAddToDoTask(toDoInputValue);
   }
});

editForm.addEventListener('submit', (e) => {
   e.preventDefault();

   const valueEditTask = editInput.value;

   if (valueEditTask) {
      updateValueTask(valueEditTask);
   }

   toggleForms();
});

document.addEventListener('click', (e) => {
   const targetEl = e.target;
   const parentEl = targetEl.closest('#toDoListContent > div');
   let taskTitle;

   if (parentEl && parentEl.querySelector('h3')) {
      taskTitle = parentEl.querySelector('h3').innerText;
   }

   if (targetEl.classList.contains('finishTask')) {
      parentEl.classList.toggle('done');
   }

   if (targetEl.classList.contains('editTask')) {
      toggleForms();

      editInput.value = taskTitle;
      oldValuetask = taskTitle;
   }

   if (targetEl.classList.contains('removeTask')) {
      parentEl.remove();
   }
});

cancelEdit.addEventListener('click', () => {
   toggleForms();
});
