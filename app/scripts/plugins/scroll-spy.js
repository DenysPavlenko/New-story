(function ($) {
  "use strict";

  $.fn.scrollSpy = function (options) {
    var $navSpyTarget = this;
    var navActiveClass = options.activeClass;
    var keepFirstActive = options.keepFirstActive;

    $(window).on('scroll', function () {
      $navSpyTarget.each(function () {
        var $this = $(this);
        // Get section name
        var anchor = $this.find('a').attr('href');
        var section = $(anchor);
        // Offsets
        var windowTop = $(window).scrollTop();
        var sectionTop = section.offset().top;
        // Add or remove an active class from nav link
        if (windowTop > sectionTop - 1) {
          $navSpyTarget.removeClass(navActiveClass);
          $this.addClass(navActiveClass);
        }
        else {
          if (!keepFirstActive) {
            $this.removeClass(navActiveClass);
          }
        }
      });
    });
    return this;
  }
}(jQuery));