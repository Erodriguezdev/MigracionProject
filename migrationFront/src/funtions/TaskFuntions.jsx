import axios from "axios";

const API_URL = "http://localhost:5231"; // Replace with your actual API URL

export const getTasks = async (value) => {
  try {
    if (value === undefined || value === null) {
      value = "";
    }

    const response = await axios.get(`${API_URL}/api/tasks?value=${value}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (task) => {
  try {
    if (task != undefined && task != null) {
      task.id = 0;
    }
    const response = await axios.post(`${API_URL}/api/tasks`, task);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};
export const updateTask = async (taskId, updatedTask) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/tasks/${taskId}`,
      updatedTask
    );
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
export const getTaskById = async (taskId) => {
  try {
    const response = await axios.get(`${API_URL}/api/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching task by ID:", error);
    throw error;
  }
};
