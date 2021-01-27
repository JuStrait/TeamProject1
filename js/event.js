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

// function to add family friendly taking url array.
function ifFamily(yn) {
    var familyEvents = document.getElementById('familyEvents').value;
    if (!familyEvents) {
        join(yn);
    } else {
        yn.push("&includeFamily=yes");
        join(yn);
    }
};
// &includeFamily=yes

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
        // console.log(data._embedded);
        displayOptions(data);
// //         .then(function(res){
// //             console.log("inside");
// //         // }).then(function(res){
// //         //     console.log(res);
// //         }).catch(function(){
// //             console.log('error')
// //         })
})}


//      display responses: need a div class=row under the h2 class=header Events to choose from
// container row needs id="populateEvents"
function displayOptions(data) {
    var eventDisplay = document.getElementById('populateEvents');
    var thing = data._embedded.events //this is an array
    for(var i=0; i<thing.length; i++) {
        var optionCard = document.createElement('div');
        optionCard.className = "col s12 m6";
        //   div for card size (class="card small")
        var cardSize = document.createElement('div');
        cardSize.className = "card medium";
        // //   div for image (class="card-image") includes img and span
        var imageSpot = document.createElement('div');
        imageSpot.className = "card-image";
        // //  img src
        var pic = document.createElement('img');
        var pictures = thing[i].images;
        pic.setAttribute('src', pictures[0].url);
        // //   span for Title (class="card-title")
        var what = document.createElement('span');
        what.className = ("card-title");
        what.textContent = thing[i].name;
        console.log(thing[i].name);
        // //   div for content (class="card-content")
        // //   div for selection (class="card-action")

        // // appendChild image div to cardSize div
        imageSpot.appendChild(pic);
        // imageSpot.appendChild(span)
        imageSpot.appendChild(what);

        // appendChild content div to cardSize;
        cardSize.appendChild(imageSpot);
        // // appendChild selection div to cardSize
        // // append cardSize div to optionCard
        optionCard.appendChild(cardSize);
        // append optionCard div to location
        eventDisplay.appendChild(optionCard);
      }
      }

//      save selection > passing latlong to zomato search
//      display selection page somewhere
//      do we want to offer option here for saving search by name or wait until all parts are run?
//      do/can we save a partial "date" to complete later?

getEvents.addEventListener("click", generateURL);
