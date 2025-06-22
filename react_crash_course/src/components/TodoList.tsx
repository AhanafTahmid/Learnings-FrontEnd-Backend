
const TodoList = () => {
    function todolist(){
        const todos = ["Mango", "Apple"]
        return(
          <>
          <ul>
          {todos.map((val, key)=>(
            
              <li key={key} >{val}</li>
            ))
            }
            </ul>
          </>
        )
      }
  return (
    <div>{todolist()}</div>
  )
}

export default TodoList