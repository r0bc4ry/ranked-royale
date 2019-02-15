import '../css/leaderboards.scss';

$(function () {
    let gameModeSelect = $('.form-control[name=gameMode]');
    let inputTypeSelect = $('.form-control[name=inputType]');
    let regionSelect = $('.form-control[name=region]');

    $('.form-control[name=gameMode], .form-control[name=inputType], .form-control[name=region]').change(function () {
        window.location = '/leaderboards?' + $.param({
            gameMode: gameModeSelect.val(),
            inputType: inputTypeSelect.val(),
            region: regionSelect.val()
        });
    });
});
