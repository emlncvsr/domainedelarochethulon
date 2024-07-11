$(document).ready(function () {
    // Navigation logic
    $('nav a').click(function (e) {
        e.preventDefault();
        const target = $(this).attr('href');
        $('.content-section').removeClass('active');
        $(target).addClass('active');
    });

    // Show the first section by default
    $('#accueil').addClass('active');

    // Vin navigation logic
    let currentVinIndex = 0;
    const vins = $('.vin-item');
    const totalVins = vins.length;

    function showVin(index) {
        vins.hide();
        $(vins[index]).show();
    }

    $('#prev-vin').click(function () {
        currentVinIndex = (currentVinIndex - 1 + totalVins) % totalVins;
        showVin(currentVinIndex);
    });

    $('#next-vin').click(function () {
        currentVinIndex = (currentVinIndex + 1) % totalVins;
        showVin(currentVinIndex);
    });

    showVin(currentVinIndex);
});
