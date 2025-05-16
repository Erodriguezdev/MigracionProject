// src/App.jsx
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import {
  getTasks,
  deleteTask,
  updateTask,
  createTask,
} from "./funtions/TaskFuntions";
import Dialog from "./Componets/Dialog";
import "./App.css";

function App() {
  const [datos, setDatos] = useState([]); // State for fetched tasks
  const [value, setValue] = useState(""); // State for input value
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog visibility
  const [editTask, setEditTask] = useState(null); // Task being edited

  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTasks(value); // Fetch tasks
      setDatos(data); // Update state with fetched data
      console.log(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to fetch tasks. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (task) => {
    setEditTask(task); // Set the task to edit
    setIsDialogOpen(true); // Open the dialog
  };

  const handleSave = async (taskData) => {
    setLoading(true);
    setError(null);
    try {
      if (editTask) {
        // Update existing task
        const updated = await updateTask(editTask.id, taskData);
        setDatos((prev) =>
          prev.map((task) => (task.id === updated.id ? updated : task))
        );
      } else {
        // Create new task
        const newTask = await createTask(taskData);
        setDatos((prev) => [...prev, newTask]);
      }
      setIsDialogOpen(false); // Close dialog
      setEditTask(null); // Clear edit task
    } catch (error) {
      console.error("Error saving task:", error);
      setError(
        `Failed to ${editTask ? "update" : "create"} task. Please try again.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditTask(null);
  };

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date)) return "";
    return date.toISOString().slice(0, 10);
  }

  return (
    <>
      <div>
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>Migración Task Maintain</h1>
      <div className="card">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        &nbsp;&nbsp;
        <button onClick={getData}>Fetch Tasks</button>
        &nbsp;&nbsp;
        <button onClick={() => setIsDialogOpen(true)}>Add Task</button>
        {loading && <div className="loading">Loading...</div>}
        {error && <div className="error">{error}</div>}
        <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b border-r border-gray-300">
                ID
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b border-r border-gray-300">
                Title
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b border-r border-gray-300">
                Description
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b border-r border-gray-300">
                Done
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b border-r border-gray-300">
                Date
              </th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b border-gray-300">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {datos.length === 0 && !loading && !error && (
              <tr>
                <td
                  colSpan={6}
                  className="text-center py-4 text-gray-500 border-b border-gray-300"
                >
                  No tasks available
                </td>
              </tr>
            )}
            {datos.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-600 border-b border-r border-gray-300">
                  &nbsp;
                  {item.id}
                  &nbsp;
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b border-r border-gray-300">
                  &nbsp;&nbsp;
                  {item.title} &nbsp;&nbsp;
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b border-r border-gray-300">
                  &nbsp;&nbsp;
                  {item.description}
                  &nbsp;&nbsp;
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b border-r border-gray-300">
                  &nbsp;&nbsp;
                  {item.isDone ? "Yes" : "No"}
                  &nbsp;&nbsp;
                </td>
                <td className="px-4 py-2 text-sm text-gray-600 border-b border-r border-gray-300">
                  &nbsp;&nbsp;
                  {formatDate(item.dueDate)}
                  &nbsp;&nbsp;
                </td>
                <td className="px-4 py-2 flex space-x-2 border-b border-gray-300">
                  &nbsp;&nbsp;
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  &nbsp;&nbsp;&nbsp;
                  <button
                    onClick={() => deleteTask(item.id).then(() => getData())}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isDialogOpen && (
        <Dialog
          task={editTask}
          onSave={handleSave}
          onClose={handleCloseDialog}
        />
      )}
    </>
  );
}

export default App;
