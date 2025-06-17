import { div } from "framer-motion/client";
import Icon from "./bicon";
import { motion, AnimatePresence } from "framer-motion";

function todolist(props) {
  props.tasks.sort((a, b) => b.id - a.id);

  

  return (
    <div className="wrapper">
      <div className="filter-button">
        <button className={props.filter === "all" ? "active" : ""} onClick={() => props.setFilter("all")}>📋 All</button>
        <button className={props.filter === "all" ? "active" : ""} onClick={() => props.setFilter("completed")}>✅ Completed</button>
        <button className={props.filter === "all" ? "active" : ""} onClick={() => props.setFilter("incomplete")}>❌ Incomplete</button>
      </div>
      <ul>
        <AnimatePresence>
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
            <motion.li
              key={item.id}
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, x: 100}}
              transition={{duration: 0.2}}
            >
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
            </motion.li>
          );
        })}
        </AnimatePresence>
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
