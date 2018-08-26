import $ from 'jquery';
import clamp from 'mout/math/clamp';
import bind from 'mout/function/bind';
import { rgbstr2hex, hsb2hex, hex2hsb, hex2rgb, parseHex } from '../../utils/colors';

const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
const body = $('body');

const MOUSEDOWN = 'mousedown touchstart MSPointerDown pointerdown';
const MOUSEMOVE = 'mousemove touchmove MSPointerMove pointermove';
const MOUSEUP = 'mouseup touchend MSPointerUp pointerup';
const FOCUSIN = isFirefox ? 'focus' : 'focusin';

export default class ColorpickerField {
    constructor(selector) {
        this.selector = selector;
        this.field = $(this.selector);
        this.options = Object.assign({}, this.field.data('grav-colorpicker'));
        this.built = false;
        this.attach();

        if (this.options.update) {
            this.field.on('change._grav_colorpicker', (event, field, hex, opacity) => {
                let backgroundColor = hex;
                let rgb = hex2rgb(hex);

                if (opacity < 1) {
                    backgroundColor = 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + opacity + ')';
                }

                let target = field.closest(this.options.update);
                if (!target.length) {
                    target = field.siblings(this.options.update);
                }
                if (!target.length) {
                    target = field.parent('.g-colorpicker').find(this.options.update);
                }

                target.css({ backgroundColor });
            });
        }
    }

    attach() {
        body.on(FOCUSIN, this.selector, (event) => this.show(event, event.currentTarget));
        body.on(MOUSEDOWN, this.selector + ' .g-colorpicker, ' + this.selector + ' .g-colorpicker i', this.bound('iconClick'));
        body.on('keydown', this.selector, (event) => {
            switch (event.keyCode) {
                case 9: // tab
                    this.hide();
                    break;
                case 13: // enter
                case 27: // esc
                    this.hide();
                    event.currentTarget.blur();
                    break;
            }
            return true;
        });

        // Update on keyup
        body.on('keyup', this.selector, (event) => {
            this.updateFromInput(true, event.currentTarget);
            return true;
        });

        // Update on paste
        body.on('paste', this.selector, (event) => {
            setTimeout(() => this.updateFromInput(true, event.currentTarget), 1);
        });
    }

    show(event, target) {
        target = $(target);

        if (!this.built) {
            this.build();
        }

        this.element = target;
        this.reposition();
        this.wrapper.addClass('cp-visible');
        this.updateFromInput();

        let mainContainer = $('#admin-main .content-wrapper').data('scrollbar').getViewElement();
        this.wrapper.on(MOUSEDOWN, '.cp-grid, .cp-slider, .cp-opacity-slider', this.bound('bodyDown'));
        body.on(MOUSEMOVE, this.bound('bodyMove'));
        body.on(MOUSEDOWN, this.bound('bodyClick'));
        body.on(MOUSEUP, this.bound('targetReset'));
        $(mainContainer).on('scroll', this.bound('reposition'));
    }

    hide() {
        if (!this.built) { return; }
        this.wrapper.removeClass('cp-visible');

        let mainContainer = $('#admin-main .content-wrapper').data('scrollbar').getViewElement();
        this.wrapper.undelegate(MOUSEDOWN, '.cp-grid, .cp-slider, .cp-opacity-slider', this.bound('bodyDown'));
        body.off(MOUSEMOVE, this.bound('bodyMove'));
        body.off(MOUSEDOWN, this.bound('bodyClick'));
        body.off(MOUSEUP, this.bound('targetReset'));
        $(mainContainer).off('scroll', this.bound('reposition'));
    }

    build() {
        this.wrapper = $('<div class="cp-wrapper cp-with-opacity cp-mode-hue" />');
        this.slider = $('<div class="cp-slider cp-sprite" />').appendTo(this.wrapper).append($('<div class="cp-picker" />'));
        this.opacitySlider = $('<div class="cp-opacity-slider cp-sprite" />').appendTo(this.wrapper).append($('<div class="cp-picker" />'));
        this.grid = $('<div class="cp-grid cp-sprite" />').appendTo(this.wrapper).append($('<div class="cp-grid-inner" />')).append($('<div class="cp-picker" />'));

        $('<div />').appendTo(this.grid.find('.cp-picker'));

        let tabs = $('<div class="cp-tabs" />').appendTo(this.wrapper);
        this.tabs = {
            hue: $('<div class="cp-tab-hue active" />').text('HUE').appendTo(tabs),
            brightness: $('<div class="cp-tab-brightness" />').text('BRI').appendTo(tabs),
            saturation: $('<div class="cp-tab-saturation" />').text('SAT').appendTo(tabs),
            wheel: $('<div class="cp-tab-wheel" />').text('WHEEL').appendTo(tabs),
            transparent: $('<div class="cp-tab-transp" />').text('TRANSPARENT').appendTo(tabs)
        };

        tabs.on(MOUSEDOWN, '> div', (event) => {
            let element = $(event.currentTarget);
            if (element.is(this.tabs.transparent)) {
                let sliderHeight = this.opacitySlider.height();

                this.opacity = 0;
                this.opacitySlider.find('.cp-picker').css({ 'top': clamp(sliderHeight - (sliderHeight * this.opacity), 0, sliderHeight) });
                this.move(this.opacitySlider, { manualOpacity: true });
                return;
            }

            let active = tabs.find('.active');
            let mode = active.attr('class').replace(/\s|active|cp-tab-/g, '');
            let newMode = element.attr('class').replace(/\s|active|cp-tab-/g, '');

            this.wrapper.removeClass('cp-mode-' + mode).addClass('cp-mode-' + newMode);
            active.removeClass('active');
            element.addClass('active');

            this.mode = newMode;
            this.updateFromInput();
        });

        this.wrapper.appendTo('.content-wrapper');

        this.built = true;
        this.mode = 'hue';
    }

    reposition() {
        let ct = $('.content-wrapper')[0];
        let offset = this.element[0].getBoundingClientRect();
        let ctOffset = ct.getBoundingClientRect();
        let delta = { x: 0, y: 0 };

        if (this.options.offset) {
            delta.x = this.options.offset.x || 0;
            delta.y = this.options.offset.y || 0;
        }

        this.wrapper.css({
            top: offset.top + offset.height + ct.scrollTop - ctOffset.top + delta.y,
            left: offset.left + ct.scrollLeft - ctOffset.left + delta.x
        });
    }

    iconClick(event) {
        if (this.wrapper && this.wrapper.hasClass('cp-visible')) { return true; }

        event && event.preventDefault();

        let input = $(event.currentTarget).find('input');
        setTimeout(() => input.focus(), 50);
    }

    bodyMove(event) {
        event && event.preventDefault();

        if (this.target) { this.move(this.target, event); }
    }

    bodyClick(event) {
        let target = $(event.target);

        if (!target.closest('.cp-wrapper').length && !target.is(this.selector)) {
            this.hide();
        }
    }

    bodyDown(event) {
        event && event.preventDefault();

        this.target = $(event.currentTarget);
        this.move(this.target, event, true);
    }

    targetReset(event) {
        event && event.preventDefault();

        this.target = null;
    }

    move(target, event) {
        let input = this.element;
        let picker = target.find('.cp-picker');
        let clientRect = target[0].getBoundingClientRect();
        let offsetX = clientRect.left + window.scrollX;
        let offsetY = clientRect.top + window.scrollY;
        let x = Math.round((event ? event.pageX : 0) - offsetX);
        let y = Math.round((event ? event.pageY : 0) - offsetY);
        let wx;
        let wy;
        let r;
        let phi;

        // Touch support
        let touchEvents = event.changedTouches || (event.originalEvent && event.originalEvent.changedTouches);
        if (event && touchEvents) {
            x = (touchEvents ? touchEvents[0].pageX : 0) - offsetX;
            y = (touchEvents ? touchEvents[0].pageY : 0) - offsetY;
        }

        if (event && event.manualOpacity) {
            y = clientRect.height;
        }

        // Constrain picker to its container
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x > clientRect.width) x = clientRect.width;
        if (y > clientRect.height) y = clientRect.height;

        // Constrain color wheel values to the wheel
        if (target.parent('.cp-mode-wheel').length && picker.parent('.cp-grid').length) {
            wx = 75 - x;
            wy = 75 - y;
            r = Math.sqrt(wx * wx + wy * wy);
            phi = Math.atan2(wy, wx);

            if (phi < 0) phi += Math.PI * 2;
            if (r > 75) {
                x = 75 - (75 * Math.cos(phi));
                y = 75 - (75 * Math.sin(phi));
            }

            x = Math.round(x);
            y = Math.round(y);
        }

        // Move the picker
        if (target.hasClass('cp-grid')) {
            picker.css({
                top: y,
                left: x
            });

            this.updateFromPicker(input, target);
        } else {
            picker.css({
                top: y
            });
            this.updateFromPicker(input, target);
        }
    }

    updateFromInput(dontFireEvent, element) {
        element = element ? $(element) : this.element;
        let value = element.val();
        let opacity = value.replace(/\s/g, '').match(/^rgba?\([0-9]{1,3},[0-9]{1,3},[0-9]{1,3},(.+)\)/);
        let hex;
        let hsb;

        value = rgbstr2hex(value) || value;
        opacity = opacity ? clamp(opacity[1], 0, 1) : 1;

        if (!(hex = parseHex(value))) { hex = '#ffffff'; }
        hsb = hex2hsb(hex);

        if (this.built) {
            // opacity
            this.opacity = opacity;
            var sliderHeight = this.opacitySlider.height();
            this.opacitySlider.find('.cp-picker').css({ 'top': clamp(sliderHeight - (sliderHeight * this.opacity), 0, sliderHeight) });

            // bg color
            let gridHeight = this.grid.height();
            let gridWidth = this.grid.width();
            let r;
            let phi;
            let x;
            let y;

            sliderHeight = this.slider.height();

            switch (this.mode) {
                case 'wheel':
                    // Set grid position
                    r = clamp(Math.ceil(hsb.s * 0.75), 0, gridHeight / 2);
                    phi = hsb.h * Math.PI / 180;
                    x = clamp(75 - Math.cos(phi) * r, 0, gridWidth);
                    y = clamp(75 - Math.sin(phi) * r, 0, gridHeight);
                    this.grid.css({ backgroundColor: 'transparent' }).find('.cp-picker').css({
                        top: y,
                        left: x
                    });

                    // Set slider position
                    y = 150 - (hsb.b / (100 / gridHeight));
                    if (hex === '') y = 0;
                    this.slider.find('.cp-picker').css({ top: y });

                    // Update panel color
                    this.slider.css({
                        backgroundColor: hsb2hex({
                            h: hsb.h,
                            s: hsb.s,
                            b: 100
                        })
                    });
                    break;

                case 'saturation':
                    // Set grid position
                    x = clamp((5 * hsb.h) / 12, 0, 150);
                    y = clamp(gridHeight - Math.ceil(hsb.b / (100 / gridHeight)), 0, gridHeight);
                    this.grid.find('.cp-picker').css({
                        top: y,
                        left: x
                    });

                    // Set slider position
                    y = clamp(sliderHeight - (hsb.s * (sliderHeight / 100)), 0, sliderHeight);
                    this.slider.find('.cp-picker').css({ top: y });

                    // Update UI
                    this.slider.css({
                        backgroundColor: hsb2hex({
                            h: hsb.h,
                            s: 100,
                            b: hsb.b
                        })
                    });
                    this.grid.find('.cp-grid-inner').css({ opacity: hsb.s / 100 });
                    break;

                case 'brightness':
                    // Set grid position
                    x = clamp((5 * hsb.h) / 12, 0, 150);
                    y = clamp(gridHeight - Math.ceil(hsb.s / (100 / gridHeight)), 0, gridHeight);
                    this.grid.find('.cp-picker').css({
                        top: y,
                        left: x
                    });

                    // Set slider position
                    y = clamp(sliderHeight - (hsb.b * (sliderHeight / 100)), 0, sliderHeight);
                    this.slider.find('.cp-picker').css({ top: y });

                    // Update UI
                    this.slider.css({
                        backgroundColor: hsb2hex({
                            h: hsb.h,
                            s: hsb.s,
                            b: 100
                        })
                    });
                    this.grid.find('.cp-grid-inner').css({ opacity: 1 - (hsb.b / 100) });
                    break;
                case 'hue':
                default:
                    // Set grid position
                    x = clamp(Math.ceil(hsb.s / (100 / gridWidth)), 0, gridWidth);
                    y = clamp(gridHeight - Math.ceil(hsb.b / (100 / gridHeight)), 0, gridHeight);
                    this.grid.find('.cp-picker').css({
                        top: y,
                        left: x
                    });

                    // Set slider position
                    y = clamp(sliderHeight - (hsb.h / (360 / sliderHeight)), 0, sliderHeight);
                    this.slider.find('.cp-picker').css({ top: y });

                    // Update panel color
                    this.grid.css({
                        backgroundColor: hsb2hex({
                            h: hsb.h,
                            s: 100,
                            b: 100
                        })
                    });
                    break;
            }
        }

        if (!dontFireEvent) { element.val(this.getValue(hex)); }

        (this.element || element).trigger('change._grav_colorpicker', [element, hex, opacity]);

    }

    updateFromPicker(input, target) {
        var getCoords = function(picker, container) {

            var left, top;
            if (!picker.length || !container) return null;
            left = picker[0].getBoundingClientRect().left;
            top = picker[0].getBoundingClientRect().top;

            return {
                x: left - container[0].getBoundingClientRect().left + (picker[0].offsetWidth / 2),
                y: top - container[0].getBoundingClientRect().top + (picker[0].offsetHeight / 2)
            };

        };

        let hex;
        let hue;
        let saturation;
        let brightness;
        let x;
        let y;
        let r;
        let phi;

        // Panel objects
        let grid = this.wrapper.find('.cp-grid');
        let slider = this.wrapper.find('.cp-slider');
        let opacitySlider = this.wrapper.find('.cp-opacity-slider');

        // Picker objects
        let gridPicker = grid.find('.cp-picker');
        let sliderPicker = slider.find('.cp-picker');
        let opacityPicker = opacitySlider.find('.cp-picker');

        // Picker positions
        let gridPos = getCoords(gridPicker, grid);
        let sliderPos = getCoords(sliderPicker, slider);
        let opacityPos = getCoords(opacityPicker, opacitySlider);

        // Sizes
        let gridWidth = grid[0].getBoundingClientRect().width;
        let gridHeight = grid[0].getBoundingClientRect().height;
        let sliderHeight = slider[0].getBoundingClientRect().height;
        let opacitySliderHeight = opacitySlider[0].getBoundingClientRect().height;

        let value = this.element.val();
        value = rgbstr2hex(value) || value;
        if (!(hex = parseHex(value))) { hex = '#ffffff'; }

        // Handle colors
        if (target.hasClass('cp-grid') || target.hasClass('cp-slider')) {

            // Determine HSB values
            switch (this.mode) {
                case 'wheel':
                    // Calculate hue, saturation, and brightness
                    x = (gridWidth / 2) - gridPos.x;
                    y = (gridHeight / 2) - gridPos.y;
                    r = Math.sqrt(x * x + y * y);
                    phi = Math.atan2(y, x);
                    if (phi < 0) phi += Math.PI * 2;
                    if (r > 75) {
                        r = 75;
                        gridPos.x = 69 - (75 * Math.cos(phi));
                        gridPos.y = 69 - (75 * Math.sin(phi));
                    }
                    saturation = clamp(r / 0.75, 0, 100);
                    hue = clamp(phi * 180 / Math.PI, 0, 360);
                    brightness = clamp(100 - Math.floor(sliderPos.y * (100 / sliderHeight)), 0, 100);
                    hex = hsb2hex({
                        h: hue,
                        s: saturation,
                        b: brightness
                    });

                    // Update UI
                    slider.css({
                        backgroundColor: hsb2hex({
                            h: hue,
                            s: saturation,
                            b: 100
                        })
                    });
                    break;

                case 'saturation':
                    // Calculate hue, saturation, and brightness
                    hue = clamp(parseInt(gridPos.x * (360 / gridWidth), 10), 0, 360);
                    saturation = clamp(100 - Math.floor(sliderPos.y * (100 / sliderHeight)), 0, 100);
                    brightness = clamp(100 - Math.floor(gridPos.y * (100 / gridHeight)), 0, 100);
                    hex = hsb2hex({
                        h: hue,
                        s: saturation,
                        b: brightness
                    });

                    // Update UI
                    slider.css({
                        backgroundColor: hsb2hex({
                            h: hue,
                            s: 100,
                            b: brightness
                        })
                    });
                    grid.find('.cp-grid-inner').css({ opacity: saturation / 100 });
                    break;

                case 'brightness':
                    // Calculate hue, saturation, and brightness
                    hue = clamp(parseInt(gridPos.x * (360 / gridWidth), 10), 0, 360);
                    saturation = clamp(100 - Math.floor(gridPos.y * (100 / gridHeight)), 0, 100);
                    brightness = clamp(100 - Math.floor(sliderPos.y * (100 / sliderHeight)), 0, 100);
                    hex = hsb2hex({
                        h: hue,
                        s: saturation,
                        b: brightness
                    });

                    // Update UI
                    slider.css({
                        backgroundColor: hsb2hex({
                            h: hue,
                            s: saturation,
                            b: 100
                        })
                    });
                    grid.find('.cp-grid-inner').css({ opacity: 1 - (brightness / 100) });
                    break;

                default:
                    // Calculate hue, saturation, and brightness
                    hue = clamp(360 - parseInt(sliderPos.y * (360 / sliderHeight), 10), 0, 360);
                    saturation = clamp(Math.floor(gridPos.x * (100 / gridWidth)), 0, 100);
                    brightness = clamp(100 - Math.floor(gridPos.y * (100 / gridHeight)), 0, 100);
                    hex = hsb2hex({
                        h: hue,
                        s: saturation,
                        b: brightness
                    });

                    // Update UI
                    grid.css({
                        backgroundColor: hsb2hex({
                            h: hue,
                            s: 100,
                            b: 100
                        })
                    });
                    break;

            }
        }

        // Handle opacity
        if (target.hasClass('cp-opacity-slider')) {
            this.opacity = parseFloat(1 - (opacityPos.y / opacitySliderHeight)).toFixed(2);
        }

        // Adjust case
        input.val(this.getValue(hex));

        // Handle change event
        this.element.trigger('change._grav_colorpicker', [this.element, hex, this.opacity]);

    }

    getValue(hex) {
        if (this.opacity === 1) { return hex; }
        let rgb = hex2rgb(hex);

        return 'rgba(' + rgb.r + ', ' + rgb.g + ', ' + rgb.b + ', ' + this.opacity + ')';
    }

    bound(name) {
        let bound = this._bound || (this._bound = {});
        return bound[name] || (bound[name] = bind(this[name], this));
    }
}

export let Instance = new ColorpickerField('[data-grav-colorpicker]');
