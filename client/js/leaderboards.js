import '../css/leaderboards.scss';

$(function () {
    let gameModeSelect = $('.form-control[name=gameMode]');
    let platformSelect = $('.form-control[name=platform]');
    let regionSelect = $('.form-control[name=region]');

    $('.form-control[name=gameMode], .form-control[name=platform], .form-control[name=region]').change(function () {
        window.location = '/leaderboards?' + $.param({
            gameMode: gameModeSelect.val(),
            platform: platformSelect.val(),
            region: regionSelect.val()
        });
    });
});
