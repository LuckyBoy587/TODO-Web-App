import { useState } from "react";
import "./EditItem.css"

const EditItem = ({ todo, setTodoList, onCancel }) => {
    const [newName, setNewName] = useState(todo.name)
    const [status, setStatus] = useState(todo.isDone)
    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleStatusChange = (isDone) => {
        setStatus(isDone)
    }

    const handleUpdateClick = () => {
        setTodoList((prevState) => prevState.map(
            (item) => item.id === todo.id ? { ...item, name: newName, isDone: status } : item
        ))
        onCancel()
    }

    return (
        <div className="edit-background">
            <div className="edit-container">
                <div className="field-container">
                    <span>Name</span>
                    <input onChange={(event) => handleNameChange(event)} type="text" value={newName} />
                </div>
                <div className="field-container">
                    <span>Status</span>
                    <input onChange={() => handleStatusChange(true)} type="radio" name="status" id="done" checked={status} />
                    <label htmlFor="done">Done</label>
                    <input onChange={() => handleStatusChange(false)} type="radio" name="status" id="not-done" checked={!status} />
                    <label htmlFor="not-done">Not Done</label>
                </div>
                <div className="button-container">
                    <button onClick={handleUpdateClick}>Update</button>
                    <button onClick={onCancel}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default EditItem;