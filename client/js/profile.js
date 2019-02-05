import '../css/profile.scss';

$(function () {
    $('#connect-modal .modal-footer .btn-primary').click(onConnectContinue);
});

function onConnectContinue(event) {
    let form = $('.needs-validation').get(0);
    let isValid = form.checkValidity();
    if (isValid === false) {
        event.preventDefault();
        event.stopPropagation();
    }
    $(form).addClass('was-validated');

    if (isValid === false) {
        return;
    }

    // TODO
    $.post('/api/connections/epic', $('.needs-validation').serialize(), function (data) {
        console.log(data);
    });
}
