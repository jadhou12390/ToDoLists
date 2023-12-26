function save_list() {
    var list_name = $("#list_name_0").val();
    if (list_name != "") {
        $.ajax({
            type: "POST",
            url: "/List/ADD",
            data: {
                list_name: list_name
            },
            success: function (data) {
                if (data.success) {
                    var newCard = document.createElement("div");
                    newCard.classList.add("col-md-4");

                    // Assuming that data.list contains the newly added list details
                    newCard.innerHTML = `
                        <div class="card custom-card">
                            <div class="card-body" id="list_${data.id}" style="height: 150px; overflow: hidden;">
                                <h5 class="card-title">${data.id}</h5>
                                <p class="card-text">${data.added_name}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <a href="/ToDoList/index?listId=${data.id}" class="btn btn-view">
                                        <i class="fas fa-eye"></i>
                                    </a>
                                    <button class="btn btn-del" id="btn_delete" onclick="remove_list(${data.id});" @status>
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;

                    // Get the existing "newCard" element
                    var existingCard = document.getElementById("newCard");

                    // Insert the new card before the existing "newCard" element
                    existingCard.parentNode.insertBefore(newCard, existingCard);
                    $("#list_name_0").val("");

                    // Show success notification
                    showNotification("List added successfully!", "success");
                } else {
                    // Show error notification
                    showNotification("Failed to add list. Please try again.", "error");
                }
            },
            error: function (error) {
                console.error(error);
            }
        });
    } else {
        // Show error notification
        showNotification("Please enter list name", "error");
    }
}

// Toggle sidebar
$(document).ready(function () {
    $("#sidebarToggle").click(function () {
        $(".sidebar").toggle();
    });
});

function logout() {
    window.location.href = "/Login/Logout";
}

function remove_list(id) {
    $.ajax({
        type: "POST",
        url: "/List/Delete",
        data: {
            list_id: id
        },
        success: function (data) {
            if (data.success) {
                $("#list_" + id).closest(".col-md-4").fadeOut("slow", function () {
                    $(this).remove();
                });

                // Show success notification
                showNotification("List deleted successfully!", "success");
            } else {
                // Show error notification
                showNotification("Failed to delete list. Please try again.", "error");
            }
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
