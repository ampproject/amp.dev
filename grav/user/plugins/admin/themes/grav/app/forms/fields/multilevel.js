import $ from 'jquery';

$(function() {

    const getField = function getField(level, name) {
        let levelMargin = level * 50;
        let top = (level === 0 ? 'top' : '');

        let the_name = 'name="' + name + '"';
        if (level === 0) {
            // top
            the_name = 'data-attr-name="' + name + '"';
        }

        let field = `
            <div class="element-wrapper">
                <div class="form-row array-field-value_only js__multilevel-field ${top}"
                    data-grav-array-type="row">
                    <input
                        type="text"
                        ${the_name}
                        placeholder="Enter value"
                        style="margin-left: ${levelMargin}px"
                        value="" />

                    <span class="fa fa-minus js__remove-item"></span>
                    <span class="fa fa-plus js__add-sibling hidden" data-level="${level}" ></span>
                    <span class="fa fa-plus-circle js__add-children hidden" data-level="${level}"></span>
                </div>
            </div>
        `;

        return field;
    };

    const hasChildInputs = function hasChildInputs($element) {
        if ($element.attr('name')) {
            return false;
        }

        return true;
    };

    const getTopItems = function getTopItems(element) {
        return $(element + ' .js__multilevel-field.top');
    };

    const refreshControls = function refreshControls(unique_identifier) {
        let element = '[data-grav-multilevel-field]';
        if (unique_identifier) {
            element = '[data-grav-multilevel-field][data-id="' + unique_identifier + '"]';
        }

        const hideButtons = function hideButtons() {
            $(element + ' .js__add-sibling').addClass('hidden');
            $(element + ' .js__add-children').addClass('hidden');
        };

        const restoreAddSiblingButtons = function restoreAddSiblingButtons() {
            $(element + ' .children-wrapper').each(function() {
                let elements = $(this).children();
                elements.last().each(function() {
                    let field = $(this);
                    if (!$(this).hasClass('js__multilevel-field')) {
                        field = $(this).find('.js__multilevel-field').first();
                    }
                    field.find('.js__add-sibling').removeClass('hidden');
                });
            });

            // add sibling to the last top element
            $(element + ' .js__multilevel-field.top').last().find('.js__add-sibling').removeClass('hidden');
        };

        const restoreAddChildrenButtons = function restoreAddChildrenButtons() {
            $(element + ' .js__multilevel-field').each(function() {
                if ($(this).siblings('.children-wrapper').length === 0 || $(this).siblings('.children-wrapper').find('.js__multilevel-field').length === 0) {
                    $(this).find('.js__add-children').removeClass('hidden');
                }
            });
        };

        const preventRemovingLastTopItem = function preventRemovingLastTopItem() {
            let top_items = getTopItems(element);
            if (top_items.length === 1) {
                top_items.first().find('.js__remove-item').addClass('hidden');
            }
        };

        hideButtons();
        restoreAddSiblingButtons();
        restoreAddChildrenButtons();
        preventRemovingLastTopItem();
    };

    const changeAllOccurrencesInTree = function($el, current_name, new_name) {
        $el.parents('[data-grav-multilevel-field]').find('input').each(function() {
            let $input = $(this);
            if ($input.attr('name')) {
                $input.attr('name', $input.attr('name').replace(current_name, new_name));
            }
            if ($input.attr('data-attr-name')) {
                $input.attr('data-attr-name', $input.attr('data-attr-name').replace(current_name, new_name));
            }
        });
    };

    $(document).ready(function() {
        refreshControls();
    });

    $(document).on('mouseleave', '[data-grav-multilevel-field]', function(event) {
        let top_items = getTopItems('[data-id="' + $(this).data('id') + '"]');
        let has_top_items_without_children = false;
        let element_content = '';
        top_items.each(function() {
            let item = $(this);
            if ($(item).siblings('.children-wrapper').find('input').length === 0) {
                has_top_items_without_children = true;
                element_content = item.find('input').val();
            }

        });

        if (has_top_items_without_children) {
            if (element_content) {
                alert('Warning: if you save now, the element ' + element_content + ', without children, will be removed, because it\'s invalid YAML');
            } else {
                alert('Warning: if you save now, the top elements without children will be removed, because it\'s invalid YAML');
            }

        }
    });

    $(document).on('click', '[data-grav-multilevel-field] .js__add-children', function(event) {
        let element = $(this);
        let unique_container_id = element.closest('.js__multilevel-field').data('id');
        let level = element.data('level') + 1;

        const getParentOfElement = function getParentOfElement(element) {
            let parent = element.closest('.js__multilevel-field').parent().first();
            if (parent.find('.children-wrapper').length === 0) {
                $(parent).append('<div class="children-wrapper"></div>');
            }
            parent = parent.find('.children-wrapper').first();

            return parent;
        };

        const getNameFromParentInput = function getNameFromParentInput(parentInput, attr) {
            if (parentInput.hasClass('children-wrapper')) {
                parentInput = parentInput.siblings('.js__multilevel-field').first().find('input');
            }

            return parentInput.attr(attr) + '[' + parentInput.val() + ']';
        };

        const getInputFromChildrenWrapper = function getInputFromChildrenWrapper(parentChildrenWrapper) {
            return parentChildrenWrapper.siblings('.js__multilevel-field').first().find('input');
        };

        let parentChildrenWrapper = getParentOfElement(element);
        let parentInput = getInputFromChildrenWrapper(parentChildrenWrapper);

        let attr = 'name';
        if (parentInput.closest('.js__multilevel-field').hasClass('top')) {
            attr = 'data-attr-name';
        }

        parentInput.attr(attr, parentInput.attr(attr).replace('[]', ''));

        let name = getNameFromParentInput(parentInput, attr);
        let field = getField(level, name);

        $(parentChildrenWrapper).append(field);
        refreshControls(unique_container_id);
    });

    $(document).on('click', '[data-grav-multilevel-field] .js__add-sibling', function(event) {
        let element = $(this);
        let unique_container_id = element.closest('.js__multilevel-field').data('id');
        let level = element.data('level');
        element.closest('.children-wrapper').find('.js__add-sibling').addClass('hidden');

        let sibling = null;
        let is_top = false;

        if (element.closest('.js__multilevel-field').hasClass('top')) {
            is_top = true;
        }

        if (is_top) {
            sibling = element.closest('.js__multilevel-field').first().find('input').last();
        } else {
            sibling = element.siblings('input').first();
            if (!sibling) {
                sibling = element.closest('.children-wrapper').first().find('input').last();
            }
        }

        const getParentOfElement = function getParentOfElement(element) {
            let parent = element.closest('.js__multilevel-field').parent().first();
            if (!parent.hasClass('element-wrapper')) {
                if (parent.find('.element-wrapper').length === 0) {
                    $(parent).append('<div class="element-wrapper"></div>');
                }

                parent = parent.find('.element-wrapper').first();
            }

            return parent;
        };

        const getNameFromSibling = function getNameFromSibling(parent, sibling, is_top = false) {
            let name = sibling.attr('name');

            if (hasChildInputs(sibling)) {
                let val = sibling.data('attr-name') + '[]';
                sibling.removeAttr('name');
                return val;
            }

            let last_index = name.lastIndexOf('[');
            let almost_there = name.substr(last_index + 1);
            let last_tag = almost_there.substr(0, almost_there.length - 1);

            if ($.isNumeric(last_tag)) {
                name = name.replace('[' + last_tag + ']', '[' + (parseInt(last_tag, 10) + 1) + ']');
            } else {
                if (is_top) {
                    name = name.replace('[' + last_tag + ']', '');
                } else {
                    name = name + '[1]';

                    // change sibling name attr if necessary
                    if (sibling.attr('name').slice('-2') !== '[0]') {
                        changeAllOccurrencesInTree(sibling, sibling.attr('name'), sibling.attr('name') + '[0]');
                    }
                }
            }

            return name;
        };

        let parent = getParentOfElement(element);
        let name = getNameFromSibling(parent, sibling, is_top);

        let field = getField(level, name);
        $(field).insertAfter(parent);

        refreshControls(unique_container_id);
    });

    $(document).on('click', '[data-grav-multilevel-field] .js__remove-item', function(event) {
        $(this).parents('.element-wrapper').first().remove();
        let unique_container_id = $(this).closest('.js__multilevel-field').data('id');
        refreshControls(unique_container_id);
    });

    // Store old value before editing a field
    $(document).on('focusin', '[data-grav-multilevel-field] input', function(event) {
        $(this).data('current-value', $(this).val());
    });

    // Handle field edited event
    $(document).on('change', '[data-grav-multilevel-field] input', function(event) {
        let $el = $(this);
        let old_value = $el.data('current-value');
        let new_value = $el.val();

        let full_name = $el.attr('name') || $el.attr('data-attr-name'); // first-level items have `data-attr-name` instead of `name`

        let old_name_attr = full_name + '[' + old_value + ']';
        let new_name_attr = full_name + '[' + new_value + ']';

        changeAllOccurrencesInTree($el, old_name_attr, new_name_attr);
    });

});
