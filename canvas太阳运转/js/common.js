(function($) {
    $(document).ready(function(){
        var mainHeight = $('.main_container').height();
        var contentHeight = mainHeight - 70;
        $('#maincontent').height(contentHeight);
    });
    $(window).resize(function(){
        var mainHeight = $('.main_container').height();
        var contentHeight = mainHeight - 70;
        $('#maincontent').height(contentHeight);
    });
})(jQuery);