import { useState , useEffect} from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import Navbar from "./components/Navbar";

import './App.css';
import { v4 as uuidv4 } from "uuid";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);

  // todo is a input text
  const [todo, settodo] = useState("");

  // todos handle of our stored to do
  const [todos, settodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodos(todos)
    }

  }, [])
  

  const saveToLS = (params) => {
    localStorage.setItem("todos" ,JSON.stringify(todos))
  }
  


  const handleEdit = (e,id) => {
    let t=todos.filter(i=>i.id ===id)
    settodo(t[0].todo)

    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    settodos(newTodos);
    saveToLS()
  };

  

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    settodos(newTodos);
    saveToLS()
  };

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    saveToLS()
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;

    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
    saveToLS()
  };

  return (
    <>
      <Navbar />

      <div className="md:container md:mx-auto bg-violet-200 my-4 rounded-xl p-3 min-h-[85vh]">
        <h1 className="text-center font-bold text-xl underline decoration-dotted "> iTask MANAGE YOUR ALL TODOS AT ONE PLACE</h1>
        <div className="addTodo flex flex-col my-3">
          <h2 className="text-lg font-bold mx-14 m-0.5 ">Add A Todo</h2>
          <input onChange={handleChange} value={todo} type="text " className="p-2 md:w-11/12 mx-12 rounded-md "  placeholder=" Enter Your Task ...."/>

          <button
            onClick={handleAdd}
            disabled={todo.length <=3}
            className= " mx-12   bg-violet-600 hover:bg-violet-800 p-2 py-1 text-white rounded-md m-3 font-bold  transition-all hover:text-lg  md:w-[91.50%] h-9 cursor-pointer"
          >
            Save 
          </button>
        </div>

        <h1 className="text-lg font-semibold mx-8">Your To Do</h1>

        <div className="todos">
          {todos.length === 0 && (
            <div className="m-5 ">No Todos to Display</div>
          )}
          {todos.map((item) => {


            return (
              <div
                key={item.id}
                className="todo flex gap-4 items-center min-w-3.5 justify-between m-3 font-semibold border-2 border-white px-2 py-0.5 rounded-lg transition-all duration-250  hover:bg-violet-200 hover:border-black cursor-pointer"

              >
                <div className="flex gap-5 px-2  py-2  ">

                <input
                  name={item.id}
                  onChange={handleCheckbox}
                  type="checkbox"

                  className="custom-checkbox cursor-pointer" // Add this line
                  checked={item.isCompleted} 

                  />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>

                  </div>


                <div className="buttons flex gap-2">
                  <button
                    onClick={(e)=>handleEdit(e , item.id)}
                    className="bg-violet-500 hover:bg-violet-800 p-2 py-1 text-white rounded-md m-1 font-bold transition-all hover:text-lg w-15 h-9"
                  >
                   <CiEdit />

                  </button>

                  <button onClick={(e) => {handleDelete(e, item.id)}}
                    className="bg-violet-500 hover:bg-violet-800 p-2 py-1 text-white rounded-md m-1 font-bold transition-all hover:text-lg w-15 h-9 ">
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default App;
