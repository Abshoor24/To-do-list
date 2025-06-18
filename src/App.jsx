import { useRef, useState, useEffect } from "react";
import "./App.css";
import Form from "./Components/form";
import Todolist from "./Components/todolist";
import Footer from "./Components/Footer";
import ConfirmDialog from './Components/ConfirmDialog';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogCallback, setDialogCallback] = useState(() => {});
  const STORAGE = "TO-DO LIST";
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

  const handleDeleteALLCLick = () => {
    if (tasks.length === 0) {
      alert("No tasks to delete");
      return;
    }
    setShowDialog(true);
    setDialogCallback(() => () => {
      setTasks([]);
      setShowDialog(false);
      toast.warn("🧹 Semua task telah dihapus!");
    });
  }

  const cancelDialog = () => {
  setShowDialog(false);
};

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
    toast.success(`✅ Task "${data.task}" berhasil ditambahkan!`);
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
    toast.info("📌 Status task diperbarui.");
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
      toast.error("🗑️ Task berhasil dihapus!");
    }
  }

  const [filter, setFilter] = useState("all");

  const getFilteredTasks = () => {
    if (filter === "completed"){
      return tasks.filter((task) => task.completed);
    } else if (filter === "incomplete") {
      return tasks.filter((task) => !task.completed);
    }
    return tasks;
  }

  function getEmoji() {
  if (taskCompleted === 0) return "📝";
  if (taskCompleted === tasks.length) return "🎉";
  return "🚀";
}


const updateTask = (id, newText) => {
  const updatedTasks = tasks.map(tasks => 
    tasks.id === id ? { ...tasks, task: newText } : tasks
  );
  setTasks(updatedTasks);
  toast.info("📝 Task berhasil diperbarui!");
}


  return (
    <div className="page-container">
      <div className="content-wrapper">
      <Form addTask={tambahTask} newTask={newTask} taskCompleted={taskCompleted} tasks={tasks} getEmoji={getEmoji}/>
      <Todolist
        updateTask={updateTask}
        handleDeleteAllClick={handleDeleteALLCLick}
        tasks={getFilteredTasks()}
        setFilter={setFilter}
        setCompleted={setCompleted}
        move={move}
        remove={remove}
      />
      </div>
      {showDialog && (
      <ConfirmDialog
        message="Are you sure you want to delete all tasks?"
        onConfirm={dialogCallback}
        onCancel={cancelDialog}
      />
    )}
    <ToastContainer position="top-right" autoClose={800} theme="dark" />
      <Footer />
    </div>
  );
  
}

export default App;
