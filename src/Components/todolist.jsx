import Icon from "./bicon";
import { motion, AnimatePresence } from "framer-motion";

function todolist(props) {
  props.tasks.sort((a, b) => b.id - a.id);

  return (
    <div className="wrapper">
      {/* Filter Buttons */}
      <div className="filter-button">
        <button
          className={props.filter === "all" ? "active" : ""}
          onClick={() => props.setFilter("all")}
        >
          📋 All
        </button>
        <button
          className={props.filter === "completed" ? "active" : ""}
          onClick={() => props.setFilter("completed")}
        >
          ✅ Completed
        </button>
        <button
          className={props.filter === "incomplete" ? "active" : ""}
          onClick={() => props.setFilter("incomplete")}
        >
          ❌ Incomplete
        </button>
      </div>

      {/* List of Tasks */}
      <ul>
        <AnimatePresence>
          {props.tasks.map((item) => {
            let radioCompleted = item.completed ? "✅" : "◻️";
            let classCompleted = item.completed ? "strike" : "";

            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.25 }}
                layout // optional: gives smoother layout transition
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

      {/* Delete All Button */}
      {props.tasks.length > 0 && (
        <div className="delete-all-wrapper">
          <button className="delete-all-btn" onClick={props.handleDeleteAllClick}>
            Delete All
          </button>
        </div>
      )}
    </div>
  );
}

export default todolist;
