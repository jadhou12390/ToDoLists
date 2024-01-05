﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ToDoList.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role {get; set; }
      
        public List<ToDoTask> Tasks { get; set; }
    }
}