import { createContext, useEffect,useState } from "react";

export const TaskContext =createContext();

export const TaskProvider = ({children})=>{
    const [tasks, setTasks] = useState(() => {
        const saved = sessionStorage.getItem("tasks");
        return saved ? JSON.parse(saved) : [];
      });

}

useEffect(() => {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

return(
    <TaskContext.Provider value={{tasks,setTasks}}> 
        {children}
    </TaskContext.Provider>

)

