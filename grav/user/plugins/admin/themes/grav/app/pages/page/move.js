import $ from 'jquery';

$('[data-page-move] button[name="task"][value="save"]').on('click', function() {
    let route = $('form#blueprints:first select[name="data[route]"]');
    let moveTo = $('[data-page-move] select').val();

    if (route.length && route.val() !== moveTo) {
        let selectize = route.data('selectize');
        route.val(moveTo);

        if (selectize) selectize.setValue(moveTo);
    }
});
