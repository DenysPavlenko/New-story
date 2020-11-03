export default function () {
  var $specTab = $('.specialization__tab');
  var $specImages = $('.specialization__images');

  $specImages.slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          autoplay: true
        }
      },
    ]
  });

  // Add active class to current dignostic tab
  $specImages.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    $specTab.eq(nextSlide)
      .addClass('specialization__tab--is-active')
      .siblings().removeClass('specialization__tab--is-active');
  });

  // Change slide on tab click
  $specTab.on('click', function () {
    var tabIndex = $(this).index();
    console.log('tabIndex:', tabIndex)
    $specImages.slick('slickGoTo', tabIndex);
  });

}