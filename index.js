/*
 * deep-clone
 * @author Garrett Reed <garrett@garrettreed.co> 2016
 * MIT Licensed
 *
 * Suports:
 *   Primitives: null, string, number, function (inherits prototype)
 *   Collections: object, array
 *
 * @param {object} target Receiving object
 * @param {object/array} obj Object to clone
 * @return {object/array} the clone
 * 
 */
var deepClone = (function() {
    'use strict';

    var _isPrimitive = function(value) {
        if (value === null) {
            return true;
        }

        switch (typeof value) {
            case 'string':
            case 'number':
            case 'boolean':
            case 'undefined':
            case 'function':
                return true;
            default:
                return false;
        }
    };

    var _isArray = function(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    };

    var _clone = function(target, obj) {
        for (var key in obj) {
            if (_isPrimitive(obj[key])) {
                target[key] = obj[key];
                if (typeof target[key] === 'function') {
                    target[key].prototype = Object.create(obj[key].prototype);
                }
            } else if (_isArray(obj[key])) {
                target[key] = [];
                deepClone(target[key], obj[key]);
            } else {
                target[key] = Object.create(Object.getPrototypeOf(obj[key]));
                _clone(target[key], obj[key]);
            }
        }
        return target;
    };

    return _clone;
})();
