import './App.css';
import { createContext, useState } from "react";
import TodoViewer from './Components/TodoViewer';

export const TodoContext = createContext();

function App() {
	const [todoList, setTodoList] = useState([]);
	const [todoName, setTodoName] = useState("");

	const addTodo = () => {
		if (todoName.length > 0) {
			setTodoList(t => [...t, { name: todoName, isDone: false }])
			setTodoName("")
		}
	}

	const handleNameChange = (e) => {
		setTodoName(e.target.value);
	}

	return (
		<TodoContext.Provider value={{ todoList, setTodoList }}>
			<div className="todo-box">
				<div className='todo-input-box'>
					<h3>TODO APP</h3>
					<h6>What's your task ?</h6>
					<input type='text' placeholder='Add Your Task Here' className='todo-input' value={todoName} onChange={handleNameChange}></input>
					<button className='add-button' onClick={addTodo}>ADD</button>
				</div>
				<TodoViewer />
			</div>
		</TodoContext.Provider>
	)
}

export default App;
