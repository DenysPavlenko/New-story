export default function () {

  // About sidebar
  $('.about-menu__sidebar').stickySidebar({
    content: '.about-articles',
    minWidth: 992
  });

  // About links scrollspy
  $('.about-menu__list-item').scrollSpy({
    activeClass: 'list__item--is-active',
    keepFirstActive: true
  });

}