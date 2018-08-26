import $ from 'jquery';

$('[data-remodal-target="delete"]').on('click', function() {
    let confirm = $('[data-remodal-id="delete"] [data-delete-action]');
    let link = $(this).data('delete-url');

    confirm.data('delete-action', link);
});

$('[data-delete-action]').on('click', function() {
    let remodal = $.remodal.lookup[$('[data-remodal-id="delete"]').data('remodal')];

    global.location.href = $(this).data('delete-action');
    remodal.close();
});
