document.addEventListener('DOMContentLoaded', function() {
    var elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(function(element) {
        var messageKey = element.getAttribute('data-i18n');
        element.innerText = chrome.i18n.getMessage(messageKey);
    });
});
