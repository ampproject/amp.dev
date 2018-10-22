import $ from 'jquery';

$(document).on('click', '.dz-unset', function() {
    $(this).closest('.dz-image-preview').remove();
    const file_upload = $('.files-upload');
    const unset_image = $(this).closest('.dz-image-preview').find('[data-dz-name]').text().trim();
    const images = JSON.parse(file_upload.find('input[data-grav-field="hidden"]').val()) || {};
    let image_array = {};
    $.each(images, function(ind, obj) {
        if (!ind.endsWith(unset_image)) {
            image_array[ind] = obj;
        }
    });
    file_upload.find('input[data-grav-field="hidden"]').val(JSON.stringify(image_array));
});
