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

                  /*  var newRow = "<tr>" +
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
                        "</tr>";*/
                    var newPasswordRow = "<tr>" +
                        "<td id='user_id_"+data.id+"'>"+data.id+"</td>" +
                        "<td><input type='text' id='username_" + data.id + "' name='username' value='" + data.added_username + "' class='form-control' /></td>" +
                        "<td>" +
                        "<div class='input-group'>" +
                        "<input type='password' id='password_" + data.id + "' value='" + data.added_password + "' name='password' class='form-control' />" +
                        "<div class='input-group-append'>" +
                        "<span class='input-group-text' style='cursor: pointer;' data-toggle='modal' data-target='#passwordModal_" + data.id + "'>" +
                        "<i class='fas fa-lock'></i>" +
                        "</span>" +
                        "</div>" +
                        "</div>" +
                        "</td>" +
                        updatedRowRole +
                        "<td>" +
                        "<div class='btn-group'>" +
                        "<button class='btn btn-upd btn-sm' onclick='update_user(" + data.id + ");'>" +
                        "<i class='fas fa-edit'></i>" +
                        "</button>" +
                        "<button class='btn btn-danger btn-sm ml-2' onclick='remove_user(" + data.id + ");' style='color: white; background-color: #dc3545;'>" +
                        "<i class='fas fa-trash'></i>" +
                        "</button>" +
                        "</div>" +
                        "</td>" +
                        "</tr>";
                    // Modal structure for each user
                  var modalStructure = "<div class='modal fade' id='passwordModal_" + data.id + "' tabindex='-1' role='dialog' aria-labelledby='passwordModalLabel_" + data.id + "' aria-hidden='true'>" +
                        "<div class='modal-dialog' role='document'>" +
                        "<div class='modal-content'>" +
                        "<div class='modal-header'>" +
                        "<h5 class='modal-title' id='passwordModalLabel_" + data.id + "'>Password Modal</h5>" +
                        "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>" +
                        "<span aria-hidden='true'>&times;</span>" +
                        "</button>" +
                        "</div>" +
                        "<div class='modal-body'>" +
                        "<p class='password-info'>Password for user " + data.added_username + ": " + data.added_password + "</p>" +
                        "</div>" +
                        "<div class='modal-footer'>" +
                        "<button type='button' class='btn btn-secondary' data-dismiss='modal'>Close</button>" +
                        "</div>" +
                        "</div>" +
                        "</div>" +
                        "</div>";
                    $("#rows_user").append(newPasswordRow);
                    $("body").append(modalStructure);
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
function update_user(id_user) {
    var username = $("#username_" + id_user).val();
    var role = $("#role_" + id_user).val();   
    var password = $("#password_" + id_user).val();
    if (username != "" && password != "" && role != "") {


        $.ajax({
            type: "POST",
            url: "/User/Edit",
            data: {
                user_id: id_user,
                username: username,
                password: password,
                role: role
            },
            success: function (data) {

                if (data.success) {
                    // Show success notification
                    showNotification("User Updated successfully!", "success");
                   $("#value_for_" + id_user).empty();
                    $("#value_for_" + id_user).append("Password for user <b>" + data.new_username + "</b>: " + data.new_password);
                } else {
                    showNotification("Failed To Update!", "danger");
                }
               
            },
            error: function (error) {
                console.error(error);
            }

            });

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

    notificationContainer.append(notification);
}
