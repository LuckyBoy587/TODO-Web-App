import { useState } from "react";
import "./EditItem.css"

const EditItem = ({name, isDone, onCancel}) => {
    const [todoObj, setTodoObj] = useState({name: name, isDone: isDone})
    return (
        <div className="edit-container">
            <div className="field-container">
                <span>Name</span>
                <input onChange={(event) => setTodoObj({...todoObj, name: event.target.value})} type="text" value={todoObj.name} />
            </div>
            <div className="field-container">
                <span>Status</span>
            </div>
            <div className="button-container">
                <button onClick={() => onCancel()}>Cancel</button>
            </div>
        </div>
    )
}

export default EditItem;