/*
 * Copyright Awais Muzaffar.
 *
 * Dual-licensed under the GPLv3 and Apache 2.0 licenses:
 * http://www.gnu.org/licenses/gpl-3.0.html
 *
 */
 
(function ($) {

    $.fn.fixedSidebar = function (options) {

        var $el = this,
            settings = $.extend({
                'wrapper' : $el.parent(),
                'margin'  : 0
            }, options);

        var methods = {

            'init': function () {
             
                var $wrapper              = settings['wrapper'],
                    el_height             = $el.height(),
                    wrapper_offset_top    = $wrapper.offset().top,
                    wrapper_offset_bottom = $wrapper.offset().top + $wrapper.height(),
                    window_scroll_top     = 0;

                $(window).scroll(function () {
                 
                    window_scroll_top = $(window).scrollTop() + settings['margin'];
                    var left_position = $el.offset().left - $(window).scrollLeft();
                    
                    if (window_scroll_top > wrapper_offset_top && (window_scroll_top + el_height) < wrapper_offset_bottom) {
                        $el.css({
                            'position'  : 'fixed',
                            'top'       : settings['margin'] + 'px',
                            'left'      : left_position + 'px'
                        }).addClass('fixed');
                    } else if ((window_scroll_top + el_height) > wrapper_offset_bottom) {
                        $el.css({
                            'position'  : 'absolute',
                            'top'       : 'auto',
                            'bottom'    : '0',
                            'left'      : 'auto'
                        });
                    } else {
                        $el.css({
                            'position'  : 'absolute',
                            'top'       : '0',
                            'bottom'    : 'auto',
                            'left'      : 'auto'
                        });
                    }
                }).scroll();

                $(window).resize(function () {
                    $el.css({
                        'position'  : 'absolute',
                        'top'       : '0',
                        'bottom'    : 'auto',
                        'left'      : 'auto'
                    });
                }).resize();
                
            },

            'position_fix_supported': function () {
                // CFT by Juriy Zaytsev: https://github.com/kangax/cft 
                var container = document.body;
                if (document.createElement && container && container.appendChild && container.removeChild) {
                    var el = document.createElement('div');
                    if (!el.getBoundingClientRect) return null;
                    el.innerHTML = 'x';
                    el.style.cssText = 'position:fixed;top:100px;';
                    container.appendChild(el);
                    var originalHeight = container.style.height,
                        originalScrollTop = container.scrollTop;
                    container.style.height = '3000px';
                    container.scrollTop = 500;
                    var elementTop = el.getBoundingClientRect().top;
                    container.style.height = originalHeight;
                    var isSupported = (elementTop === 100);
                    container.removeChild(el);
                    container.scrollTop = originalScrollTop;
                    return isSupported;
                }
                return null;
            }
        }
        if (methods.position_fix_supported()) {
            methods.init();
        }
    };
})(jQuery);