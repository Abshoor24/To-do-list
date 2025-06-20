import { useState } from "react";

export default function Form({ addTask, taskCompleted, tasks, getEmoji }) {
  // state lokal untuk emoji dan teks
  const [emoji, setEmoji] = useState("");
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    addTask(emoji, text);
    // reset setelah submit
    setEmoji("");
    setText("");
  };

  return (
    <div className="wrapper">
      <header>
        <div className="title-section">
          <h3> {getEmoji()} TO-DO LIST</h3>
          <p className="subtitle">"Small steps, big goals."</p>
        </div>
        <div className="stats-box">
          <span>✅ {taskCompleted}</span>
          <span>/</span>
          <span>📝 {tasks.length}</span>
        </div>
      </header>

      <form className="input-box" onSubmit={onSubmit}>
        {/* Select emoji di dalam input */}
        <select
          className="emoji-picker"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
        >
          <option value="🙂">🙂</option>
          <option value="🎯">🎯</option>
          <option value="📌">📌</option>
          <option value="💡">💡</option>
          <option value="📚">📚</option>
          <option value="🎮">🎮</option>
        </select>

        <input
          type="text"
          className="task-input"
          placeholder="Add a new task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button type="submit" className="add-btn">+</button>
      </form>
    </div>
  );
}
