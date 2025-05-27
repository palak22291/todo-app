import React ,{useState} from "react";
import './App.css';

function App() {

  const [tasks,setTasks]=useState([])
  const[input,setInput]=useState("")


  // to add a task
  function addTask(){

    if (input.trim()===""){
      return;                  
    }   

    const newTask ={
      text:input,
      completed:false
    }

    const updatedTasks =[...tasks,newTask]
    setTasks(updatedTasks)
    setInput("")

  }
  // to toggle complete status 

  function toggleComplete(index){
    setTasks(
      tasks.map((task,i)=>
        i===index ? {...task,completed: !task.completed} : task)
    )
  }

  // to delete task 
  
  function deleteTask(index){
    const updatedTasks=[...tasks]
    updatedTasks.splice(index,1)
    setTasks(updatedTasks)

  }
  return (
    <div className="App">
      <h1>📝 To-Do List</h1>

      <div className="input-section">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e)=>{
            if (e.key==="Enter"){
              addTask();
            }
          }}
          placeholder="Enter a task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            {task.text}
            <button onClick={() => toggleComplete(index)}>
              {task.completed ? "Undo" : "Done"}
            </button>
            <button onClick={() => deleteTask(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
    
  );

}
export default App;