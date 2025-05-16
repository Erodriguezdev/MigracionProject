
using Application.Interface;
using Application.Models;
using Microsoft.AspNetCore.Mvc;

namespace MigrationTestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {

        private readonly ITasks _tasks;
        public TasksController(ITasks tasks)
        {
            _tasks = tasks;
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks(string value)
        {
            try
            {
                var tasks = await _tasks.GetTasks(value);
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet("{Id}")]
        public async Task<IActionResult> GetTask(int Id)
        {
            try
            {
                var tasks = await _tasks.GetTask(Id);
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        public async Task<IActionResult> PostTask([FromBody] TaskModel task)
        {
            try
            {
                var tasks = await _tasks.CreateTask(task);
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{Id}")]
        public async Task<IActionResult> PutTask(int Id, [FromBody] TaskModel task)
        {
            try
            {
                var tasks = await _tasks.UpdateTask(Id, task);
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteTask(int Id)
        {
            try
            {
                var tasks = await _tasks.DeleteTask(Id);
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}