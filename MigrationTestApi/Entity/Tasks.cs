

using System.ComponentModel.DataAnnotations;

namespace Entity
{
    public class Tasks
    {
        [Key]
        public int Id { get; set; }
        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; } = null!;
        public string? Description { get; set; } 
        [Required(ErrorMessage = "Priority is required")]
        public bool IsDone { get; set; }
        [Required(ErrorMessage = "Due date is required")]
        public DateTime DueDate { get; set; }

    }
}