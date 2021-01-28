// variable for submit button - ticketmasters
var getEvents = document.getElementById('getEvents');

// ticketmaster fetch functionality
function generateURL (event) {
    event.preventDefault();
    var apiKey = 'WPcvWaSga9OR6jQP2PDNVNimKtFhAaMj';
    var site = [(`https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}`)];
    addKeyword(site);
}

// https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0

// function to add keyword taking url array
function addKeyword(key) {
    var keywordInput = document.querySelector('#eventKeyword');
    if (!keywordInput.value) {
            zipCode(key);
    } else {
            var placeholder = keywordInput.value;
            var input = placeholder.toLowerCase();
            var keyword = input.split(" ");
            var str1 = keyword.join("%20"); 
            key.push("&keyword=", str1);
            zipCode(key);
    }
}
// &keyword=transiberian%20orchestra

// function to add zipcode taking url array
function zipCode (zip) {
    var zipInput = document.getElementById('eventZip').value;
    if (!zipInput) {
        radius(zip);
    } else {
        zip.push("&postalCode=", zipInput);
        radius(zip);
    }
};
// &postalCode=66757

// function to add radius (default = 25 miles if no input) taking url array from ^
// NOTE: ticketmaster includes "&locale=*" here even if no locale entered and we're not including that option
function radius(mi) {
    var radius = document.getElementById('eventDistance').value;
    if (!radius) {
        mi.push("&radius=25&locale=*");
        rangeStart(mi);
    } else {
        mi.push("&radius=", radius, "&locale=*");
        rangeStart(mi);
    }
};
// &radius=50&locale=*

// function to add start date taking url array
function rangeStart(start) {
    var c = document.getElementById('startDateTime').value;
    if (!c) {
        rangeEnd(start);
    } else {
        start.push("&startDateTime=", c, "T05:00:00Z");
        rangeEnd(start);
    }
};
// &startDateTime=2021-10-01T09:57:00Z

// function to add start date taking url array
function rangeEnd(end) {
    var f = document.getElementById('endDateTime').value;
    if (!f) {
        addCity(end);
    } else {
        end.push("&endDateTime=", f, "T05:00:00Z");
        addCity(end);
    }
};
// &endDateTime=2021-12-01T08:23:00Z

// function to add city taking url array
function addCity(city) {
    var cityInput = document.getElementById('eventCity').value;
    if (!cityInput) {
        addState(city);
    } else {
        var place = cityInput.toLowerCase();
        city.push("&city=", place);
        addState(city);
    }
};
// &city=tulsa

// function to add stateInput taking url array
function addState(state) {
    var stateInput = document.getElementById('eventState').value;
    if (!stateInput) {
        join(state);
    } else {
        var biggerPlace = stateInput.toLowerCase();
        state.push("&stateCode=", biggerPlace);
        join(state);
    }
};
// &stateCode=OK

// function to join into string for fetch
function join(ny) {
    var url = ny.join("");
    console.log(url);
    eventFetch(url);
    
};

// function to fetch events from ticketmaster
function eventFetch(call) {
    console.log(call);
    fetch(call)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if(!data._embedded) {
            var eventDisplay = document.getElementById('populateEvents');
            var respo = document.createElement('h2');
            var negative = document.createTextNode('No events located. Please try different search criteria.');
            respo.appendChild(negative);
            eventDisplay.appendChild(respo);
        } else {
           displayOptions(data); 
        }
})}



//      display responses: need a div class=row under the h2 class=header Events to choose from
// container row needs id="populateEvents"
function displayOptions(data) {
    var eventDisplay = document.getElementById('populateEvents');
    var thing = data._embedded.events //this is an array
    for(var i=0; i<thing.length; i++) {
        // create event card class = card medium
        var optionCard = document.createElement('div'); // card for each event pulled from tm
        optionCard.setAttribute('class', 'card medium col s12 m6');
        // make, fill, and append image div class= card-image
        var imageDiv = document.createElement('div');
        imageDiv.setAttribute('class', 'card-image');
        var image = document.createElement('img');
        var pictures = thing[i].images; //this is an array
        image.setAttribute('src', pictures[0].url);
        imageDiv.appendChild(image);
        optionCard.appendChild(imageDiv);
        // make, fill, and append title div class=card-title (does it need to be a span in the div?)
        var titleDiv = document.createElement('div');
        titleDiv.setAttribute('class', 'card-title');
        var titleText = document.createTextNode(thing[i].name);
        titleDiv.appendChild(titleText);
        optionCard.appendChild(titleDiv);
        // make details div with individual p-tags for location, date, time
        var detailsDiv = document.createElement('div');
        // fill and append details div
        var venue = document.createElement('p');
        var venueText = document.createTextNode(thing[i]._embedded.venues[0].name);
        venue.appendChild(venueText);
        detailsDiv.appendChild(venue);
        var town = document.createElement('p');
        var townText = document.createTextNode(thing[i]._embedded.venues[0].city.name);
        town.appendChild(townText);
        detailsDiv.appendChild(town);
        var when = document.createElement('p');
        var dateTime = new Date(thing[i].dates.start.dateTime);
        var whenText = document.createTextNode(dateTime.toLocaleDateString());
        when.appendChild(whenText);
        detailsDiv.appendChild(when);
        optionCard.appendChild(detailsDiv);
        // make and append selection button
        var selection = document.createElement('div');
        selection.setAttribute('class', 'card-action')
        var link = document.createElement('a');
        link.setAttribute('href', '#');
        var linkText = document.createTextNode('Plan date')
        link.appendChild(linkText);
        selection.appendChild(link);
        optionCard.appendChild(selection);
        // add event card to eventDisplay
        eventDisplay.appendChild(optionCard);
        var saveDetails = {'object': 'thingstosave'};
        console.log(saveDetails);
      }
    }


//      save selection > passing latlong to zomato search
//      display selection page somewhere
//      do we want to offer option here for saving search by name or wait until all parts are run?
//      do/can we save a partial "date" to complete later?

// // Here we run our AJAX call to the OpenWeatherMap API
// $.ajax({
// url: site,
// method: "GET"
// })

// // We store all of the retrieved data inside of an object called "response"
// .then(function(response) {
   
//     // Log the queryURL
//     console.log(site);

//     // Log the resulting object
//     console.log(response);

//     // Transfer content to HTML
//     $(".venueImage").html("Venue: " + response._embedded.events[0]._embedded.venues[0].images[0].url);
//     $(".name").text("Event Name: " + response._embedded.events[0].name);
//     $(".priceRanges").text("Price Ranges: Max: $" + response._embedded.events[0].priceRanges[0].max + " Min: $" + response._embedded.events[0].priceRanges[0].min);
//     $(".initialStartDate").text("Event Start Date:  " + response._embedded.events[0].dates.start.localDate + " Event Start Time: " + response._embedded.events[0].dates.start.localTime);

//     // Log the data in the console as well
//     console.log("Venue: " + response._embedded.events[0]._embedded.venues[0].images[0].url);
//     console.log("Event Name: " + response._embedded.events[0].name);
//     console.log("Price Ranges: Max: $" + response._embedded.events[0].priceRanges[0].max + " Min: $" + response._embedded.events[0].priceRanges[0].min);
//     console.log("Event Start Date:  " + response._embedded.events[0].dates.start.localDate + " Event Start Time: " + response._embedded.events[0].dates.start.localTime);
// });

getEvents.addEventListener("click", generateURL);
