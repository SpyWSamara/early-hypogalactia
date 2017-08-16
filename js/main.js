(function(window) {
    var handleForm = function(form) {
        console.log(form);
    }

    var getElementsList = function(selector, parentObject) {
        parentObject = typeof parentObject !== 'undefined' ? parentObject : document;
        var result = parentObject.querySelectorAll(selector);

        if (typeof result.forEach !== 'function') {
            result = Array.prototype.slice.call(result, 0);
        }
        return result;
    }

    var stepForms = getElementsList('form.page-form');

    stepForms.forEach(function(form) {
        form.addEventListener('submit', function(event) {
            typeof event.preventDefault === 'function' ? event.preventDefault() : (event.returnValue = false);

            handleForm(event.currentTarget);
        });
    });
})(window);
