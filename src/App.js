import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = sessionStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    sessionStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function addTask() {
    if (input.trim() === "") return;
    const newTask = { text: input, completed: false };
    setTasks([...tasks, newTask]);
    setInput("");
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
    <Box sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh", py: 5 }}>
      <Container maxWidth="sm" sx={{ backgroundColor: "white", p: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          📝 To-Do List
        </Typography>

        <TextField
          fullWidth
          label="Enter a task"
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addTask();
            }
          }}
          sx={{ mb: 2 }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={addTask}
          sx={{ mb: 3 }}
        >
          Add Task
        </Button>

        <List>
          {tasks.map((task, index) => (
            <ListItem
              key={index}
              sx={{
                bgcolor: "#f9f9f9",
                mb: 1,
                borderRadius: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "gray" : "black",
              }}
            >
              <ListItemText primary={task.text} />
              <Box>
                <Button
                  variant="outlined"
                  color="success"
                  size="small"
                  onClick={() => toggleComplete(index)}
                  sx={{ mr: 1 }}
                >
                  {task.completed ? "Undo" : "Done"}
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => deleteTask(index)}
                >
                  ❌
                </Button>
              </Box>
            </ListItem>
          ))}
        </List>
      </Container>
    </Box>
  );
}

export default App;
