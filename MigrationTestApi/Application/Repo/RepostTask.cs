

using Application.Interface;
using Application.Models;
using Data;
using Microsoft.EntityFrameworkCore;

namespace Application.Repo
{
    public class RepostTask : ITasks
    {
        private readonly ApplicatonDbContext _context;

        public RepostTask(ApplicatonDbContext context)
        {
            _context = context;

        }

        public async Task<List<TaskModel>> GetTasks(string value)
        {
            if (string.IsNullOrEmpty(value))

                value = string.Empty;



            var tasks = await _context.Tasks.AsNoTracking()
                .Where(x => x.Title.ToLower().Contains(value.ToLower()) || x.Description.Contains(value))
                .Select(x => new TaskModel
                {
                    Id = x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    IsDone = x.IsDone,
                    DueDate = x.DueDate
                })
                .ToListAsync();

            return tasks;

        }
        public async Task<TaskModel> GetTask(int id)
        {
            var task = await _context.Tasks.AsNoTracking()
                        .Where(x => x.Id == id)
                        .OrderBy(x => x.Id)
                        .Select(x => new TaskModel
                        {
                            Id = x.Id,
                            Title = x.Title,
                            Description = x.Description,
                            IsDone = x.IsDone,
                            DueDate = x.DueDate
                        })
                        .FirstOrDefaultAsync();

            return task;
        }
        public async Task<TaskModel> CreateTask(TaskModel task)
        {

            if (task == null)
                throw new ArgumentNullException("Invalid Model");

            if (await TaskExists(0, task.Title))
                throw new ArgumentException("Task already exists");

            if (task.DueDate < DateTime.Now)
                throw new ArgumentException("Due date must be greater than today");

            var newTask = new Entity.Tasks
            {
                Title = task.Title,
                Description = task.Description,
                IsDone = task.IsDone,
                DueDate = task.DueDate
            };
            await _context.Tasks.AddAsync(newTask);
            await _context.SaveChangesAsync();

            task.Id = newTask.Id;

            return task;

        }
        public async Task<TaskModel> UpdateTask(int id, TaskModel task)
        {
            if (task == null)
                throw new ArgumentNullException("Invalid Model");

            if (await TaskExists(id, task.Title))
                throw new ArgumentException("Task already exists");

            if (task.DueDate < DateTime.Now)
                throw new ArgumentException("Due date must be greater than today");

            var taskToUpdate = await
                         _context.Tasks.AsNoTracking()
                         .Where(x => x.Id == id)
                         .FirstOrDefaultAsync();

            if (taskToUpdate == null)
                throw new ArgumentNullException("Task not found");

            taskToUpdate.Title = task.Title;
            taskToUpdate.Description = task.Description;
            taskToUpdate.IsDone = task.IsDone;
            taskToUpdate.DueDate = task.DueDate;

            _context.Tasks.Update(taskToUpdate);
            await _context.SaveChangesAsync();

            return task;
        }
        public async Task<bool> DeleteTask(int id)
        {
            var tasks = await _context.Tasks
                .Where(x => x.Id == id)
                .FirstOrDefaultAsync();
            if (tasks == null)
                throw new ArgumentNullException("Task not found");
            _context.Tasks.Remove(tasks);
            await _context.SaveChangesAsync();

            return true;
        }
        public async Task<bool> TaskExists(int id, string value)
        {
            var exist = await _context.Tasks.AsNoTracking()
                .AnyAsync(x => x.Id != id && x.Title.ToLower() == value.ToLower());

            return exist;
        }
    }
}