export default function () {
	var $portfolioArticle = $('.portfolio-article');
	var $portfolioBtn     = $('.portfolio-article__btn');
	var btnText           = $portfolioBtn.html();
	var btnNewText        = $portfolioBtn.data('btn');

	// Hide images except first two
	$portfolioArticle.each(function () {
		$(this).find('.portfolio-article__image:gt(1)').hide();
	});
	// Show/hide images on click
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