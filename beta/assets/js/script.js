$(document).ready(function () {
    let currentVinIndex = 0;
    const vins = $('.vin-item');
    vins.hide().eq(currentVinIndex).show();

    function showNextVin() {
        vins.eq(currentVinIndex).hide();
        currentVinIndex = (currentVinIndex + 1) % vins.length;
        vins.eq(currentVinIndex).show();
    }

    function showPrevVin() {
        vins.eq(currentVinIndex).hide();
        currentVinIndex = (currentVinIndex - 1 + vins.length) % vins.length;
        vins.eq(currentVinIndex).show();
    }

    $('#prev-vin').click(showPrevVin);
    $('#next-vin').click(showNextVin);
});
