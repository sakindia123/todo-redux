import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { addTodo, handleEditSubmit } from '../redux/actions/actions';

const Form = ({ isFormVisible, editTodo, cancelUpdate, goBackToForm }) => {
    const dispatch = useDispatch()
    const [editValue, setEditValue] = useState('');
    const [todoValue, setTodoValue] = useState('')

    useEffect(() => {
        setEditValue(editTodo.title)
    }, [editTodo])

    const handleSubmit = (e) => {
        e.preventDefault()
        let date = new Date()
        let time = date.getTime()

        let todoObj = {
            id: time,
            title: todoValue,
            completed: false
        }
        setTodoValue('')
        dispatch(addTodo(todoObj))
    }

    const editSubmit = (e) => {
        e.preventDefault()
        let editedObj = {
            id: editTodo.id,
            title: editValue,
            completed: false
        }
        dispatch(handleEditSubmit(editedObj))
        goBackToForm()
    }

    return (
        <>
            {!isFormVisible ? (
                <form className='form-group custom-form' onSubmit={handleSubmit}>
                    <label>Add your todo-items</label>
                    <div className='input-and-btn'>
                        <input type="text" className='form-control' required
                            value={todoValue} onChange={(e) => setTodoValue(e.target.value)} />
                        <button type="submit" className='btn btn-secondary btn-md'>ADD</button>
                    </div>
                </form>
            ) : (
                <form className='form-group custom-form' onSubmit={editSubmit}>
                    <label>Update your todo-items</label>
                    <div className='input-and-btn'>
                        <input type="text" className='form-control' required
                            value={editValue || ""} onChange={(e) => setEditValue(e.target.value)} />
                        <button type="submit" className='btn btn-secondary btn-md'>UPDATE</button>
                    </div>
                    <button type="button" className='btn btn-primary btn-md back-btn'
                        onClick={cancelUpdate}>BACK</button>
                </form>
            )}
        </>

    )
}

export default Form