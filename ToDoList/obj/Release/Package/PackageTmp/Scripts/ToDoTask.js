function update_task(task_id) {
    var task_name = $("#task_name_" + task_id).val();
    var user_id = $("#user_id_" + task_id).val();
    if (task_name != "" && user_id!=null ) {
        var isChecked = $("#check_task_" + task_id).is(':checked').toString();

        $.ajax({
            type: "POST",
            url: "/ToDoList/Edit",
            data: {
                task_id: task_id,
                task_name: task_name,
                userId:user_id,
                isCompleted: isChecked
            },
            success: function (data) {
                console.log(data.success);
                // Show success notification
                showNotification("Task updated successfully!", "success");
            },
            error: function (error) {
                console.error(error);
                // Show error notification
                showNotification("Failed to update task. Please try again.", "error");
            }
        });
    } else {
        // Show error notification
        showNotification("Please enter task name", "error");
    }
}

function insert_task() {
    var txt_task = $("#task_name_0").val();
    var urlParams = new URLSearchParams(window.location.search);
    var id_list = urlParams.get('listId');
    var user_id = $("#users").val();

    if (!id_list) {
        console.error("ListId not found in the URL.");
        return;
    }

    if (txt_task != "") {
        $.ajax({
            type: "POST",
            url: "/ToDoList/Create",
            data: {
                TaskName: txt_task,
                IsCompleted: false,
                ListId: id_list,
                userId: user_id
            },
            success: function (data) {
                if (data.success) {
                    // Fetch all users and update the dropdown list
                    $.ajax({
                        type: "GET",
                        url: "/ToDoList/GetAllUsers",
                        success: function (usersData) {
                            // Generate HTML options for all users
                            var userOptions = usersData.map(user => `<option value="${user.Id}">${user.Username}</option>`).join('');

                            // Update the dropdown list for the newly added task
                            var newUserOption = `<option value="${user_id}" selected>${$("#users option:selected").text()}</option>`;
                            $("#user_id_" + data.id).html(newUserOption + userOptions);
                            var newRow = "<tr>" +
                                "<td><input type='text' id='task_id_" + data.id + "' name='task_id' value='" + data.id + "' class='form-control hidden' readonly /></td>" +
                                "<td><input type='text' id='task_name_" + data.id + "' name='task_name' value='" + txt_task + "' class='form-control' /></td>" +
                                "<td><select name='user_id_' id='user_id_" + data.id + "' class='form-control'>" +
                                newUserOption + userOptions +
                                "</select></td>" +
                                "<td><input type='checkbox' id='check_task_" + data.id + "' " + (data.isCompleted ? 'checked' : '') + " /></td>" +
                                "<td>" +
                                "<div class='btn-group'>" +
                                "<button class='btn btn-upd btn-sm' onclick='update_task(" + data.id + ");'>" +
                                "<i class='fas fa-edit'></i>" +
                                "</button>" +
                                "<button class='btn btn-danger btn-sm ml-2' onclick='remove_task(" + data.id + ");' style='color: white; background-color: #dc3545;'>" +
                                "<i class='fas fa-trash'></i>" +
                                "</button>" +
                                "</div>" +
                                "</td>" +
                                "</tr>";

                            $("#rows_task").append(newRow);

                            // Clear the input field
                            $("#task_name_0").val("");

                            // Show success notification
                            showNotification("Task added successfully!", "success");
                        },
                        error: function (xhr, status, error) {
                            console.error(xhr.responseText);
                            console.error("Status: " + status);
                            console.error("Error: " + error);
                        }
                    });
                } else {
                    console.error(data.message);
                    // Show error notification
                    showNotification("Failed to add task. Please try again.", "error");
                }
            },
            error: function (xhr, status, error) {
                console.error(xhr.responseText);
                console.error("Status: " + status);
                console.error("Error: " + error);
                // Show error notification
                showNotification("Failed to add task. Please try again.", "error");
            }
        });
    } else {
        // Show error notification
        showNotification("Please enter a task name", "error");
    }
}

function remove_task(id_task) {
    $.ajax({
        type: "POST",
        url: "/ToDoList/Delete",
        data: {
            Id: id_task
        },
        success: function (data) {
            $("#task_id_" + id_task).closest('tr').remove();
            // Show success notification
            showNotification("Task deleted successfully!", "success");
        },
        error: function (error) {
            console.error(error);
            // Show error notification
            showNotification("Failed to delete task. Please try again.", "error");
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

    notificationContainer.empty().append(notification);
}
