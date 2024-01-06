class TodoList {
  #form = document.getElementById('form');
  #input = document.getElementById('input');
  #todosUL = document.getElementById('todos');
  #todos = [];

  constructor() {
    this.loadTodos();
    this.bindEvents();
  }

  loadTodos() {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (storedTodos) {
      this.#todos = storedTodos;
      this.renderTodos();
    }
  }

  bindEvents() {
    this.#form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.addTodo();
    });
  }

  addTodo(todoText = this.#input.value) {
    if (todoText) {
      const todo = { text: todoText, completed: false };
      this.#todos.push(todo);
      this.renderTodo(todo);
      this.#input.value = '';
      this.saveTodos();
    }
  }

  renderTodo(todo) {
    const todoEl = document.createElement('li');
    if (todo.completed) {
      todoEl.classList.add('completed');
    }
    todoEl.innerText = todo.text;

    todoEl.addEventListener('click', () => {
      todo.completed = !todo.completed;
      todoEl.classList.toggle('completed');
      this.saveTodos();
    });

    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.removeTodo(todoEl);
    });

    this.#todosUL.appendChild(todoEl);
  }

  renderTodos() {
    this.#todosUL.innerHTML = ''; // Clear existing todos
    this.#todos.forEach(this.renderTodo);
  }

  removeTodo(todoEl) {
    const todoIndex = this.#todos.findIndex(todo => todo.text === todoEl.innerText);
    this.#todos.splice(todoIndex, 1);
    todoEl.remove();
    this.saveTodos();
  }

  saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.#todos));
  }
}

new TodoList();
