# brewery-finder

https://github.com/asan1111/brewery-finder 

Table of Contents:
Overview
Screenshot
External API
Unsolved Problems
Future Features

Overview
This is a simple Brewery finder with the ability to favourite special places 
- web app that allows users to search for breweries using some parameters: brewery name, city, and
  country. It uses  Open Brewery DB as the API to fetch data and display it in a simple interface.

- Functionality: Users can enter a brewery name, city, and country to search for breweries.

- Brewery Listings: The app displays brewery cards, containing information such as the brewery
  name, type, city, state, and a link to the brewery's website.

- Favorite Breweries: Users can mark breweries as favorites by clicking the "Add to Favorites"
 (This action stores the favorite breweries locally using localStorage in the browser.)

- Favorites Section: A dedicated "Favorites" section on the right-hand side of the page shows a 
  list of the user's favorite breweries. This list will update in real-time as the user adds or 
  removes favorites.

![BreweryFinder](https://github.com/asan1111/brewery-finder/assets/167013895/2a454f75-448d-4863-a85a-97d44e172e22)


External API
https://www.openbrewerydb.org/

Unsolved Problems
Search needs fine tuning
More Details

Future Features
Users can make comments on Favorited Breweries
Users can use more details to search
Users can upload Breweries



  Pseudocode
  Initialize variables:
- searchForm
- searchInput
- breweryContainer
- favoritesContainer
- favoritesList
- favorites (Array to store favorite brewery IDs)

Load favorites from localStorage:
- Check if localStorage has 'favorites' key
- If yes, parse 'favorites' from localStorage and assign to favorites array
- If no, initialize favorites array as empty

Function renderBreweries(breweries):
    
    For each brewery in breweries:
        Create breweryElement
        Set breweryElement content with brewery information
        Append breweryElement to breweryContainer
        Add event listener to favorite button:
            - Toggle favorite status
            - Update favorite button text

Function toggleFavorite(breweryId):
    If breweryId is in favorites:
        Give status by showing Remove breweryId from favorites
    Else:
        Show Add breweryId to favorites
    Update favorites in localStorage
Function renderFavorites():
    Clear favoritesList
    For each favoriteId in favorites:
        Get brewery details from allBreweries using favoriteId
        Create favoriteItem with brewery details
        Append favoriteItem to favoritesList
        Add event listener to remove button:
            - Toggle favorite status
            - Update favorites list
            - Update favorite button in breweryContainer

Function fetchAndRenderAllBreweries():
    Fetch all breweries from API
    Parse response as JSON
    Store all breweries in allBreweries
    Render all breweries using renderBreweries()
