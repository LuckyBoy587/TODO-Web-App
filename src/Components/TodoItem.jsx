import PropTypes from "prop-types"
import "./TodoItem.css"
import { useState } from "react"
import EditItem from "./EditItem";

function TodoItem(props) {
    const [editClicked, setEditClicked] = useState(false);
    const handleCancelClick = () => {
        setEditClicked(false)
    }

    return (
        <div style={editClicked ? {} : {}} className="todo-container">
            <div className="name-box">
                <div className="tick-box" onClick={() => props.onComplete(props.id)}>
                    {props.isDone && <i className="fa-solid fa-check"></i>}
                </div>
                <span>{props.name}</span>
            </div>

            <div className="button-container">
                <button className="edit-button button" onClick={() => setEditClicked(true)}>
                    <i className="fa-solid fa-wrench"></i>
                    <span>Edit</span>
                </button>
                <button onClick={() => props.onDelete(props.id)} className="delete-button button">
                    <i className="fa-solid fa-trash"></i>
                    <span>Delete</span>
                </button>
            </div>

            {editClicked && <EditItem name={props.name} isDone={props.isDone} onCancel={handleCancelClick} />}
        </div>
    )
}

TodoItem.propTypes = {
    name: PropTypes.string,
    id: PropTypes.number,
    isDone: PropTypes.bool,
    onDelete: PropTypes.func,
    onComplete: PropTypes.func,
    onModify: PropTypes.func
}

export default TodoItem