import {useState} from 'react';
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
    const addTodo = (todoName) => {
        if (todoName.length > 0) {
            setTodoList((prevTodoList) => [{name: todoName, isDone: false}, ...prevTodoList]);
            setTodoName("")
        }
    };
    const deleteTodo = (todoName) => {
        setTodoList((prevTodoList) => (
            prevTodoList.filter((todoObj) => todoObj.name !== todoName)
        ))
    };
    const onTodoComplete = (todoName) => {
        setTodoList((prevTodoList) => (
            prevTodoList.map((todoObj) => (
                todoObj.name === todoName ? {...todoObj, isDone: !todoObj.isDone} : todoObj
            ))
        ))
    }

    const [todoName, setTodoName] = useState("");
    const handleInputChange = (event) => {
        setTodoName(event.target.value)
    }

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
                {currTab === TABS.ALL && todoList.map((todo, index) => (
                    <TodoItem key={index} name={todo.name} isDone={todo.isDone} onDelete={deleteTodo}
                              onComplete={onTodoComplete}/>
                ))}

                {currTab === TABS.COMPLETE && todoList.filter((todoObj) => (todoObj.isDone)).map((todo, index) => (
                    <TodoItem key={index} name={todo.name} isDone={todo.isDone} onDelete={deleteTodo}
                              onComplete={onTodoComplete}/>
                ))}

                {currTab === TABS.INCOMPLETE && todoList.filter((todoObj) => (!todoObj.isDone)).map((todo, index) => (
                    <TodoItem key={index} name={todo.name} isDone={todo.isDone} onDelete={deleteTodo}
                              onComplete={onTodoComplete}/>
                ))}
            </div>
        </div>
    )
}

export default App;
