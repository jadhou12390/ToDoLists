using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToDoList.Models
{
    public class List
    {
        public int Id { get; set; }
        public string List_name { get; set; }
        public List<ToDoTask> Tasks { get; set; }
    }
}