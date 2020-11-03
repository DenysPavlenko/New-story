'use strict'
// Plugins
import './plugins/scroll-spy';
import './plugins/sticky-sidebar';
// Modules
import preloader from './modules/preloader'
import navigation from './modules/navigation'
import arrowTop from './modules/arrow-top'
import specialization from './modules/specialization';
import smoothsSroll from './modules/smooth-scroll';
import aboutSidebar from './modules/about-sidebar';
import portfolio from './modules/portfolio';
import scrollAimations from './modules/scroll-animations'

// On document ready
$(function () {
  navigation();
  arrowTop();
  specialization();
  aboutSidebar();
  portfolio();
  smoothsSroll();
});

// On window load
$(window).on('load', function () {
  preloader();
  scrollAimations();
});