using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ToDoList.Models;

namespace ToDoList.Controllers
{
    public class ListController : Controller
    {
        private readonly AppDbContext _context;
        public ListController()
        {
            _context = new AppDbContext();
        }
        // GET: List
        public ActionResult Index()
        {
            var List = _context.List.ToList();
            return View("ListView",List);
        }
        [HttpPost]
        public ActionResult ADD(string list_name)
        {
            try
            {
                // Your insert logic here
                // For example, you might use a service or repository to insert the student into the database
                // Make sure to implement proper error handling and validation as needed

                // Sample insert logic
                var list = new List
                {
                    List_name = list_name
                };

                _context.List.Add(list);
                _context.SaveChanges();

                return Json(new { success = true, id = list.Id,added_name=list_name, message = "List inserted successfully" });
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                return Json(new { success = false, message = "An error occurred while inserting the List" });
            }
        }
        [HttpPost]
        public ActionResult Delete(int list_id)
        {


            try
            {
                // Your update logic here
                // For example, you might use a service or repository to update the student in the database
                // Make sure to implement proper error handling and validation as needed

                // Sample update logic
                var lisToDelete = _context.List.Find(list_id);
                if (lisToDelete != null)
                {
                    _context.List.Remove(lisToDelete);
                    _context.SaveChanges();

                    return Json(new { success = true, message = "List Deleted successfully" });
                }
                else
                {
                    return Json(new { success = false, message = "List not found" });
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                return Json(new { success = false, message = "An error occurred while deleting the list" });
            }


        }
    }
}