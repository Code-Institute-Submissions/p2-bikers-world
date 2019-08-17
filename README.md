# [Biker's World](https://naturaldev0.github.io/p2-bikers-world/)

A bike-sharing locator that help users to discover where are the bicycles located within the city.
They can be located via these search fields stated below so that search results can be precised to what they need.
<ul>
    <li>Country</li>
    <li>City</li>
    <li>State</li>
    <li>Town</li>
</ul>

And, it comes with a mini forum for users to view incidents reported by other users around the globe.
They are arranged in these categories,
 <ul>
    <li>Theft</li>
    <li>Hazards</li>
    <li>Crash</li>
    <li>Infrastructure Issue</li>
    <li>Chop Shop</li>
</ul>
<br>

## UI/UX   
 
User Stories:
---> <i>(e.g. As a user type, I want to perform an action, so that I can achieve a goal.)</i>
1. As a commuter, I want to search for shared bicycles location, so that I know where to rent them while travel across the globe.
2. As a commuter, I want to search for current location, so that I know where is my current location.
3. As a commuter, I want to search for shared bicycles near me, so that I can rent them.
4. As a commuter, I want to search for bicycle incidents report, so that I know the latest news around the neigborhood or country.
5. As a commuter, I want to search for different types of bicycle incident reports, so that I can filter to the right information.

<br>


## Features

In this section, you should go over the different parts of your project, and describe each in a sentence or so.

 
### Existing Features

Users can ...
- Feature #1 - View all the available bicycle locations around the globe when they clicked on "Locate Bikes" button.
- Feature #2 - View current location within the map when they clicked on "Current Location" button.
- Feature #3 - Search for another location within the map through the search field.
- Feature #4 - Search for incident that matches the search query.
- Feature #5 - View different types of incident when they search through the input field under "Incidents" section of the selected type on the dropdown within "Advanced Options" collapsible button.
- Fetaure #6 - Search for a location on the map in the "Venue" section through the input field.

#### Future
1. Locate the bicycles
    1. within a certain radius of searched location
    2. within a certain radius of current location


### Features Left to Implement
<i>
    Due to time constraints and challenges... Below here are the features I wished to implement. 
</i>

1. Locate the bicycles
    1. within a certain radius of searched location
    2. within a certain radius of current location

<br>

## Technologies Used

- HTML
- CSS
- JavaScript
- [Bootstrap v4.3.1](https://getbootstrap.com/)
    - Simplify and Rapid prototype on website's styling
- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.
- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial)
- API(s)
    - [CityBike](https://api.citybik.es/v2/)
    - [BikeWise](https://bikewise.org/documentation/api_v2)
- AWS Cloud9 (IDE)
- Microsoft VS Code (Editor)

<br>

## Testing

These are the tests I have done so far...

Manual Test
1. Index (index.html)
    1. Launch the html page by previewing it on a new tab of the browser, and ensure there isn't any occurrence of errors.
2. App (app.js)
    1. Tested the script by viewing through the inspector's console. Make sure there is not any known errors.
    2. Tested with JSLint, apart from code format error, nothing critcal shows up.

Screen Test (Different screen sizes and browser)
1. Screen
    1. 'div' element with 'map' id ... size changes when screen size is equivalent,
        1. <i>(576px and below)</i>, map height will change to 400px
        2. <i>(768px and below)</i>, map height will change to 300px
        3. <i>(1024px and below)</i>, map height will change to 400px
        4. <i>(1024px and below)</i>, map height will change to 600px

<br>

## Deployment

- The website is currently deployed on Github pages, and developed on AWS Cloud 9 IDE platform. Occasionally, I would perform some lightweight code edits using Microsoft Visual Studio Code.

### Steps deployment

1. Create a new repository for your project on your local computer.
    ```
    git init .                  // initialize repo with all files
    git add .                   // add all files into local staging
    git status                  // check if any files are left out before commiting
    git commit -m "message"     // commit change with message of your files into repo
    ```
2. Add your remote git link for uploading your files onto Github later on.
    ```
    git remote add origin <your-remote-git-link>    // add your remote repo link
    ```
3. Push your files onto your remote
    ```
    git push -u origin master   // upload your files into your remote repo
    ```

4. Should you have the interest to work the files offline, you can do so by cloning a copy.
    ```
    git clone <remote-link>     // Clone the selected repo offline
    ```

NOTE: All commits are pushed to master branch, as currently there is no intention of creating new branches.
<br><br>


## Credits

### Content
- All contents on the website were written by me.

### Media
- Mountain bike icon for the navbar, taken from [flaticon](https://www.flaticon.com/free-icon/mountain-bike_1947458)

### Acknowledgements
- [Stack Overflow](https://stackoverflow.com/)
- [W3Schools](https://www.w3schools.com/)

<b>This is for educational use.</b>