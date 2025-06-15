import Icon from "./bicon";

function todolist(props) {
  props.tasks.sort((a, b) => b.id - a.id);

  

  return (
    <div className="wrapper">
      <ul>
        {props.tasks.map((item) => {
          let radioCompleted = "";
          let classCompleted = "";
          if (item.completed == false) {
            radioCompleted = "◻️";
          } else {
            radioCompleted = "✅";
            classCompleted = "strike";
          }

          return (
            <li key={item.id}>
              <div className="left">
                <button onClick={() => props.setCompleted(item.id)}>
                  {radioCompleted}
                </button>
              </div>
              <div className={`center ${classCompleted}`}>{item.task}</div>
              <div className="right">
                <Icon
                  deleteAll={props.deleteAll}
                  id={item.id}
                  tasks={props.tasks}
                  move={props.move}
                  remove={props.remove}
                />
              </div>
            </li>
          );
        })}
      </ul>
      {props.tasks.length > 0 && (
        <div className="delete-all-wrapper">
          <button
            className="delete-all-btn"
            onClick={props.handleDeleteAllClick}
          >
            Delete All
          </button>
        </div>
    )}

      </div>
  );
}

export default todolist;
