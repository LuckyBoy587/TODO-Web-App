import PropTypes from "prop-types"
import "./TodoItem.css"

function TodoItem(props) {
    return (
        <div className="todo-container">
            <div className="name-box">
                <div className="tick-box" onClick={() => props.onComplete(props.name)}>
                    {props.isDone && <i className="fa-solid fa-check"></i>}
                </div>
                <span>{props.name}</span>
            </div>

            <div className="button-container">
                <button className="edit-button button">
                    <i className="fa-solid fa-wrench"></i>
                    <span>Edit</span>
                </button>
                <button onClick={() => props.onDelete(props.name)} className="delete-button button">
                    <i className="fa-solid fa-trash"></i>
                    <span>Delete</span>
                </button>
            </div>
        </div>
    )
}

TodoItem.propTypes = {
    name: PropTypes.string,
    isDone: PropTypes.bool,
    onDelete: PropTypes.func,
    onComplete: PropTypes.func
}

export default TodoItem