import { useState } from 'react';
import './App.css';

function App() {
	const noTaskBox = () => {
		return <div className='no-task'>
			<i class="fa-solid fa-face-frown-open"></i>
			<p>No Task To Show !</p>
		</div>
	}
	const createEditBox = (index) => {
		return <div className='edit-container'>
			<div className='name-field'>
				<label>TODO Name: </label> <br />
				<input value={editName} onChange={handleEditNameChange} type='text' className='new'></input>
			</div>
			<div className='status-field'>
				<label>Completion Status</label>
				<div className="name-box">
					<div onClick={() => onEditTickClick(true)} className="tick-box">
						{editStatus && <i className="fa-solid fa-check"></i>}
					</div>
					<span>Done</span>
				</div>
				<div className="name-box">
					<div onClick={() => onEditTickClick(false)} className="tick-box">
						{!editStatus && <i className="fa-solid fa-check"></i>}
					</div>
					<span>Not Done</span>
				</div>
			</div>
			<div className='edit-button-container'>
				<button onClick={() => handleUpdateButtonClick(index)} className="button">
					<i class="fa-solid fa-upload"></i>
					<span>Update</span>
				</button>
				<button onClick={() => handleEditCancelClick()} className="button">
					<i class="fa-solid fa-ban"></i>
					<span>Cancel</span>
				</button>
			</div>
		</div>
	}

	const createTodo = (todo, index) => {
		if (editIndex === index) {
			return createEditBox(index)
		} else {
			return <li key={index}>
				<div className="todo-container">
					<div className="name-box">
						<div onClick={() => onTickClick(index)} className="tick-box">
							{todo.isDone && <i className="fa-solid fa-check"></i>}
						</div>
						<span className={todo.isDone ? "completed-text" : ""}>{todo.name}</span>
					</div>

					<div className="button-container">
						<button onClick={() => handleUpdateButtonClick(index)} className="edit-button list-button">
							<i className="fa-solid fa-wrench"></i>
							<span>Edit</span>
						</button>
						<button onClick={() => deleteTodo(index)} className="delete-button list-button">
							<i className="fa-solid fa-trash"></i>
							<span>Delete</span>
						</button>
					</div>
				</div>
			</li>
		}
	}

	const TABS = {
		ALL: "All",
		COMPLETE: "Completed",
		INCOMPLETE: "Incomplete"
	}

	const [todoList, setTodoList] = useState([]);
	const [todoName, setTodoName] = useState("");
	const [currTab, setCurrTab] = useState(TABS.ALL)
	const [editIndex, setEditIndex] = useState(-1);
	const [editName, setEditName] = useState("");
	const [editStatus, setEditStatus] = useState(false);

	const handleNameChange = (event) => {
		setTodoName(event.target.value);
	}

	const handleEditNameChange = (event) => {
		setEditName(event.target.value)
	}

	const handleTabChange = (tab) => {
		setCurrTab(tab)
		setEditIndex(-1)
	}

	const handleUpdateButtonClick = (index) => {
		setEditIndex(index)
		setEditName(todoList[index].name)
		setEditStatus(todoList[index].isDone)
	}

	const handleEditCancelClick = () => {
		setEditIndex(-1)
	}

	const getAllTodo = () => {
		if (todoList.length > 0) {
			return <ol>
				{todoList.map((todo, index) => createTodo(todo, index))}
			</ol>
		} else {
			return noTaskBox()
		}
	}

	const getCompletedTodo = () => {
		const completedList = todoList.filter((element) => element.isDone)
		if (completedList.length > 0) {
			return <ol>
				{completedList.map((element, index) => <li key={index}>{createTodo(element, index)}</li>)}
			</ol>
		} else {
			return noTaskBox()
		}
	}

	const getInCompleteTodo = () => {
		const IncompleteList = todoList.filter((element) => !element.isDone)
		if (IncompleteList.length > 0) {
			return <ol>
				{IncompleteList.map((element, index) => <li key={index}>{createTodo(element, index)}</li>)}
			</ol>
		} else {
			return noTaskBox()
		}
	}

	const addTodo = () => {
		if (todoName.length > 0) {
			setTodoList(t => [...t, { name: todoName, isDone: false }])
			setTodoName("")
		}
	}

	const deleteTodo = (index) => {
		setTodoList(t => t.filter((_, i) => i !== index))
	}

	const onTickClick = (index) => {
		setTodoList(t => t.map((todo, i) => (
			i === index ? { ...todo, isDone: !todo.isDone } : todo
		)))
	}

	const onEditTickClick = (status) => {
		setEditStatus(status)
	}

	return (
		<div className='todo-box'>
			<div className='todo-input-box'>
				<h3>TODO APP</h3>
				<h6>What's your task ?</h6>
				<input type='text' placeholder='Add Your Task Here' className='todo-input' value={todoName} onChange={handleNameChange}></input>
				<button className='add-button' onClick={addTodo}>ADD</button>
			</div>

			<div className="tab-options">
				<p className={currTab === TABS.ALL ? "selected-tab" : ""} onClick={() => handleTabChange(TABS.ALL)}>All
					Tasks</p>
				<p className={currTab === TABS.INCOMPLETE ? "selected-tab" : ""}
					onClick={() => handleTabChange(TABS.INCOMPLETE)}>Incomplete Tasks</p>
				<p className={currTab === TABS.COMPLETE ? "selected-tab" : ""}
					onClick={() => handleTabChange(TABS.COMPLETE)}>Completed Tasks</p>
			</div>

			<div className='todo-viewer'>
				{currTab === TABS.ALL && getAllTodo()}
				{currTab === TABS.COMPLETE && getCompletedTodo()}
				{currTab === TABS.INCOMPLETE && getInCompleteTodo()}
			</div>
		</div>
	)
}

export default App;
