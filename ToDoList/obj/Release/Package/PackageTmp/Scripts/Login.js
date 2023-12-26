function validate() {
    // Check if the form is valid

    // Form is valid, submit the form using AJAX
    var username = $('#Username').val();
    var password = $('#Password').val();
    if (username != "" && password != "") {

        $.ajax({
            url: '/Login/Auth', // Change the URL to match your controller action
            type: 'POST',
            data: { username: username, password: password },
            success: function (result) {
                // Handle the AJAX success response
                console.log(result);
                
                alert(result.message + "   ");
                window.location.href = '/List/Index';
            },
            error: function (error) {
                // Handle the AJAX error response
                console.error(error);
            }
        });

    } else {
        alert("username and password are required!");
    }
}