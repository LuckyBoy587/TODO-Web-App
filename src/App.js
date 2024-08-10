import { useState } from 'react';
import './App.css';
import TodoItem from './Components/TodoItem';

function App() {
    const TABS = {
        ALL: "All",
        COMPLETE: "Completed",
        INCOMPLETE: "Incomplete"
    }
    const [currTab, setCurrTab] = useState(TABS.ALL)
    const [todoList, setTodoList] = useState([]);
    const [todoID, setTodoID] = useState(0);
    const addTodo = (todoName) => {
        if (todoName.length > 0) {
            const id = todoID;
            setTodoList((prevTodoList) => [{ name: todoName, isDone: false, id: id }, ...prevTodoList]);
            setTodoName("")
            setTodoID(todoID + 1)
        }
    };
    const deleteTodo = (id) => {
        setTodoList((prevTodoList) => (
            prevTodoList.filter((todoObj) => todoObj.id !== id)
        ))
    };
    const onTodoComplete = (id) => {
        setTodoList((prevTodoList) => (
            prevTodoList.map((todoObj) => (
                todoObj.id === id ? { ...todoObj, isDone: !todoObj.isDone } : todoObj
            ))
        ))
    }
    const modifyTodo = (id, newName) => {
        setTodoList((prevTodoList) => (
            prevTodoList.map((todoObj) => (
                todoObj.id === id ? { ...todoObj, name: newName } : todoObj
            ))
        ))
    };

    const [todoName, setTodoName] = useState("");
    const handleInputChange = (event) => {
        setTodoName(event.target.value)
    }

    const createTodo = (todoObj, index) => (
        <TodoItem key={index} id={todoObj.id} name={todoObj.name} isDone={todoObj.isDone}
            onDelete={deleteTodo} onComplete={onTodoComplete} onModify={modifyTodo}/>
    )

    return (
        <div className='todo-box'>
            <div className='todo-input-box'>
                <h3>TODO APP</h3>
                <h6>What's your task ?</h6>
                <input type='text' value={todoName} onChange={handleInputChange}></input>
                <button className='add-button' onClick={() => addTodo(todoName)}>ADD</button>
            </div>

            <div className="tab-options">
                <p className={currTab === TABS.ALL ? "selected-tab" : ""} onClick={() => setCurrTab(TABS.ALL)}>All
                    Tasks</p>
                <p className={currTab === TABS.INCOMPLETE ? "selected-tab" : ""}
                    onClick={() => setCurrTab(TABS.INCOMPLETE)}>Incomplete Tasks</p>
                <p className={currTab === TABS.COMPLETE ? "selected-tab" : ""}
                    onClick={() => setCurrTab(TABS.COMPLETE)}>Completed Tasks</p>
            </div>

            <div className='todo-viewer'>
                {currTab === TABS.ALL && todoList.map((todo, index) => (createTodo(todo, index)))}

                {currTab === TABS.COMPLETE && todoList.filter((todoObj) => (todoObj.isDone)).map((todo, index) => (createTodo(todo, index)))}

                {currTab === TABS.INCOMPLETE && todoList.filter((todoObj) => (!todoObj.isDone)).map((todo, index) => (createTodo(todo, index)))}
            </div>
        </div>
    )
}

export default App;
