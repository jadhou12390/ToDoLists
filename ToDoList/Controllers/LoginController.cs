using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using ToDoList.Models;

namespace ToDoList.Controllers
{
    public class LoginController : Controller
    {
        private readonly AppDbContext _context;
        public LoginController()
        {
            _context = new AppDbContext();
        }
        // GET: Login
        public ActionResult Index()
        {
            return View("LoginView");
        }
        public ActionResult Logout()
        {
            // Clear session variables or perform any necessary cleanup
            Session.Clear();
            Session.Abandon(); // Abandon the session
            // Optionally, sign out the user if you are using authentication
            // For example, if you are using Forms Authentication:
            FormsAuthentication.SignOut();

            return View("LoginView");


        }
        [HttpPost]
        public ActionResult Auth(string username, string password)
        {
            try
            {
                // Find the user by username
                var user = _context.User.SingleOrDefault((u => u.Username == username && u.Password == password));

                if (user != null)
                {
                    // Check if the password matches (Note: In a real-world scenario, you should use secure password hashing)
                    Session["UserId"] = user.Id;
                    Session["Username"] = user.Username;
                    Session["role"] = user.Role;
                    // Authentication successful
                    // You might want to set authentication cookies, session variables, or any other mechanism to track the authenticated user
                    // For simplicity, let's assume authentication is successful, and return a success message
                    return Json(new { success = true, message = "Authentication successful",role=user.Role,id=user.Id,username=user.Username });
                  

                }
                else
                {
                    return Json(new { success = false, message = "User not found" });
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                return Json(new { success = false, message = "An error occurred during authentication" });
            }
        }
    }
}