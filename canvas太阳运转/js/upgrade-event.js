var bPopupOpen = false;
$(function() {
    $(window).on('upgrade', function(e, params) {
        if (bPopupOpen) return false;
        bPopupOpen = true;

        var iOffsetX = +$('#upgrade').offset().left;
        $('#upgrade-popup').css('left', iOffsetX + 110).fadeIn(400).delay(4000).fadeOut(400, function(e) {
            bPopupOpen = false;
        });
    });
});