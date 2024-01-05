using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToDoList.Models
{
    public class ToDoTask
    {
        public int Id { get; set; }
        public string TaskName { get; set; }
        public int userId { get;set; }
        public bool IsCompleted { get; set; }
        // Foreign key to associate the task with a list
        public int ListId { get; set; }

        // Navigation property to represent the list associated with this task
        public List List { get; set; }
        public User User { get; set; }
    }
}