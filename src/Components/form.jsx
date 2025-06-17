

function form(props) {
  return (
    <div className="wrapper">

       <header>
        <div className="title-section">
          <h3> {props.getEmoji()} To-do list</h3>
          <p className="subtitle">Stay focused. One task at a time.</p>
        </div>
        <div className="stats-box">
          <span>✅ {props.taskCompleted}</span>
          <span>/</span>
          <span>📝 {props.tasks.length}</span>
        </div>
      </header>


        <form className="input-box">
            <input type="text" ref={props.newTask} placeholder="Add a new task..." />
            <button type="submit" onClick={props.addTask}>+</button>
        </form>

    </div>
  )
}



export default form