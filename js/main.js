(function(window) {
    let handleForm = function(form) {
        document.getElementById('result').classList.add('hidden');

        let result = calcResult(form);
        if (result) {
            showResult(result);
        }
    }

    for (var form of document.querySelectorAll('form.page-form')) {
        form.addEventListener('submit', function(event) {
            typeof event.preventDefault === 'function' ? event.preventDefault() : (event.returnValue = false);

            handleForm(event.currentTarget);
        });
    };

    let calcResult = function(form) {
        let result = -27.054,
            ratios = {
                zrp: -3.147,
                frp: 0.039,
                fnoa: 0.033,
                pamg: 0.066,
                pshf: 0.055,
                pl: -0.939,
                uzmorf: 1.924
            };

        for (let inputName in ratios) {
            let inputValue = getFromForm(form, inputName, ratios[inputName]);
            if (inputValue === false) {
                return false;
            } else {
                result += inputValue;
            }
        }
        if (!isNaN(result)) {
            result = Math.pow(Math.E, result) / (1 + Math.pow(Math.E, result));
            return result;
        }

        return false;
    }

    let getFromForm = function(form, inputName, ratio = 1) {
        let field = form[inputName];

        if (field) {
            let value = parseFloat(field.value);

            if (!isNaN(value)) {
                return value * ratio;
            }
        }

        return false;
    }

    let showResult = function(value) {
        value = parseFloat(value);
        if (isNaN(value) || !isFinite(value)) {
            return false;
        }

        let resultCard = document.getElementById('result'),
            resultString = '',
            resultRecomendation = '',
            resultPercent = Math.floor(value * 100) / 100;

        if (value >= 0.67) {
            resultString = '(риск высокий)';
            resultRecomendation = 'Риск реализации ранней гипогалактии высокий, необходимо начать превентивные мероприятия.  Предлагаемый комплексный метод профилактики нарушений становления лактации: дородовое сцеживание молозива в течение 10-14 дней, ежедневно 3 раза в день по 5-10 мин. из каждой молочной железы; прием метоклопрамида в первые трое суток послеродового периода по 10 мг внутрь, 3 раза в день, до еды; светотерапия ВИП-светом со 2-х суток пуэрперия, 3 раза в день с интервалом не менее 4-х часов по 8 мин. на каждую точку экспозиции, курсом 10-16 сеансов';
            resultClass = 'mdl-color-text--accent';
        } else {
            resultString = '(риск низкий)';
            resultClass = 'mdl-color-text--primary'
        }

        setNodeTextByClassName(result, '.result-percent', resultPercent);
        setNodeTextByClassName(result, '.result-string', resultString);
        setNodeTextByClassName(result, '.result-recomendation', resultRecomendation);
        result.classList.remove('hidden');
        for (var textTitle of document.querySelectorAll('.mdl-card__title-text')) {
            let classes = textTitle.classList;
            classes.remove('mdl-color-text--accent', 'mdl-color-text--primary');
            classes.add(resultClass);
        }
    }

    let setNodeTextByClassName = function(parentElement = false, selector = '', text = '') {
        if (!isElement(parentElement) || selector == '') {
            parentElement = document;
        }

        for (var element of parentElement.querySelectorAll(selector)) {
            element.textContent = text;
            if (text.length == 0) {
                element.classList.add('hidden');
            } else {
                element.classList.remove('hidden');
            }
        }
    }

    let isNode = function(o) {
        return (
            typeof Node === 'object' ? o instanceof Node :
            o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
        );
    }

    let isElement = function(o) {
        return (
            typeof HTMLElement === 'object' ? o instanceof HTMLElement :
            o && typeof o === 'object' && o !== null && o.nodeType === 1 && typeof o.nodeName === 'string'
        );
    }
})(window);
