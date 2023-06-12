document.addEventListener('DOMContentLoaded', function() {
  // Mock data for demonstration purposes
  var restaurants = [
    { name: 'Restaurant 1', score: 95 },
    { name: 'Restaurant 2', score: 88 },
    { name: 'Restaurant 3', score: 78 },
    { name: 'Restaurant 4', score: 82 },
    { name: 'Restaurant 5', score: 90 },
    { name: 'Restaurant 6', score: 65 },
    { name: 'Restaurant 7', score: 92 },
    { name: 'Restaurant 8', score: 75 },
    { name: 'Restaurant 9', score: 80 },
    { name: 'Restaurant 10', score: 94 },
    { name: 'Restaurant 11', score: 45 }
  ];

  // Sort the restaurants based on scores in descending order
  restaurants.sort(function(a, b) {
    return b.score - a.score;
  });

  // Create the chart for the top 10 restaurants
  var topScores = restaurants.slice(0, 10).map(function(restaurant) {
    return restaurant.score;
  });

  var topLabels = restaurants.slice(0, 10).map(function(restaurant) {
    return restaurant.name;
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
    return restaurant.name;
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

  var searchInput = document.getElementById('searchInput');
  var searchButton = document.getElementById('searchButton');
  var searchResults = document.getElementById('searchResults');

  // Function to perform the search
  function performSearch() {
    // Clear previous search results
    searchResults.innerHTML = '';

    var query = searchInput.value.toLowerCase();

    // Filter restaurants based on search query
    var filteredRestaurants = restaurants.filter(function(restaurant) {
      return restaurant.name.toLowerCase().includes(query);
    });
    
  // Sort the filtered restaurants in ascending order based on names
  filteredRestaurants.sort(function(a, b) {
    var nameA = a.name.toLowerCase();
    var nameB = b.name.toLowerCase();
    if (nameA < nameB) return -1;
    if (nameA > nameB) return 1;
    return 0;
  });

    // Display search results
    filteredRestaurants.forEach(function(restaurant) {
      var listItem = document.createElement('li');
      listItem.textContent = restaurant.name + ' - ' + restaurant.score;
      searchResults.appendChild(listItem);
    });
  }

  // Event listener for search button click
  searchButton.addEventListener('click', function() {
    performSearch();
  });

  // Event listener for Enter key press in search input field
  searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      performSearch();
    }
  });
});
