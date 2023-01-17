import axios from "axios"
import { useEffect, useState } from "react"
import Form from "./components/Form"
import Todos from "./components/Todos"
import { useDispatch, useSelector } from "react-redux"
import { deleteAll, fetchTodo } from "./redux/actions/actions"

const App = () => {
  const dispatch = useDispatch()
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [editTodo, setEditTodo] = useState('')
  const todos = useSelector(state => state.todoReducer.data)

  const getData = async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
      .catch((err) => console.log(err))
    let intitialTodos = response.data.slice(0, 10)
    dispatch(fetchTodo(intitialTodos))
  }

  useEffect(() => {
    getData()
  }, [])

  const handleEditClick = (item) => {
    setIsFormVisible(true)
    setEditTodo(item)
  }

  const cancelUpdate = () => {
    setIsFormVisible(false)
  }

  const goBackToForm = () => {
    setIsFormVisible(false)
  }

  return (
    <div className="wrapper">
      <br />
      <h1 className="text-center">TODO-APP USING REACT/REDUX</h1>
      <Form isFormVisible={isFormVisible}
        editTodo={editTodo}
        cancelUpdate={cancelUpdate}
        goBackToForm={goBackToForm} />
      <Todos handleEditClick={handleEditClick}
        isFormVisible={isFormVisible} />
      {todos.length > 0 && (
        <button className="btn btn-danger btn-md delete-all"
          onClick={() => dispatch(deleteAll())}>Delete All</button>
      )}
    </div>
  )
}

export default App