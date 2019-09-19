var jQuery = jQuery || {empty:true};
(function($) {
    /**
     * Listen to all ajax calls and parse logout data
     */
    if (typeof($.empty) === 'undefined') {
        $(document).ajaxComplete(function(e, xhr, settings) {
            try {
                var obj = $.parseJSON(xhr.responseText);
                if (obj.status === 'logout') {
                    document.location.href = obj.redirect;
                }
            } catch (e) {
                return;
            }
        });
    }
})(jQuery);