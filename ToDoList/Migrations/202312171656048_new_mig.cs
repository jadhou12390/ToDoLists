namespace ToDoList.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class new_mig : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ToDoTasks", "ListId", c => c.Int(nullable: false));
            CreateIndex("dbo.ToDoTasks", "ListId");
            AddForeignKey("dbo.ToDoTasks", "ListId", "dbo.Lists", "Id", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.ToDoTasks", "ListId", "dbo.Lists");
            DropIndex("dbo.ToDoTasks", new[] { "ListId" });
            DropColumn("dbo.ToDoTasks", "ListId");
        }
    }
}
