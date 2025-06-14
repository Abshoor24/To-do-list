import { useRef, useState, useEffect } from "react";
import "./App.css";
import Form from "./Components/form";
import Todolist from "./Components/todolist";
import Footer from "./Components/Footer";

function App() {
  const STORAGE = "TO-DO-LIST";
  const newTask = useRef('');
  const [tasks, setTasks] = useState(() => {
    // kalo data ada                            // jika tidak ada akan mengembalikan array kosong
    return JSON.parse(localStorage.getItem(STORAGE)) || [];
  });

  const [taskCompleted, setTaskCompleted] = useState(0)
  
  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(tasks));
    const complete = tasks.filter((item) => item.completed == true).length;
    setTaskCompleted(complete);
  }, [tasks]);

  function setId() {
    if (tasks == "") {
      return 1;
    } else {
      return tasks[0].id + 1;
    }
  }
  function tambahTask(event) {
    event.preventDefault();
    if (newTask.current.value == "") {
      alert("Please enter a task");
      return false;
    }
    console.log("Task added:", newTask.current.value);

    const data = {
      id: setId(),
      task: newTask.current.value,
      completed: false,
    };

    newTask.current.value = "";
    setTasks([...tasks, data]);
  }

  function setCompleted(id) {
    let taskItem = [];
    tasks.map((item, index) => {
      if (item.id == id) {
        taskItem[index] = { ...item, completed: !item.completed };
      } else {
        taskItem[index] = item;
      }
    });
    setTasks(taskItem);
    console.log(tasks);
  }

  function move(currentIndex, updateIndex) {
    const currentData = tasks[currentIndex];
    const updateData = tasks[updateIndex];

    tasks[currentIndex] = { ...currentData, id: updateData.id };
    tasks[updateIndex] = { ...updateData, id: currentData.id };

    const newData = [...tasks];
    setTasks(newData);
    console.log(tasks);
  }

  function remove(id) {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((item) => item.id != id));
    }
  }

  function deleteAll() {
    if (tasks.length === 0) {
      alert("No tasks to delete");
      return;
    }

    const konfirmasi = window.confirm("Are you sure you want to delete all tasks?");
    if (konfirmasi){
      setTasks([]);
    }
  }

  return (
    <div className="page-container">
      <div className="content-wrapper">
      <Form addTask={tambahTask} newTask={newTask} taskCompleted={taskCompleted} tasks={tasks} />
      <Todolist
        deleteAll={deleteAll}
        tasks={tasks}
        setCompleted={setCompleted}
        move={move}
        remove={remove}
      />
      </div>
      
      <Footer />
    </div>
  );
  
}

export default App;
