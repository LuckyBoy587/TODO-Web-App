import "./TodoItem.css"
import {useState} from "react"
import EditItem from "./EditItem";

function TodoItem({todo, setTodoList}) {
    const [editClicked, setEditClicked] = useState(false);

    const handleCancelClick = () => {
        setEditClicked(false)
    }

    const handleTickClick = () => {
        setTodoList((prevState) => prevState.map((item) => (
            item.id === todo.id ? {...item, isDone: !item.isDone} : item
        )))
    }

    const handleDeleteClick = () => {
        setTodoList((prevState) => prevState.filter((item) => item.id !== todo.id))
    }

    return (
        <div className="todo-container">
            <div className="name-box">
                <div className="tick-box" onClick={handleTickClick}>
                    {todo.isDone && <i className="fa-solid fa-check"></i>}
                </div>
                <span>{todo.name}</span>
            </div>

            <div className="button-container">
                <button className="edit-button button" onClick={() => setEditClicked(true)}>
                    <i className="fa-solid fa-wrench"></i>
                    <span>Edit</span>
                </button>
                <button onClick={handleDeleteClick} className="delete-button button">
                    <i className="fa-solid fa-trash"></i>
                    <span>Delete</span>
                </button>
            </div>

            {editClicked && <EditItem todo={todo} setTodoList={setTodoList} onCancel={handleCancelClick}/>}
        </div>
    )
}

export default TodoItem