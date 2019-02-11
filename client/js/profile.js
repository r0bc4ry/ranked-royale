import '../css/profile.scss';

$(function () {
    $('#connect-modal').on('show.bs.modal', function () {
        $('#connect-modal-step-1').removeClass('d-none');
        $('#connect-modal-step-2').addClass('d-none');
    });
    $('#connect-modal .modal-footer .btn-primary').click(onConnectContinue);
});

function onConnectContinue(event) {
    if ($('#connect-modal-step-1').is(":visible")) {
        $('#connect-modal-step-1').addClass('d-none');
        $('#connect-modal-step-2').removeClass('d-none');
    } else {
        let alert = $('#connect-modal .alert.alert-danger');
        alert.addClass('d-none');

        let form = $('.needs-validation').get(0);
        let isValid = form.checkValidity();
        $(form).addClass('was-validated');
        if (isValid === false) {
            return event.preventDefault();
        }

        let button = $(this);
        let buttonHtml = button.html();
        button.html('<span class="spinner-border spinner-border-sm"></span> Loading...');
        button.attr('disabled', true);

        // TODO
        $.post('/api/connections/epic', $('.needs-validation').serialize(), function (response) {
            location.reload();
        }).fail(function (response) {
            button.html(buttonHtml);
            button.attr('disabled', false);
            alert.text(response.responseJSON.message ? response.responseJSON.message : 'Uh-oh! An error occurred.');
            alert.removeClass('d-none');
        });
    }
}
