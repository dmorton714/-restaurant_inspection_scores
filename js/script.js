document.addEventListener('DOMContentLoaded', function() {
  // Initialize the restaurants array
  var restaurants = [];

  // Function to process the retrieved data from the Python script
  function processData(data) {
    // Parse the JSON data
    var processedData = JSON.parse(data);

    // Update the restaurants array with the processed data
    restaurants = processedData;

    // Sort the restaurants based on scores in descending order
    restaurants.sort(function(a, b) {
      return b.score - a.score;
    });

    // Create the chart for the top 10 restaurants
    var topScores = restaurants.slice(0, 10).map(function(restaurant) {
      return restaurant.score;
    });

    var topLabels = restaurants.slice(0, 10).map(function(restaurant) {
      return restaurant.EstablishmentName;
    });

    var topChartCtx = document.getElementById('topChart').getContext('2d');
    var topChart = new Chart(topChartCtx, {
      type: 'bar',
      data: {
        labels: topLabels,
        datasets: [{
          label: 'Scores',
          data: topScores,
          backgroundColor: '#FF9800',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Scores'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Restaurants'
            }
          }
        }
      }
    });

    // Create the chart for the worst 10 restaurants
    var worstScores = restaurants.slice(-10).map(function(restaurant) {
      return restaurant.score;
    });

    var worstLabels = restaurants.slice(-10).map(function(restaurant) {
      return restaurant.EstablishmentName;
    });

    var worstChartCtx = document.getElementById('worstChart').getContext('2d');
    var worstChart = new Chart(worstChartCtx, {
      type: 'bar',
      data: {
        labels: worstLabels,
        datasets: [{
          label: 'Scores',
          data: worstScores,
          backgroundColor: '#FF9800',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
            title: {
              display: true,
              text: 'Scores'
            }
          },
          x: {
            title: {
              display: true,
              text: 'Restaurants'
            }
          }
        }
      }
    });

  }

  // Function to make the AJAX request to fetch the processed data from the Python script
  function fetchData() {
    // Make the AJAX request
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Call the processData function to update the restaurants array and create the charts
        processData(xhr.responseText);
      }
    };
    xhr.open('GET', 'processed_data.json', true);  
    xhr.send();
  }

  // Call the fetchData function to retrieve the processed data and create the charts
  fetchData();


});
