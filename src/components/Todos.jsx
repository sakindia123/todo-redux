import { AiFillEdit } from 'react-icons/ai'
import { BsTrashFill } from 'react-icons/bs'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, handleCheckbox } from '../redux/actions/actions'

const Todos = ({ handleEditClick, isFormVisible }) => {
    const dispatch = useDispatch()
    const todos = useSelector(state => state.todoReducer.data)

    return (
        todos && todos.map((todo) => (
            <div key={todo.id} className='todo-box'>
                <div className='content'>
                    {!isFormVisible && (
                        <input type="checkbox" checked={todo.completed}
                            onChange={() => dispatch(handleCheckbox(todo.id))}></input>
                    )}
                    <p style={todo.completed
                        ? { textDecoration: 'line-through' }
                        : { textDecoration: 'none' }}>
                        {todo.title}
                    </p>
                </div>
                <div className='actions-box'>
                    {!isFormVisible && (
                        <>
                            <span onClick={() => handleEditClick(todo)}><AiFillEdit /></span>
                            <span onClick={() => dispatch(removeTodo(todo.id))}><BsTrashFill /></span>
                        </>
                    )}
                </div>
            </div >
        )))
}

export default Todos