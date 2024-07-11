$(document).ready(function () {
    $('.content-section').hide();
    $('#accueil').show();

    $('nav ul li a').click(function (event) {
        event.preventDefault();
        const target = $(this).attr('href');
        $('.content-section').hide();
        $(target).show();
    });

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
