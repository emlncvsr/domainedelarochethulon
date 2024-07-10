$(document).ready(function() {
    // Implementing the carousel functionality for vins section
    let currentIndex = 0;
    const vinItems = $('.vin-item');
    const totalItems = vinItems.length;
  
    function showVin(index) {
      vinItems.hide();
      $(vinItems[index]).show();
    }
  
    $('#prev-vin').click(function() {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1;
      showVin(currentIndex);
    });
  
    $('#next-vin').click(function() {
      currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
      showVin(currentIndex);
    });
  
    // Initialize carousel
    showVin(currentIndex);
  });
  