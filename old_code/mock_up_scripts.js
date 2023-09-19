document.addEventListener('DOMContentLoaded', () => {
    // Mock data for demonstration purposes
    const restaurants = [
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
    restaurants.sort((a, b) => b.score - a.score);
  
    // Function to create a chart
    const createChart = (elementId, labels, data) => {
      const chartCtx = document.getElementById(elementId).getContext('2d');
      const chart = new Chart(chartCtx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Scores',
            data: data,
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
    };
  
    // Create the chart for the top 10 restaurants
    const topScores = restaurants.slice(0, 10).map(restaurant => restaurant.score);
    const topLabels = restaurants.slice(0, 10).map(restaurant => restaurant.name);
    createChart('topChart', topLabels, topScores);
  
    // Create the chart for the worst 10 restaurants
    const worstScores = restaurants.slice(-10).map(restaurant => restaurant.score);
    const worstLabels = restaurants.slice(-10).map(restaurant => restaurant.name);
  
    // Reverse the arrays to graph in reverse order
    worstScores.reverse();
    worstLabels.reverse();
  
    createChart('worstChart', worstLabels, worstScores);
  
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');
  
    // Function to perform the search
    const performSearch = () => {
      // Clear previous search results
      searchResults.innerHTML = '';
  
      const query = searchInput.value.toLowerCase();
  
      // Filter restaurants based on search query
      const filteredRestaurants = restaurants.filter(restaurant =>
        restaurant.name.toLowerCase().includes(query)
      );
  
      // Sort the filtered restaurants in ascending order based on names
      filteredRestaurants.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
  
      // Display search results
      filteredRestaurants.forEach(restaurant => {
        const listItem = document.createElement('li');
        listItem.textContent = `${restaurant.name} - ${restaurant.score}`;
        searchResults.appendChild(listItem);
      });
    };
  
    // Event listener for search button click
    searchButton.addEventListener('click', performSearch);
  
    // Event listener for Enter key press in search input field
    searchInput.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        performSearch();
      }
    });
  });
  