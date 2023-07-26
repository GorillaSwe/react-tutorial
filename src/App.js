import { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import Title from "./components/Title";
import {v4 as uuidv4} from "uuid";

function App() {
  const [todos, setTodos] = useState([]);

  const [count, setCount] = useState(0);

  const todoNameRef = useRef();

  const handleClick = () => {
    setCount(count + 1);
  }

  useEffect(() => {
    console.log("hello")
  }, [count]);

  const handleAddTodo = () => {
    // Add Task
    const name = todoNameRef.current.value;
    if(name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, {id: uuidv4(), name: name, completed: false}];
    });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  }

  return (
    <>
      <h1>useState, useEffect</h1>
      <button onClick={handleClick}>+</button>
      <p>{count}</p>
      <Title />
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef} />
      <button onClick={handleAddTodo}>Add Task</button>
      <button onClick={handleClear}>Delete Task</button>
      <div>Remaining Task:{todos.filter((todo) => !todo.completed).length}</div>
    </>
  );
}

export default App;
