import {useRef, useState} from 'react';
import './App.css';
import Form from './Components/form'
import Todolist from './Components/todolist';
function App() {

const newTask = useRef('');
const [tasks, setTasks] = useState([]);

function setId() {
  const jumlahTask = tasks.length;
  return jumlahTask + 1;
}

  function tambahTask(event) {
    event.preventDefault();
    if (newTask.current.value == '') {
      alert('Please enter a task');
      return false
    }
    console.log('Task added:', newTask.current.value);

    const data ={
    id : setId(),
    task: newTask.current.value,
    completed: false

    }

    newTask.current.value = ''
     setTasks([...tasks, data]);
  }

  function setCompleted(id) {
    let taskItem = [];
    tasks.map((item, index) => {
      if (item.id == id) {
        taskItem[index]={...item, completed: !item.completed};
      }else {
        taskItem[index] = item;
      }

    })
    setTasks(taskItem);
      console.log(tasks);
  }
  

  return (
    <>

      <Form addTask={tambahTask} newTask={newTask}/>
      <Todolist tasks={tasks} setCompleted={setCompleted} />

    </>
  )
}



export default App