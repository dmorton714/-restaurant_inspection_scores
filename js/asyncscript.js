document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch the processed_data from the local file
    const fetchedData = await fetch('processed_data.json')
    const data = await fetchedData.json();
    const restaurants = JSON.parse(data).sort((a, b) => (b.score - a.score));
    // Function to create a chart
    const createChart = (elementId, labels, data) => {
      const chartCtx = document.getElementById(elementId).getContext('2d');
      new Chart(chartCtx, {
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
    const topLabels = restaurants.slice(0, 10).map(restaurant => restaurant.EstablishmentName);
    createChart('topChart', topLabels, topScores);

    // Create the chart for the worst 10 restaurants
    const worstScores = restaurants.slice(-10).map(restaurant => restaurant.score).reverse();
    const worstLabels = restaurants.slice(-10).map(restaurant => restaurant.EstablishmentName).reverse();
    createChart('worstChart', worstLabels, worstScores);

    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');

    // Function to perform the search
    const performSearch = () => {
      // Clear previous search results
      searchResults.innerHTML = '';
      const query = searchInput.value.toLowerCase();
      const filteredRestaurants = restaurants.filter((restaurant) => {
        return restaurant.EstablishmentName.toLowerCase().includes(query)
      });
      // Sort the filtered restaurants in ascending order based on names
      filteredRestaurants.sort((a, b) => {
        const nameA = a.EstablishmentName.toLowerCase();
        const nameB = b.EstablishmentName.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
      // Display search results
      filteredRestaurants.forEach((restaurant) => {
        const listItem = document.createElement('li');
        const nameElement = document.createElement('span');
        nameElement.textContent = `${restaurant.EstablishmentName} - ${restaurant.score}`;
        const addressElement = document.createElement('span');
        addressElement.textContent = restaurant.Address;
        listItem.appendChild(nameElement);
        listItem.appendChild(document.createElement('br'));
        listItem.appendChild(addressElement);
        searchResults.appendChild(listItem);
      });
    };

    // Event listener for Enter key press in search input field
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keydown', event => {
      if (event.key === 'Enter') {
        performSearch();
      }
    });
  } catch(err) {
    console.error('Error fetching processed_data:', err);
  }
});

    