(function ($) {
	"use strict";

	// Create an iframe for detecting document's height change
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

	/* Detect document height change */
	function onElementHeightChange(elm, callback) {
		var lastHeight = elm.height();
		var newHeight;
		(function run() {
			newHeight = elm.height();
			if (lastHeight != newHeight) {
				callback();
			}
			lastHeight = newHeight;

			if (elm.onElementHeightChangeTimer) {
				clearTimeout(elm.onElementHeightChangeTimer);
			}
			elm.onElementHeightChangeTimer = setTimeout(run, 100);
		})();
	}


	$.fn.stickySidebar = function (options) {
		/* Default settings */
		var settings = $.extend({
			minWidth: 0,
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
			var unstickBottom = (contentOffsetTop + contentHeight) - windowOffsetTop;

			/* Get the sidebarOffsetTop if it has a static position */
			if ($sidebar.css('position') === 'static') {
				sidebarOffsetTop = $sidebar.offset().top;
			}

			/* Stick the sidebar if the windowOffsetTop is
				bigger than the sidebarOffsetTop */
			if (windowOffsetTop >= sidebarOffsetTop) {
				$sidebar.css({ 'position': 'fixed', 'top': 0 })
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
				$sidebar.css({ 'position': 'relative', 'top': sidebarTop + 'px' });
			}
		}
		/* Reset sidebar function */
		function resetSidebar() {
			$sidebar.css({ 'position': 'static' });
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
			$(this.contentWindow).resize(recalculate);
		});
		/* Run the stickySidebar function on page scroll */
		$(window).on('scroll', stickySidebar);

		return this;
	}
}(jQuery));