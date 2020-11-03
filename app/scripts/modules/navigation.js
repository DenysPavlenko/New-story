import transitionendEvent from './transitionend-event';

export default function () {
  var $body = $('html, body');
  var $navBurger = $('.navigation__burger');
  var $navMenuBg = $('.navigation__menu-bg')
  var $navMenuWrap = $('.navigation__menu-wrap');
  var $navMenu = $('.navigation__menu');
  var $navMenuLink = $('.navigation__menu-link');
  var transitionEnd = transitionendEvent();
  var flag = true;

  // Navigation links scrollspy
  $('.navigation__menu-item').scrollSpy({
    activeClass: 'navigation__menu-item--is-active',
  });

  // Toggle menu on link click
  $navBurger.on('click', function () {
    if (flag) {
      $(this).toggleClass('navigation__burger--is-active');
      if ($(this).hasClass('navigation__burger--is-active')) {
        showMenu();
      } else {
        hideMenu();
      }
    }
  });
  // Hide menu on link click
  $navMenuLink.on('click', function () {
    $navBurger.removeClass('navigation__burger--is-active');
    hideMenu();
  });
  // Disable menu on desktop
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
    })
  }

}