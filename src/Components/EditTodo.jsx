import { useContext, useState } from "react"
import { TodoContext } from "../App"

const EditBox = ({ todo, index, resetEdit }) => {
    const { setTodoList } = useContext(TodoContext)
    const [editName, setEditName] = useState(todo.name)
    const [editStatus, setEditStatus] = useState(todo.isDone)

    const handleEditNameChange = (e) => {
        setEditName(e.target.value)
    }
    const onEditTickClick = (status) => {
        setEditStatus(status)
    }
    const handleUpdateButtonClick = () => {
        setTodoList(t => t.map((item, i) => (
            i === index ? { ...item, name: editName, isDone: editStatus } : item
        )))
        resetEdit()
    }

    return (
        <div className='edit-container'>
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
                <button onClick={() => handleUpdateButtonClick()} className="button">
                    <i class="fa-solid fa-upload"></i>
                    <span>Update</span>
                </button>
                <button onClick={() => resetEdit()} className="button">
                    <i class="fa-solid fa-ban"></i>
                    <span>Cancel</span>
                </button>
            </div>
        </div>
    )
}

export default EditBox