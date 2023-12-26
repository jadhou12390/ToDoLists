﻿function validate() {
    var username = $('#Username').val();
    var password = $('#Password').val();

    if (username !== "" && password !== "") {
        $.ajax({
            url: '/Login/Auth',
            type: 'POST',
            data: { username: username, password: password },
            success: function (result) {
                console.log(result);
                // Show success notification
                showNotification(result.message, "success");

                // Redirect to the desired page
                window.location.href = '/List/Index';
            },
            error: function (error) {
                console.error(error);
                // Show error notification
                showNotification("Authentication failed. Please check your username and password.", "error");
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
