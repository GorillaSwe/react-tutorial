import { useState, useRef, useEffect, useContext, useReducer, useMemo } from "react";
import TodoList from "./TodoList";
import useLocalStorage from "./useLocalStorage";
import Title from "./components/Title";
import {v4 as uuidv4} from "uuid";
import CodeContext from ".";

const reducer = (state, action) => {
  switch(action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
}

function App() {
  const [todos, setTodos] = useState([]);

  const [count, setCount] = useState(0);
  const codeInfo = useContext(CodeContext);

  const todoNameRef = useRef();
  const ref = useRef();

  const [state, dispatch] = useReducer(reducer, 0);

  const handleClick = () => {
    setCount(count + 1);
  }

  useEffect(() => {
    console.log("hello")
  }, [count]);

  const handleRef = () => {
    console.log(ref.current.value);
  };

  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);

  const square = useMemo(() => {
    let i = 0;
    while(i < 2000000000) {
      i++;
    }
    return count02 * count02;
  }, [count02]);

  const [age, setAge] = useLocalStorage("age", 20);

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

      <hr />
      <h1>useContext</h1>
      <p>{codeInfo.name}</p>
      <p>{codeInfo.lang}</p>
      
      <hr />
      <h1>useRef</h1>
      <input type="text" ref={ref} />
      <button onClick={handleRef}>useRef</button>
      
      <hr />
      <h1>useReducer</h1>
      <p>カウント:{state}</p>
      <button onClick={() => dispatch({type: "increment"})}>+</button>
      <button onClick={() => dispatch({type: "decrement"})}>-</button>

      <hr />
      <h1>useMemo</h1>
      <div>カウント１：{count01}</div>
      <div>カウント２：{count02}</div>
      <div>結果：{square}</div>
      <button onClick={() => setCount01(count01 + 1)}>+</button>
      <button onClick={() => setCount02(count02 + 1)}>+</button>

      <hr />
      <h1>useCustom</h1>
      <p>{age}</p>
      <button onClick={() => setAge(80)}>年齢をセット</button>

      <hr />
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
