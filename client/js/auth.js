import '../css/auth.scss';

// Example starter JavaScript for disabling form submissions if there are invalid fields
$(function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = $('.needs-validation');
    // Loop over them and prevent submission
    forms.each(function (index, form) {
        $(this).submit(function (event) {
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
            $(form).addClass('was-validated');
        });
    });
});
