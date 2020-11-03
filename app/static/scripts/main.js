'use strict';

(function ($) {

  $.fn.scrollSpy = function (options) {
    var $navSpyTarget = this;
    var navActiveClass = options.activeClass;
    var keepFirstActive = options.keepFirstActive;
    $(window).on('scroll', function () {
      $navSpyTarget.each(function () {
        var $this = $(this); // Get section name

        var anchor = $this.find('a').attr('href');
        var section = $(anchor); // Offsets

        var windowTop = $(window).scrollTop();
        var sectionTop = section.offset().top; // Add or remove an active class from nav link

        if (windowTop > sectionTop - 1) {
          $navSpyTarget.removeClass(navActiveClass);
          $this.addClass(navActiveClass);
        } else {
          if (!keepFirstActive) {
            $this.removeClass(navActiveClass);
          }
        }
      });
    });
    return this;
  };
})(jQuery);

(function ($) {

  $(document.body).append('<iframe class="height-change-listener"></iframe>');
  $('.height-change-listener').css({
    'position': 'absolute',
    'top': 0,
    'left': 0,
    'height': '100%',
    'width': 0,
    'border': 0,
    'background-color': 'transparent'
  });

  $.fn.stickySidebar = function (options) {
    /* Default settings */
    var settings = $.extend({
      minWidth: 0
    }, options);
    var $sidebar = this;
    var $content = $(options.content);
    var minWidth = settings.minWidth;
    var sidebarHeight = $sidebar.height();
    var contentHeight = $content.height();
    var windowWidth = $(window).width();
    var sidebarOffsetTop;
    /* Stick sidebar function */

    function stickySidebar() {
      /* Return if the screen width is smaller than the minWidth */
      if (windowWidth < minWidth) {
        resetSidebar();
        return this;
      }

      var windowOffsetTop = $(window).scrollTop();
      var contentOffsetTop = $content.offset().top;
      var unstickBottom = contentOffsetTop + contentHeight - windowOffsetTop;
      /* Get the sidebarOffsetTop if it has a static position */

      if ($sidebar.css('position') === 'static') {
        sidebarOffsetTop = $sidebar.offset().top;
      }
      /* Stick the sidebar if the windowOffsetTop is
        bigger than the sidebarOffsetTop */


      if (windowOffsetTop >= sidebarOffsetTop) {
        $sidebar.css({
          'position': 'fixed',
          'top': 0
        });
      }
      /* Un-stick the sidebar if the windowOffsetTop is
        smaller than the sidebarOffsetTop */
      else {
          resetSidebar();
        }
      /* Un-stick the sidebar if the sidebarHeight is
        bigger than the unstickBottom. Set top position to the sidebar */


      if (sidebarHeight >= unstickBottom) {
        var sidebarTop = contentHeight - sidebarHeight;
        $sidebar.css({
          'position': 'relative',
          'top': sidebarTop + 'px'
        });
      }
    }
    /* Reset sidebar function */


    function resetSidebar() {
      $sidebar.css({
        'position': 'static'
      });
    }
    /* Recalculate function */


    function recalculate() {
      sidebarHeight = $sidebar.height();
      contentHeight = $content.height();
      windowWidth = $(window).width();
      resetSidebar();
      stickySidebar();
    }
    /* Run the stickySidebar function */


    stickySidebar();
    /* Re-calculate some values on screen resize */

    $(window).on('resize', recalculate);
    /* Re-calculate some values on document's height change */

    $('.height-change-listener').each(function () {
      $(this.contentWindow).on('resize', recalculate);
    });
    /* Run the stickySidebar function on page scroll */

    $(window).on('scroll', stickySidebar);
    return this;
  };
})(jQuery);

function preloader () {
  $('.preloader').fadeOut();
  $('html, body').css('overflow-y', 'auto');
}

function transitionendEvent () {
  var el = document.createElement('fake');
  var transEndEventNames = {
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'otransitionend',
    'transition': 'transitionend'
  };

  for (var t in transEndEventNames) {
    if (el.style[t] !== undefined) {
      return transEndEventNames[t];
    }
  }
}

function navigation () {
  var $body = $('html, body');
  var $navBurger = $('.navigation__burger');
  var $navMenuBg = $('.navigation__menu-bg');
  var $navMenuWrap = $('.navigation__menu-wrap');
  var $navMenu = $('.navigation__menu');
  var $navMenuLink = $('.navigation__menu-link');
  var transitionEnd = transitionendEvent();
  var flag = true; // Navigation links scrollspy

  $('.navigation__menu-item').scrollSpy({
    activeClass: 'navigation__menu-item--is-active'
  }); // Toggle menu on link click

  $navBurger.on('click', function () {
    if (flag) {
      $(this).toggleClass('navigation__burger--is-active');

      if ($(this).hasClass('navigation__burger--is-active')) {
        showMenu();
      } else {
        hideMenu();
      }
    }
  }); // Hide menu on link click

  $navMenuLink.on('click', function () {
    $navBurger.removeClass('navigation__burger--is-active');
    hideMenu();
  }); // Disable menu on desktop

  $(window).on('resize', function () {
    if ($(window).width() >= 992) {
      $navMenu.removeClass('navigation__menu--is-active');
      $navMenuBg.removeClass('navigation__menu-bg--is-active');
      $navBurger.removeClass('navigation__burger--is-active');
      $navMenuWrap.removeClass('navigation__menu-wrap--is-active');
      $body.css('overflowY', 'auto');
    }
  });

  function showMenu() {
    flag = false;
    $navMenuBg.addClass('navigation__menu-bg--is-active');
    setTimeout(function () {
      $body.css('overflowY', 'hidden');
      $navMenuWrap.addClass('navigation__menu-wrap--is-active');
    }, 700);
    $navMenuBg.one('animationend webkitAnimationEnd oAnimationEnd', function () {
      $navMenuBg.removeClass('navigation__menu-bg--is-active');
      $navMenu.addClass('navigation__menu--is-active');
    });
    $navMenu.one(transitionEnd, function () {
      flag = true;
    });
  }

  function hideMenu() {
    flag = false;
    $navMenu.removeClass('navigation__menu--is-active');
    setTimeout(function () {
      $navMenuWrap.removeClass('navigation__menu-wrap--is-active');
      $body.css('overflowY', 'auto');
    }, 1200);
    $navMenu.one(transitionEnd, function () {
      $navMenuBg.addClass('navigation__menu-bg--is-active');
    });
    $navMenuBg.one('animationend webkitAnimationEnd oAnimationEnd', function () {
      $navMenuBg.removeClass('navigation__menu-bg--is-active');
      flag = true;
    });
  }
}

function arrowTop () {
  var $html = $('html, body');
  var $arrowTop = $('.arrow-top');
  $(window).on('scroll', function () {
    var windowTop = $(window).scrollTop();

    if (windowTop >= 500) {
      $arrowTop.fadeIn(400);
    } else {
      $arrowTop.fadeOut(400);
    }
  });
  $arrowTop.on('click', function () {
    $html.animate({
      scrollTop: '0'
    });
  });
}

function specialization () {
  var $specTab = $('.specialization__tab');
  var $specImages = $('.specialization__images');
  $specImages.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    responsive: [{
      breakpoint: 992,
      settings: {
        autoplay: true
      }
    }]
  }); // Add active class to current dignostic tab

  $specImages.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $specTab.eq(nextSlide).addClass('specialization__tab--is-active').siblings().removeClass('specialization__tab--is-active');
  }); // Change slide on tab click

  $specTab.on('click', function () {
    var tabIndex = $(this).index();
    console.log('tabIndex:', tabIndex);
    $specImages.slick('slickGoTo', tabIndex);
  });
}

function smoothsSroll () {
  var $html = $('html, body');
  var links = $('a');
  links.on('click', function (e) {
    var anchor = $(this).attr('href'); // If link is an anchor then scroll to the selected section

    if (/^#/.test(anchor)) {
      e.preventDefault();
      var section = $(anchor);
      $html.animate({
        scrollTop: section.offset().top
      });
    }
  });
}

function aboutSidebar () {
  // About sidebar
  $('.about-menu__sidebar').stickySidebar({
    content: '.about-articles',
    minWidth: 992
  }); // About links scrollspy

  $('.about-menu__list-item').scrollSpy({
    activeClass: 'list__item--is-active',
    keepFirstActive: true
  });
}

function portfolio () {
  var $portfolioArticle = $('.portfolio-article');
  var $portfolioBtn = $('.portfolio-article__btn');
  var btnText = $portfolioBtn.html();
  var btnNewText = $portfolioBtn.data('btn'); // Hide images except first two

  $portfolioArticle.each(function () {
    $(this).find('.portfolio-article__image:gt(1)').hide();
  }); // Show/hide images on click

  $portfolioBtn.on('click', function () {
    var images = $(this).siblings().find('.portfolio-article__image:gt(1)');

    if ($(this).html() === btnNewText) {
      images.each(function (i) {
        images.eq(images.length - 1 - i).delay(150 * i).hide(150);
      });
      $(this).html(btnText);
    } else {
      images.each(function (i) {
        $(this).delay(150 * i).show(150);
      });
      $(this).html(btnNewText);
    }
  });
  $('.portfolio-menu__sidebar').stickySidebar({
    content: '.portfolio-articles',
    minWidth: 992
  });
  $('.portfolio-menu__list-item').scrollSpy({
    activeClass: 'list__item--is-active',
    keepFirstActive: true
  });
}

function scrollAimations () {
  var $items = $('[data-scroll-animation]');
  var windowHeight = $(window).height();
  var bottomOffset = '85%';
  var resizeEnd; // Change windowHeight on resize

  $(window).on('resize', function () {
    clearTimeout(resizeEnd);
    resizeEnd = setTimeout(function () {
      windowHeight = $(window).height();
    }, 100);
  }); // Run scrollAnimation

  scrollAnimation(); // ScrollAnimation on window scroll

  $(window).on('scroll', scrollAnimation); // Scroll animation function

  function scrollAnimation() {
    var windowScrollTop = $(window).scrollTop();
    var windowOffset = windowScrollTop + windowHeight * parseInt(bottomOffset) / 100; // Add animation class to element

    $items.each(function () {
      var elem = $(this);

      if (elem.offset().top <= windowOffset) {
        var animationClass = elem.attr('data-scroll-animation');
        var animationDelay = elem.attr('data-scroll-animation-delay');
        elem.css({
          '-webkit-animation-delay': animationDelay,
          '-mox-animation-delay': animationDelay,
          '-o-animation-delay': animationDelay,
          'animation-delay': animationDelay
        }).addClass(animationClass);
      }
    });
  }
}

$(function () {
  navigation();
  arrowTop();
  specialization();
  aboutSidebar();
  portfolio();
  smoothsSroll();
}); // On window load

$(window).on('load', function () {
  preloader();
  scrollAimations();
});
