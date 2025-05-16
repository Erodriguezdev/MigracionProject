using System.ComponentModel.DataAnnotations;

namespace Application.Models
{
    public class TaskModel
    {
        public int Id { get; set; } = 0;
        [Required(ErrorMessage = "Title is required")]
        [StringLength(200, ErrorMessage = "Title cannot be longer than 100 characters")]
        public string Title { get; set; } = null!;

        [StringLength(200, ErrorMessage = "Title cannot be longer than 100 characters")]
        public string Description { get; set; }

        public bool IsDone { get; set; }
        [Required(ErrorMessage = "Due date is required")]
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DueDate { get; set; }
    }
}