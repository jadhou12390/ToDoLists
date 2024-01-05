namespace ToDoList.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updated_model : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ToDoTasks", "userId", c => c.Int(nullable: false));
            CreateIndex("dbo.ToDoTasks", "userId");
            AddForeignKey("dbo.ToDoTasks", "userId", "dbo.Users", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ToDoTasks", "userId", "dbo.Users");
            DropIndex("dbo.ToDoTasks", new[] { "userId" });
            DropColumn("dbo.ToDoTasks", "userId");
        }
    }
}
