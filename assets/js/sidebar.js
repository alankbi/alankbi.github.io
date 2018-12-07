$(document).ready(function () {
    $('.sidebar-section-link').on('click', function (e) {
        e.preventDefault();
        var link = $(this).attr('href');
        $('html,body').animate({scrollTop: $(link).offset().top}, 'slow');
    });
});
