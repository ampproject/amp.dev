// localStorage
(function() {
    function isSupported() {
        var item = 'localStoragePollyfill';
        try {
            localStorage.setItem(item, item);
            localStorage.removeItem(item);
            sessionStorage.setItem(item, item);
            sessionStorage.removeItem(item);
            return true;
        } catch (e) {
            return false;
        }
    }

    if (!isSupported()) {
        try {
            Storage.prototype._data = {};

            Storage.prototype.setItem = function(id, val) {
                this._data[id] = String(val);
                return this._data[id];
            };

            Storage.prototype.getItem = function(id) {
                return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
            };

            Storage.prototype.removeItem = function(id) {
                return delete this._data[id];
            };

            Storage.prototype.clear = function() {
                this._data = {};
                return this._data;
            };
        } catch (e) {
            console.error('localStorage pollyfill error: ', e);
        }
    }
}());
