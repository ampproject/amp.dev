// Parses a string and returns a valid hex string when possible
// parseHex('#fff') => '#ffffff'
export const parseHex = (string) => {
    string = string.replace(/[^A-F0-9]/ig, '');
    if (string.length !== 3 && string.length !== 6) return '';
    if (string.length === 3) {
        string = string[0] + string[0] + string[1] + string[1] + string[2] + string[2];
    }

    return '#' + string.toLowerCase();
};

// Converts an HSB object to an RGB object
// hsb2rgb({h: 0, s: 0, b: 100}) => {r: 255, g: 255, b: 255}
export const hsb2rgb = (hsb) => {
    let rgb = {};
    let h = Math.round(hsb.h);
    let s = Math.round(hsb.s * 255 / 100);
    let v = Math.round(hsb.b * 255 / 100);
    if (s === 0) {
        rgb.r = rgb.g = rgb.b = v;
    } else {
        var t1 = v;
        var t2 = (255 - s) * v / 255;
        var t3 = (t1 - t2) * (h % 60) / 60;
        if (h === 360) h = 0;
        if (h < 60) {
            rgb.r = t1;
            rgb.b = t2;
            rgb.g = t2 + t3;
        } else if (h < 120) {
            rgb.g = t1;
            rgb.b = t2;
            rgb.r = t1 - t3;
        } else if (h < 180) {
            rgb.g = t1;
            rgb.r = t2;
            rgb.b = t2 + t3;
        } else if (h < 240) {
            rgb.b = t1;
            rgb.r = t2;
            rgb.g = t1 - t3;
        } else if (h < 300) {
            rgb.b = t1;
            rgb.g = t2;
            rgb.r = t2 + t3;
        } else if (h < 360) {
            rgb.r = t1;
            rgb.g = t2;
            rgb.b = t1 - t3;
        } else {
            rgb.r = 0;
            rgb.g = 0;
            rgb.b = 0;
        }
    }
    return {
        r: Math.round(rgb.r),
        g: Math.round(rgb.g),
        b: Math.round(rgb.b)
    };
};

// Converts an RGB object to a HEX string
// rgb2hex({r: 255, g: 255, b: 255}) => #ffffff
export const rgb2hex = (rgb) => {
    var hex = [
        rgb.r.toString(16),
        rgb.g.toString(16),
        rgb.b.toString(16)
    ];

    hex.forEach((val, nr) => {
        if (val.length === 1) hex[nr] = '0' + val;
    });

    return '#' + hex.join('');
};

// Converts and RGB(a) string to a HEX string
// rgbstr2hex('rgba(255, 255, 255, 0.5)') => #ffffff
export const rgbstr2hex = (rgb) => {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);

    return (rgb && rgb.length === 4) ? '#' +
    ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
    ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
};

// Converts an HSB object to a HEX string
// hsb2hex({h: 0, s: 0, b: 100}) => #ffffff
export const hsb2hex = (hsb) => {
    return rgb2hex(hsb2rgb(hsb));
};

// Converts a HEX string to an HSB object
// hex2hsb('#ffffff') => {h: 0, s: 0, b: 100}
export const hex2hsb = (hex) => {
    let hsb = rgb2hsb(hex2rgb(hex));
    if (hsb.s === 0) hsb.h = 360;

    return hsb;
};

// Converts an RGB object to an HSB object
// rgb2hsb({r: 255, g: 255, b: 255}) => {h: 0, s: 0, b: 100}
export const rgb2hsb = (rgb) => {
    let hsb = {
        h: 0,
        s: 0,
        b: 0
    };
    let min = Math.min(rgb.r, rgb.g, rgb.b);
    let max = Math.max(rgb.r, rgb.g, rgb.b);
    let delta = max - min;
    hsb.b = max;
    hsb.s = max !== 0 ? 255 * delta / max : 0;
    if (hsb.s !== 0) {
        if (rgb.r === max) {
            hsb.h = (rgb.g - rgb.b) / delta;
        } else if (rgb.g === max) {
            hsb.h = 2 + (rgb.b - rgb.r) / delta;
        } else {
            hsb.h = 4 + (rgb.r - rgb.g) / delta;
        }
    } else {
        hsb.h = -1;
    }
    hsb.h *= 60;
    if (hsb.h < 0) {
        hsb.h += 360;
    }
    hsb.s *= 100 / 255;
    hsb.b *= 100 / 255;

    return hsb;
};

// Converts a HEX string to an RGB object
// hex2rgb('#ffffff') => {r: 255, g: 255, b: 255}
export const hex2rgb = (hex) => {
    hex = parseInt(((hex.indexOf('#') > -1) ? hex.substring(1) : hex), 16);

    return {
        /* jshint ignore:start */
        r: hex >> 16,
        g: (hex & 0x00FF00) >> 8,
        b: (hex & 0x0000FF)
        /* jshint ignore:end */
    };
};
