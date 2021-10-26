document.addEventListener('DOMContentLoaded', function () {
    var errorsElement = document.querySelector('.emptyform')
    var successElement = document.querySelector('.success')


    if (errorsElement.innerHTML !== '') {
        setTimeout(function () {
            errorsElement.innerHTML = '';
        }, 4000);

    }

    if (successElement.innerHTML !== '') {
        setTimeout(function () {
            successElement.innerHTML = '';
        }, 4000);

    }


});