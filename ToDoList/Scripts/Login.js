// Function to validate user login
function validate() {
    var username = $('#Username').val();
    var password = $('#Password').val();

    if (username !== "" && password !== "") {
        // Show the progress bar
       

        $.ajax({
            url: '/Login/Auth',
            type: 'POST',
            data: { username: username, password: password },
            success: function (result) {
                

                if (result.success) {
                    // Show success notification
                    showNotification(result.message, "success");

                    // Redirect to the desired page after a brief delay
                    $("#progress-bar").show();
                    var rotationDegree = 0;
                    setInterval(function () {
                        rotationDegree = (rotationDegree + 20) % 360;
                        $("#progress-bar").css("transform", "translate(-50%, -50%) rotate(" + rotationDegree + "deg)");
                    }, 50); // You can adjust the rotation speed
                    setTimeout(function () {
                       
                        window.location.href = '/List/Index';
                        $("#progress-bar").hide();
                    }, 5000); // Adjust the delay time as needed
                } else {
                    // Show error notification for user not found
                    showNotification(result.message, "error");
                }
            },
            error: function (error) {
                console.error(error);

                // Show error notification
                showNotification("Authentication failed. Please check your username and password.", "error");
            },
            complete: function () {
                // Hide the progress bar after the action is completed
               
            }
        });
    } else {
        // Show error notification
        showNotification("Username and password are required!", "error");
    }
}


// Function to show notifications
function showNotification(message, type) {
    var notificationContainer = $(".notification-container");

    var alertClass = "alert-info"; // Default to info color
    if (type === "success") {
        alertClass = "alert-success";
    } else if (type === "error") {
        alertClass = "alert-danger";
    }

    var notification = `
        <div class="alert ${alertClass} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `;
    notificationContainer.empty().append(notification);
}
