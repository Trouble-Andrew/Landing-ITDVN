(function () {

    var me = {};
    var form = document.querySelector('.form-container');
    var closrButton = null;

    function onClose(e) {
        e.preventDefault();

        me.close();
        closeButton.removeEventListener('click', onClose)
    }

    me.open = function () {
        form.classList.remove('is-hidden');

        closeButton = document.querySelector('.form__close-button');
        closeButton.addEventListener('click', onClose);
    };

    me.close = function () {
        form.classList.add('is-hidden');
    };

    me.isValid = function () {
        if (!me.isAllCompleted(document.querySelectorAll('[data-valid="required"]'))) {
            console.log('Заполните все необходимые поля');
            return false;
        } else if (!TEST.validation.isEmail(document.querySelector('[data-email]').value)) {
            console.log('Неверный email');
            return false;
        } else if (!TEST.validation.isEmail(document.querySelector('[data-number]').value)) {
            console.log('Неверный номер');
            return false;
        }
        return true;

    };

    me.isAllCompleted = function (data) {
        var result = true;

        for (var i = 0; i < data.length; i++) {
            if (!TEST.validation.isNotEmpty(data[i].value)) {
                result = false;
                break;
            }
        }
        return result;
    };
    TEST.form = me;

}());

var formContainer = document.querySelector('.form-container');

window.addEventListener('keydown', function (event) {
    if (event.keyCode === 27) {
        if (!(formContainer.classList.contains('is-hidden'))) {
            formContainer.classList.add('is-hidden');
        }
    }
});
