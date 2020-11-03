export default function () {
  var $html = $('html, body');
  var links = $('a');

  links.on('click', function (e) {
    var anchor = $(this).attr('href');

    // If link is an anchor then scroll to the selected section
    if (/^#/.test(anchor)) {
      e.preventDefault();
      var section = $(anchor);
      $html.animate({ scrollTop: section.offset().top });
    }
  })
}