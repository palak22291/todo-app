import React, { useContext } from "react";
import{useForm} from "react-hook-form";
import {
  TextField,
  Button,
  Typography,
  
} from "@mui/material";

import {TaskContext} from "./Context";


function App() {
  const {register,handleSubmit,reset,formState:{errors}} = useForm();
  

 function addTask(taskText) {
    const newTask = { text: taskText, completed: false };
    setTasks([...tasks, newTask]);
    
  }

function onSubmit(data){
    addTask(data.task)
    reset();
  }

function toggleComplete(index) {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  }

function deleteTask(index) {
  const updated = [...tasks];
  updated.splice(index, 1);
  setTasks(updated);
  }

  
  return (
    <div style={{ maxWidth: 500, margin: "70px auto", padding: 40, backgroundColor: "ivory", borderRadius: 8 }}>
      <Typography variant="h3" align="center" gutterBottom  >
        📝 To-Do App
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Enter a task"
          variant="outlined"
          fullWidth
          {...register("task", { required: true })}
          error={Boolean(errors.task)}
          helperText={errors.task ? "Task is required" : ""}
          style={{ marginBottom: 10 }}
         
        />
        <Button type="submit" variant="contained" fullWidth>
          Add Task
        </Button>
      </form>

      <ul style={{ listStyle: "none", padding: 0, marginTop: 20 }}>
        {tasks.map((task, index) => (
          <li key={index} style={{
            marginBottom: 10,
            padding: "10px",
            background: "#f1f1f1",
            borderRadius: "5px",
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "gray" : "black",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            {task.text}
            <div>
              <Button size="small" onClick={() => toggleComplete(index)}>
                {task.completed ? "Undo" : "Done"}
              </Button>
              <Button size="small" color="error" onClick={() => deleteTask(index)}>
                ❌
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;      
    




