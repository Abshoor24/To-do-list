

function form(props) {
  return (
    <div className="wrapper">

        <header>
            <h3> 🔰 To-do list</h3><span>{props.taskCompleted || '0'} / {props.tasks.length} </span>
        </header>

        <form className="input-box">
            <input type="text" ref={props.newTask} placeholder="Add a new task..." />
            <button type="submit" onClick={props.addTask}>Add Tasks</button>
        </form>

    </div>
  )
}

export default form