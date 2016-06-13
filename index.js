/**
 * Deep clone an Object
 * Follows es5 specs
 * @author Garrett Reed<garrett@garrettreed.co>
 * 
 * Primitives:
 *     null
 *     string
 *     number
 *     function (inherits prototype)
 * Collections:
 *     object
 *     array
 *
 * TODOs:
 *     - Make prototype inheritance optional
 *     - Add tests
 *
 * @param {object}       [target]  [receiving object]
 * @param {object/array} [obj]     [object to clone]
 * 
 * @return {object/array} [the clone]
 * 
 */
var deepClone = (function() {

    function isPrimitive(value) {
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
    }

    function isArray(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    }

    return function(target, obj) {
        for (var key in obj) {
            if (isPrimitive(obj[key])) {
                target[key] = obj[key];
                if (typeof target[key] === 'function') {
                    target[key].prototype = Object.create(obj[key].prototype);
                }
            } else if (isArray(obj[key])) {
                target[key] = [];
                deepClone(target[key], obj[key]);
            } else {
                target[key] = Object.create(Object.getPrototypeOf(obj[key]));
                deepClone(target[key], obj[key]);
            }
        }
        return target;
    };
})();

