import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

function App() {

  const [todo, settodo] = useState("")
  const [todos, settodos] = useState([])
  const [show, setshow] = useState(true)

  useEffect(() => {
    const fetchTodos = async () => {
      
      let todos = localStorage.getItem("todos")
      if (todos) {
        settodos(JSON.parse(todos));
      }
    };

    fetchTodos();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // }, [todos]);


  const togglefinish = (params) => {
    setshow(!show)
  }

  const handeladd = async () => {

    settodos([...todos, { todo, id:uuidv4() ,  isCompleted: false  }]);
    localStorage.setItem("todos", JSON.stringify([...todos, {todo, id:uuidv4() , isCompleted: false }]))
    settodo("")
  }


  const handeledit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id
    });

    settodos(newTodos)

  }


  const handeldelete = async(e, id) => {


    settodos(todos.filter(item=>item.id !== id))
    localStorage.setItem("todos", JSON.stringify(todos.filter(item=>item.id !== id)));


  }



  const handelchange = (e) => {
    settodo(e.target.value)
  }

  const handelcheck = async(e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    localStorage.setItem("todos", JSON.stringify(newTodos))
    settodos(newTodos)

  }




  return (
    <>
      <Navbar />
      <div className="mx-3  md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-200 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-3xl '> iTask - Manage your todos in one place</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h2 className='text-2xl font-bold'>Add a Todo</h2>
          <div className="flex">
            <input onChange={handelchange} value={todo} type="text" className='w-full bg-white rounded-full px-5 py-1 ' />
            <button onClick={handeladd} disabled={todo.length < 3} className='bg-violet-800 hover:bg-violet-950 mx-2  disabled:bg-violet-700 p-4 py-2 text-sm font-bold text-white rounded-full '>Save</button>
          </div>
        </div>
        <input className='my-4' onChange={togglefinish} type="checkbox" checked={show} /> Show finished

        <h2 className='text-2xl font-bold '>Your Todos</h2>
        <div className="todos">
          {todos.length == 0 && <div className='m-5'>No todos to display </div>}

          {todos.map(item => {
            return (show || !item.isCompleted) && <div key={item._id} className="todo flex  my-3 justify-between">
              <div className="flex gap-5">
                <input name={item.id} onChange={handelcheck} type="checkbox" checked={item.isCompleted} />
                <div className={!item.isCompleted ? "" : "line-through"}> {item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handeledit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1' ><CiEdit /></button>
                <button onClick={(e) => handeldelete(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1' > <MdOutlineDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
