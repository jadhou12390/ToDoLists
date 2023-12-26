function update_task(task_id) {

    var task_name = $("#task_name_" + task_id).val();
    if (task_name != "") {
        var isChecked = "True";

        $('#check_task_' + task_id).each(function () {
            isChecked = $(this).is(':checked');

            if (isChecked) {
                isChecked = "True";
            } else {
                isChecked = "False";
            }
        });
        alert(isChecked);
        $.ajax({

            type: "POST",
            url: "/ToDoList/Edit",
            data: {
                task_id: task_id,
                task_name: task_name,
                isCompleted: isChecked

            },
            success: function (data) {
                console.log(data.success);
            },
            error: function (error) {
                console.error(error);
            }
        });




    } else {
        alert("please enter task name")
    }


}

    function insert_task() {
        var txt_task = $("#task_name_0").val();
        // Extract ListId from the URL
        var urlParams = new URLSearchParams(window.location.search);
        var id_list = urlParams.get('listId');

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
                    IsCompleted: false, // You might adjust this based on your logic
                    ListId: id_list
                },
                success: function (data) {
                    console.log(data);
                    console.log(data.success);
                    if (data.success) {
                        var newRow = "<tr>" +
                            "<td><input type='text' id='task_id_" + data.id + "' name='task_id' value='" + data.id + "' class='form-control hidden' readonly /></td>" +
                            "<td><input type='text' id='task_name_" + data.id + "' name='task_name' value='" + txt_task + "' class='form-control' /></td>" +
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
                        console.log(newRow);
                        $("#rows_task").append(newRow);

                        // Clear the input field
                        $("#task_name_0").val("");
                    } else {
                        console.error(data.message);
                    }
                },
                error: function (xhr, status, error) {
                    console.error(xhr.responseText);
                    console.error("Status: " + status);
                    console.error("Error: " + error);
                }
            });
        } else {
            alert("Please enter a task name");
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
        },
        error: function (error) {
            console.error(error);
        }
    });

}