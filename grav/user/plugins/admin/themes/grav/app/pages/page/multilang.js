import $ from 'jquery';

$('[name="task"][value="saveas"], [name="task"][value="switchlanguage"]').on('mousedown touchstart', (event) => {
    let fields = ['lang', 'redirect'];
    let element = $(event.currentTarget);
    let form = $(`#${element.attr('form')}`);

    if (!form.length) { return; }
    fields.forEach((field) => {
        let value = element.attr(field);
        if (!value) { return; }
        let input = form.find(`[name="data[${field}]"]`);
        if (!input.length) {
            input = $(`<input type="hidden" name="data[${field}]" value="" />`);
            form.append(input);
        }

        input.val(value);
    });

    return true;
});
