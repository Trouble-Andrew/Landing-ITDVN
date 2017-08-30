(function () {

    // Add event listener for open form button

    var openFormButton = document.querySelector('.arrow-down');
    var form = document.querySelector('.form');
    var nav = document.querySelector('.nav');


    if (openFormButton) {
        openFormButton.addEventListener('click', function (e) {
            e.preventDefault();
            TEST.form.open();
        })
    }

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (TEST.form.isValid()) {
                console.log('All good');
            } else {
                console.log('Is not valid');
            }
        });
    };

    if (nav) {
        nav.addEventListener('click', function (e) {
            var target = e.target;

            if (target.tagName.toLowerCase() !== 'a') {
                return;
            }

            e.preventDefault();
            TEST.navigation.toggleToActiveLink(target);
        });
    }

}());
