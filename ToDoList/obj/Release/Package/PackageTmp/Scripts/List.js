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
                    newCard.classList.add("col-md-3");

                    // Assuming that data.list contains the newly added list details
                    newCard.innerHTML = `
        <div class="card custom-card">
            <div class="card-body" id="list_${data.id}">
                <h5 class="card-title">${data.id}</h5>
                <p class="card-text">${data.added_name}</p>
                <a href="/ToDoList/index?listId=${data.id}" class="btn btn-primary">View Task</a>
                <button class="btn btn-danger mt-3" id="btn_delete" onclick="remove_list(${data.id});" @status >Delete</button>
            </div>
        </div>
        `;

                    // Get the existing "newCard" element
                    var existingCard = document.getElementById("newCard");

                    // Insert the new card before the existing "newCard" element
                    existingCard.parentNode.insertBefore(newCard, existingCard);
                    $("#list_name_0").val("");
                }
                console.log(data.success);
            },
            error: function (error) {
                console.error(error);
            }
        });
    } else {
        alert("please enter list name");
    }
    

}
// Toggle sidebar
$(document).ready(function () {
    $("#sidebarToggle").click(function () {
        $(".sidebar").toggle();
    });
});



