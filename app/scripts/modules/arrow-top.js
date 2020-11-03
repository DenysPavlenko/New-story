export default function () {
	var $html                   = $('html, body');
	var $arrowTop               = $('.arrow-top');

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
	})
}