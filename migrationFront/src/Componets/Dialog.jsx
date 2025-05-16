// src/Componets/Dialog.jsx
import { useState, useEffect } from "react";
import "./Dialog.css"; // Optional: Create a CSS file for styling

function Dialog({ task, onSave, onClose }) {
  const [formData, setFormData] = useState({
    id: task?.id || "",
    title: task?.title || "",
    description: task?.description || "",
    isDone: task?.isDone || false,
    dueDate: task?.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        id: task.id,
        title: task.title,
        description: task.description,
        isDone: task.isDone,
        dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 10) : "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog">
        <h2>{task ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                name="isDone"
                checked={formData.isDone}
                onChange={handleChange}
              />
              Done
            </label>
          </div>
          <div className="form-group">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
          <div className="dialog-actions">
            <button type="submit" className="save-btn">
              Save
            </button>
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dialog;