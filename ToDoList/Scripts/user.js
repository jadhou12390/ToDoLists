// Function to insert a new user
function insert_user() {
    var selectedValue;
    var adminRadio = document.getElementById("role_admin_0");
    var userRadio = document.getElementById("role_user_0");

    if (adminRadio && adminRadio.checked) {
        selectedValue = adminRadio.value;
    } else if (userRadio && userRadio.checked) {
        selectedValue = userRadio.value;
    } else {
        // Show error notification
        showNotification("Please select a role", "error");
        return;
    }

    var username = $("#username_0").val();
    var password = $("#password_0").val();

    if (username !== "" && password !== "" && selectedValue !== "") {
        $.ajax({
            type: "POST",
            url: "/User/ADD",
            data: {
                username: username,
                password: password,
                role: selectedValue
            },
            success: function (data) {
                if (data.success) {
                    var updatedRowRole = "";
                    if (data.added_role === "admin") {
                        updatedRowRole = "<td><select name='role' id='role_" + data.id + "' class='form-control'><option value='admin' selected>admin</option><option value='user'>user</option></select></td>";
                    } else if (data.added_role === "user") {
                        updatedRowRole = "<td><select name='role' id='role_" + data.id + "' class='form-control'><option value='admin'>admin</option><option value='user' selected>user</option></select></td>";
                    }

                    var newRow = "<tr>" +
                        "<td><input type='text' id='user_id_" + data.id + "' name='user_id' value='" + data.id + "' class='form-control hidden' readonly /></td>" +
                        "<td><input type='text' id='username_" + data.id + "' name='username' value='" + data.added_username + "' class='form-control' /></td>" +
                        "<td><input type='password' id='password_" + data.id + "' value='" + data.added_password + "' name='password' class='form-control' /></td>" +
                        updatedRowRole +
                        "<td><div class='btn-group'>" +
                        "<button class='btn btn-upd btn-sm' onclick='update_user(" + data.id + ");'>" +
                        "<i class='fas fa-edit'></i>" +
                        "</button>" +
                        "<button class='btn btn-danger btn-sm ml-2' onclick='remove_user(" + data.id + ");' style='color: white; background-color: #dc3545;'>" +
                        "<i class='fas fa-trash'></i>" +
                        "</button>" +
                        "</div>" +
                        "</td>" +
                        "</tr>";

                    $("#rows_user").append(newRow);
                    $("#username_0").val("");
                    $("#password_0").val("");

                    // Show success notification
                    showNotification("User added successfully!", "success");
                } else {
                    // Show error notification
                    showNotification(data.message, "error");
                }
            },
            error: function (error) {
                console.error(error);
            }
        });
    } else {
        // Show error notification
        showNotification("Please enter username and password", "error");
    }
}

// Function to remove a user
function remove_user(id_user) {
    $.ajax({
        type: "POST",
        url: "/User/Delete",
        data: {
            user_id: id_user
        },
        success: function (data) {
            $("#user_id_" + id_user).closest('tr').remove();

            // Show success notification
            showNotification("User deleted successfully!", "success");
        },
        error: function (error) {
            console.error(error);
        }
    });
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

    notificationContainer.append(notification);
}
