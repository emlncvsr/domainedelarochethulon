$(document).ready(function () {
    let currentVinIndex = 0;
    const vinItems = $('.vin-item');
    const totalVins = vinItems.length;

    function displayVin(index) {
        vinItems.hide();
        vinItems.eq(index).show();
    }

    function showNextVin() {
        currentVinIndex = (currentVinIndex + 1) % totalVins;
        displayVin(currentVinIndex);
    }

    function showPrevVin() {
        currentVinIndex = (currentVinIndex - 1 + totalVins) % totalVins;
        displayVin(currentVinIndex);
    }

    $('#prev-vin').click(showPrevVin);
    $('#next-vin').click(showNextVin);

    displayVin(currentVinIndex); // Initial display
});
