import '../css/profile.scss';

$(function () {
    $('#connect-modal').on('show.bs.modal', function () {
        $('#connect-modal-step-1').removeClass('d-none');
        $('#connect-modal-step-2').addClass('d-none');
    });
    $('#connect-modal .modal-footer .btn-primary').click(onConnectContinue);
    $('#connect-modal-step-2 .form-control[name=code]').keypress(onConnectCodeKeypress);
});

function onConnectContinue(event) {
    event.preventDefault();

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
            return;
        }

        let button = $(this);
        let buttonHtml = button.html();
        button.html('<span class="spinner-border spinner-border-sm"></span> Loading...');
        button.attr('disabled', true);

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

function onConnectCodeKeypress(event) {
    let code = event.keyCode || event.which;
    if (code === 13) {
        onConnectContinue(event);
    }
}
