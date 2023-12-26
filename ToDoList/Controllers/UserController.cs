using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using System.Web.Mvc;
using ToDoList.Models;

namespace ToDoList.Controllers
{
    public class UserController : Controller
    {
        private readonly AppDbContext _context;
        public UserController()
        {
            _context = new AppDbContext();
        }
        // GET: User
        public ActionResult Index()
        {
            var users = _context.User.ToList();
            return View("UsersView",users);
        }
        [HttpPost]
        public ActionResult ADD(string username,string password,string role)

        {
            try
            {
                // Find the user by username
                var user = _context.User.SingleOrDefault((u => u.Username == username));

                if (user == null)
                {

                    //username not found 
                    var new_user = new User
                    {
                        Username = username,
                        Password = password,
                        Role = role
                    };

                    _context.User.Add(new_user);
                    _context.SaveChanges();

                    return Json(new { success = true, id = new_user.Id, added_username = username, added_password = password, added_role = role, message = "User inserted successfully" });
                   


                }
                else
                {
                    //username exist
                    return Json(new { success = false, message = "Username aleardy exist" });
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                return Json(new { success = false, message = "An error occurred during authentication" });
            }

          
        }
        [HttpPost]
        public ActionResult Delete(int user_id)
        {
            try
            {
                // Your update logic here
                // For example, you might use a service or repository to update the student in the database
                // Make sure to implement proper error handling and validation as needed

                // Sample update logic
                var userToDelete = _context.User.Find(user_id);
                if (userToDelete != null)
                {
                    _context.User.Remove(userToDelete);
                    _context.SaveChanges();

                    return Json(new { success = true, message = "User Deleted successfully" });
                }
                else
                {
                    return Json(new { success = false, message = "User not found" });
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                return Json(new { success = false, message = "An error occurred while updating the student" });
            }
        }
    }
}