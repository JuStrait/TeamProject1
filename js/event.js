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
        // create card for each event option
        var optionCard = document.createElement('div');
        optionCard.className = "col s12 m6";
        // create card size div
        var cardSize = document.createElement('div');
        cardSize.className = "card medium";
        // create div for image
        var imageSpot = document.createElement('div');
        imageSpot.className = "card-image";
        // create image and append to div for image
        var pic = document.createElement('img');
        var pictures = thing[i].images;
        pic.setAttribute('src', pictures[0].url);
        imageSpot.appendChild(pic);
        // create div for event details
        var eventDetails = document.createElement('div');
        // create span for title, attach title
        var what = document.createElement('span');
        what.className = ("card-title");
        var titleName = document.createTextNode(thing[i].name);
        what.appendChild(titleName);
        // append title div to event details
        eventDetails.appendChild(what);
        // create div for venue
        var where = document.createElement('div');
        var whereTxt = document.createTextNode(thing[i]._embedded.venues.name);
        where.appendChild(whereTxt);
        // append venue div to event details div
        eventDetails.appendChild(where);
        // create div for date and time
        // var when = document.createElement('div');
        // var d = new Date(thing[i].dates.start.localDate);
        // var whenTxt = document.createTextNode(d.toLocaleString);
        // console.log(whenTxt);
        // when.appendChild(whenTxt);


        // // append dateTime div to details div
        // eventDetails.appendChild(when);
        // create link div 
        var links = document.createElement('div');
        links.setAttribute('class', 'card-action');
        // create links, attach to div
        var theLink = document.createElement('a');
        theLink.setAttribute('value', thing[i].id);
        theLink.setAttribute('href', '#')
        // append div with image to card size div
        cardSize.appendChild(imageSpot);
        // append event details div to card size div
        cardSize.appendChild(eventDetails);
        // append links div to card size div

        // append card size div to event option card
        // append event option card to eventDisplay area
        // append optionCard div to location
        eventDisplay.appendChild(optionCard);
        optionCard.appendChild(cardSize);
        // eventDetails.appendChild(time);

        imageSpot.appendChild(pic);


        // cardSize.appendChild(select);

        // appendChild content div to cardSize;
        cardSize.appendChild(imageSpot);
        cardSize.appendChild(eventDetails);
        // make and append selection button

        // // appendChild selection div to cardSize
      }
      }



// next steps: pseudo-code
//      display responses
//      save selection > passing latlong to zomato search
//      display selection page somewhere
//      do we want to offer option here for saving search by name or wait until all parts are run?
//      do/can we save a partial "date" to complete later?

getEvents.addEventListener("click", generateURL);
