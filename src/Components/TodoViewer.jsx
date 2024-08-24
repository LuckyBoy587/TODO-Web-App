import { useContext, useState } from "react"
import Todo from "./Todo"
import NoTask from "./NoTask"
import { TodoContext } from "../App"
import EditBox from "./EditTodo"

const TodoViewer = () => {
    const { todoList } = useContext(TodoContext)
    const TABS = {
        ALL: "All",
        COMPLETE: "Completed",
        INCOMPLETE: "Incomplete"
    }

    const [currTab, setCurrTab] = useState(TABS.ALL)
    const [editIndex, setEditIndex] = useState(-1)

    const handleTabChange = (tab) => {
        setCurrTab(tab)
        resetEdit()
    }

    const handleEditClick = (index) => {
        setEditIndex(index)
    }
    const resetEdit = () => {
        setEditIndex(-1)
    }
    const createItem = (todo, index) => {
        if (index !== editIndex) {
            return <Todo key={index} todo={todo} index={index} handleEditClick={handleEditClick} />
        } else return <EditBox todo={todo} index={index} resetEdit={resetEdit} />
    }
    const getAllTodo = () => {
        if (todoList.length > 0) {
            return (
                <ol>
                    {todoList.map((element, index) => (
                        createItem(element, index)
                    ))}
                </ol>
            )
        } else {
            return <NoTask />
        }
    }

    const getCompletedTodo = () => {
        let currList = todoList.filter(element => element.isDone)
        if (currList.length > 0) {
            return (
                <ol>
                    {currList.map((element, index) => (
                        createItem(element, index)
                    ))}
                </ol>
            )
        } else {
            return <NoTask />
        }
    }

    const getInCompleteTodo = () => {
        let currList = todoList.filter(element => !element.isDone)
        if (currList.length > 0) {
            return (
                <ol>
                    {currList.map((element, index) => (
                        createItem(element, index)
                    ))}
                </ol>
            )
        } else {
            return <NoTask />
        }
    }

    return (
        <div className="">
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

export default TodoViewer