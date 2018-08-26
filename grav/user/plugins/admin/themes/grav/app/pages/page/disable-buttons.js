import $ from 'jquery';

$('.disable-after-click').on('click', function() {
    $(this).addClass('pointer-events-disabled');
});
