// variable for submit button - ticketmasters
var getEvents = document.getElementById('getEvents');
var chooseEvent = document.getElementById('populateEvents');
var seeSaved = document.getElementById('savedStuff');


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
    eventDisplay.setAttribute('class', 'container')
    var eventDivTitle = document.createElement('h2');
    var divTitleText = document.createTextNode('Events to Choose From')
    eventDivTitle.appendChild(divTitleText);
    eventDisplay.appendChild(eventDivTitle);

    var thing = data._embedded.events //this is an array
    for(var i=0; i<thing.length; i++) {
        // create event card class = card medium
        var optionCard = document.createElement('div'); // card for each event pulled from tm
        optionCard.setAttribute('class', 'card medium col s12 m6 ');
        optionCard.setAttribute('value', i) //assigning value from array to connect click
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
        // add event card to eventDisplay
        eventDisplay.appendChild(optionCard);
        optionCard.addEventListener("click", function(ev) {
          ev.preventDefault();
          var x = this.getAttribute('value');
          var data = thing[x];
          console.log(data);
          saveChoice(data);
        //   function to save event and move to next api using the thing here
      }) 
      }
    }

// need event listener on chooseEvent, create value object by save as name with id#, name of event, location info, date
function saveChoice (info) {
    var saveAs = prompt("What name would you like to save for this date?");
    if (!saveAs) {
        return;
    } else {
    console.log(info);
    var date = saveAs.toUpperCase();
    var deets = {
        "id": info.id,
        "title": info.name,
        "date": info.dates.start.localDate,
        "venue": info._embedded.venues[0].name,
        "postalCode": info._embedded.venues[0].postalCode,
        "url": info.url,
        "img": info.images[0].url,
    };
    var key = 'savedDates';
    var item = [date, deets];
    var storage = localStorage.getItem(key);
    var dates = [];
    if (storage) {
        dates = JSON.parse(storage);
    }
    dates.push(item);
    localStorage.setItem(key, JSON.stringify(dates));
    };
    console.log(dates);
    return "food.html";
    }

    // Display saved event list:
function getSaved(ev) {
    ev.preventDefault();
    var key = 'savedDates';
    var storage = localStorage.getItem(key);
    if (storage) {
        dates = JSON.parse(storage);
    }
    showSaved(dates);
}

function showSaved(dateItems) {
    var saveDisplay = document.getElementById('populateEvents');
    saveDisplay.innerHTML = '';
    saveDisplay.setAttribute('class', 'container');
    var saveDivTitle = document.createElement('h2');
    var saveTitleText = document.createTextNode('Your Saved Events')
    saveDivTitle.appendChild(saveTitleText);
    saveDisplay.appendChild(saveDivTitle);
    var stuff = dateItems;
    for (var i = 0; i<stuff.length; i++) {
        console.log(stuff[i]);
        var saveCard = document.createElement('div');
        saveCard.setAttribute('class', 'card-panel row col s12 m8');
        saveCard.setAttribute('id', i);
// 
        var picDiv = document.createElement('div');
        picDiv.setAttribute('class', 'col s2');
        var picCircle = document.createElement('img');
        picCircle.setAttribute('class', 'circle responsive-img');
        picCircle.setAttribute('src', stuff[i][1].img);
        picDiv.appendChild(picCircle);
        saveCard.appendChild(picDiv);
// 
        var detailsDiv = document.createElement('div');
        detailsDiv.setAttribute('class', 'col s10');
        var nameEvent = document.createElement('h3');
        nameEvent.setAttribute('class', 'card-title');
        var namename = stuff[i][0];
        var nameTitle = document.createTextNode(namename);
        
        nameEvent.appendChild(nameTitle);
        detailsDiv.appendChild(nameEvent);
        // 
        var dateSpace = document.createElement('p');
        var dateTime = new Date(stuff[i][1].date);
        var datedate = document.createTextNode(dateTime.toLocaleDateString());
        dateSpace.appendChild(datedate);
        detailsDiv.appendChild(dateSpace);
// 
        var location = document.createElement('p');
        var locText = document.createTextNode(stuff[i][1].venue);
        location.appendChild(locText);
        detailsDiv.appendChild(location);
// 
        // var link = document.createElement('a');
        // var linkText = document.createTextNode('Click to purchase tickets from TicketMasters');
        // link.setAttribute('href', stuff[i][1].url);
        // link.appendChild(linkText);
        // detailsDiv.appendChild(link)
// 
        saveCard.appendChild(detailsDiv);
        saveDisplay.appendChild(saveCard);
    }
}

//      save selection > passing latlong to zomato search
//      display selection page somewhere
//      do we want to offer option here for saving search by name or wait until all parts are run?
//      do/can we save a partial "date" to complete later?


getEvents.addEventListener("click", generateURL);
seeSaved.addEventListener("click", getSaved);
