# js-deep-clone
JavaScript object/array deep cloner implemented in ES5

## Usage

``` js
var deepObject = {
    one: {
        two: [1, 2, "hello", {
            three: 3
        }],
        four: function (num) {
            this.num = num;
        },
        five: {
            six: {
                seven: 7
            },
            bool1: true,
            bool2: false
        }
    },
    ten: 10.2
};

var clone = deepClone({}, one);
```