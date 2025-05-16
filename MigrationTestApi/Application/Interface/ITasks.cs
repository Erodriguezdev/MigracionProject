using Application.Models;

namespace Application.Interface
{
    public interface ITasks
    {
        Task<List<TaskModel>> GetTasks( string value);
        Task<TaskModel> GetTask(int id);
        Task<TaskModel> CreateTask(TaskModel task);
        Task<TaskModel> UpdateTask(int id, TaskModel task);
        Task<bool> DeleteTask(int id);
        Task<bool> TaskExists(int id, string value);
    }
}