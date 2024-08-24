import { useContext } from "react"
import { TodoContext } from "../App"

const Todo = ({ todo, index, handleEditClick }) => {
    const { setTodoList } = useContext(TodoContext)
    const onTickClick = (index) => {
		setTodoList(t => t.map((todo, i) => (
			i === index ? { ...todo, isDone: !todo.isDone } : todo
		)))
	}
    const deleteTodo = () => {
        setTodoList(t => t.filter((_, itemIndex) => itemIndex !== index))
    }

    return (
        <li key={index}>
            <div className="todo-container">
                <div className="name-box">
                    <div onClick={() => onTickClick(index)} className="tick-box">
                        {todo.isDone && <i className="fa-solid fa-check"></i>}
                    </div>
                    <span className={todo.isDone ? "completed-text" : ""}>{todo.name}</span>
                </div>

                <div className="button-container">
                    <button onClick={() => handleEditClick(index)} className="edit-button list-button">
                        <i className="fa-solid fa-wrench"></i>
                        <span>Edit</span>
                    </button>
                    <button onClick={() => deleteTodo()} className="delete-button list-button">
                        <i className="fa-solid fa-trash"></i>
                        <span>Delete</span>
                    </button>
                </div>
            </div>
        </li>
    )
}

export default Todo