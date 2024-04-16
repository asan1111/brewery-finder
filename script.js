// // Define constants
// const API_URL = 'https://api.openbrewerydb.org/breweries';

// // Initialize variables
// let breweriesData = [];

// // Fetch Brewery Data Function
// function fetchBreweryData() {
//     fetch(API_URL)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Failed to fetch brewery data');
//             }
//             return response.json();
//         })
//         .then(data => {
//             breweriesData = data;
//             displayBreweries(breweriesData);
//         })
//         .catch(error => {
//             console.error('Error:', error);
//             alert('Failed to fetch brewery data. Please try again later.');
//         });
// }

// // Display Breweries Function
// function displayBreweries(breweries) {
//     const container = document.getElementById('brewery-container');
//     container.innerHTML = ''; // Clear previous listings

//     breweries.forEach(brewery => {
//         const breweryElement = document.createElement('div');
//         breweryElement.classList.add('brewery');

//         // Construct brewery details HTML
//         const breweryHTML = `
//             <h2>${brewery.name}</h2>
//             <p>${brewery.city}, ${brewery.state}</p>
//             <p>Type: ${brewery.brewery_type}</p>
//             <p>Phone: ${brewery.phone}</p>
//             <p><a href="${brewery.website_url}" target="_blank">Website</a></p>
//         `;

//         breweryElement.innerHTML = breweryHTML;
//         container.appendChild(breweryElement);
//     });
// }

// // Search Breweries Function
// function searchBreweries(query) {
//     const filteredBreweries = breweriesData.filter(brewery =>
//         brewery.name.toLowerCase().includes(query.toLowerCase())
//     );
//     displayBreweries(filteredBreweries);
// }

// // Get Search Query Function
// function getSearchQuery() {
//     const searchInput = document.getElementById('search-input');
//     return searchInput.value.trim();
// }

// // Event listener for search input
// document.getElementById('search-form').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const query = getSearchQuery();
//     searchBreweries(query);
// });

// // Initialize app
// fetchBreweryData();
// Force MIME type for styles.css

document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('searchInput');
    const breweryContainer = document.getElementById('breweryContainer');
    const favoritesContainer = document.getElementById('favoritesContainer');
    const favoritesList = document.getElementById('favoritesList');

    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Function to render breweries
    function renderBreweries(breweries) {
        breweryContainer.innerHTML = '';
        breweries.forEach(brewery => {
            const breweryElement = document.createElement('div');
            breweryElement.classList.add('brewery');
            breweryElement.innerHTML = `
                <h2>${brewery.name}</h2>
                <p><strong>Type:</strong> ${brewery.brewery_type}</p>
                <p><strong>City:</strong> ${brewery.city}</p>
                <p><strong>State:</strong> ${brewery.state}</p>
                <a href="${brewery.website_url}" target="_blank">Visit Website</a>
                <button class="favorite-btn" data-id="${brewery.id}">${favorites.includes(brewery.id) ? 'Remove from Favorites' : 'Add to Favorites'}</button>
            `;
            breweryContainer.appendChild(breweryElement);

            // Add event listener for favorite button
            const favoriteBtn = breweryElement.querySelector('.favorite-btn');
            favoriteBtn.addEventListener('click', () => {
                toggleFavorite(brewery.id);
                if (favorites.includes(brewery.id)) {
                    favoriteBtn.textContent = 'Add to Favorites';
                } else {
                    favoriteBtn.textContent = 'Remove from Favorites';
                }
                renderFavorites(); // Update favorites list
            });
        });
    }

    // Function to toggle favorites
    function toggleFavorite(id) {
        if (favorites.includes(id)) {
            favorites = favorites.filter(fav => fav !== id);
        } else {
            favorites.push(id);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    // Function to render favorites
    function renderFavorites() {
        favoritesList.innerHTML = ''; // Clear existing list
        favorites.forEach(id => {
            const brewery = allBreweries.find(b => b.id === id);
            if (brewery) {
                const favoriteItem = document.createElement('li');
                favoriteItem.innerHTML = `
                    <p>${brewery.name}</p>
                    <a href="${brewery.website_url}" target="_blank">Visit Website</a>
                    <button class="remove-btn" data-id="${brewery.id}">Remove</button>
                `;
                favoritesList.appendChild(favoriteItem);

                // Add event listener for remove button
                const removeBtn = favoriteItem.querySelector('.remove-btn');
                removeBtn.addEventListener('click', () => {
                    toggleFavorite(brewery.id);
                    renderFavorites(); // Update favorites list
                    // Update the brewery button to "Add to Favorites" after removing from favorites
                    const breweryBtn = breweryContainer.querySelector(`.favorite-btn[data-id="${brewery.id}"]`);
                    if (breweryBtn) {
                        breweryBtn.textContent = 'Add to Favorites';
                    }
                });
            }
        });

        // Always show favorites container
        favoritesContainer.style.display = 'block';
    }

    // Event listener for form submission
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm === '') {
            alert('Please enter a search term');
            return;
        }

        try {
            const response = await fetch(`https://api.openbrewerydb.org/breweries?by_name=${searchTerm}`);
            const data = await response.json();
            renderBreweries(data);
            allBreweries = data; // Store all breweries for later use
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    });

    // Initial render
    let allBreweries = [];
    renderFavorites(); // Render favorites on page load

    // Render all breweries initially
    async function fetchAndRenderAllBreweries() {
        try {
            const response = await fetch('https://api.openbrewerydb.org/breweries');
            const data = await response.json();
            allBreweries = data;
            renderBreweries(allBreweries);
        } catch (error) {
            console.error('Error fetching breweries:', error);
        }
    }

    fetchAndRenderAllBreweries(); // Fetch and render all breweries initially

    // Update favorite button text immediately when favorited
    breweryContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('favorite-btn')) {
            const breweryId = event.target.getAttribute('data-id');
            toggleFavorite(breweryId);
            if (favorites.includes(breweryId)) {
                event.target.textContent = 'Remove from Favorites';
            } else {
                event.target.textContent = 'Add to Favorites';
            }
            renderFavorites(); // Update favorites list
        }
    });

});
