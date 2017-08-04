$(function () {
    $(".editable").on("clionsole.ck", function () {
        var editableObject = $(this).parent().siblings('.editableTarget')[0];
        editableObject.removeAttribute('disabled');
        editableObject.focus();
        $(editableObject).focusout(function () {
            editableObject.setAttribute('disabled', 'disabled');
        });
        editableObject.focus();
    });
});