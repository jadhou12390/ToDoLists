using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ToDoList.Models
{
    public class AppDbContext : DbContext
    {

        public DbSet<ToDoTask> ToDoTasks { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<List> List { get; set; }
        public AppDbContext() : base("my_connection")
        {
            // YourDatabaseConnectionString should match the name in your connectionStrings section in web.config
        }
    }
}