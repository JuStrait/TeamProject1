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
        ifFamily(state);
    } else {
        var biggerPlace = stateInput.toLowerCase();
        state.push("&stateCode=", biggerPlace);
        ifFamily(state);
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
    .then(data => console.log(data));
//         .then(function(res){
//             console.log("inside");
//         // }).then(function(res){
//         //     console.log(res);
//         }).catch(function(){
//             console.log('error')
//         })
}


// next steps: pseudo-code
//      display responses
//      save selection > passing latlong to zomato search
//      display selection page somewhere
//      do we want to offer option here for saving search by name or wait until all parts are run?
//      do/can we save a partial "date" to complete later?

getEvents.addEventListener("click", generateURL);

    var apiKey = 'WPcvWaSga9OR6jQP2PDNVNimKtFhAaMj';
    var site = [(`https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}`)];

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
    url: site,
    method: "GET"
    })

    // We store all of the retrieved data inside of an object called "response"
    .then(function(response) {
       
        // Log the queryURL
        console.log(site);

        // Log the resulting object
        console.log(response);

        // Transfer content to HTML
        $(".venueImage").html("Venue: " + response._embedded.events[0]._embedded.venues[0].images[0].url);
        $(".name").text("Event Name: " + response._embedded.events[0].name);
        $(".priceRanges").text("Price Ranges: Max: $" + response._embedded.events[0].priceRanges[0].max + " Min: $" + response._embedded.events[0].priceRanges[0].min);
        $(".initialStartDate").text("Event Start Date:  " + response._embedded.events[0].dates.start.localDate + " Event Start Time: " + response._embedded.events[0].dates.start.localTime);

        // Log the data in the console as well
        console.log("Venue: " + response._embedded.events[0]._embedded.venues[0].images[0].url);
        console.log("Event Name: " + response._embedded.events[0].name);
        console.log("Price Ranges: Max: $" + response._embedded.events[0].priceRanges[0].max + " Min: $" + response._embedded.events[0].priceRanges[0].min);
        console.log("Event Start Date:  " + response._embedded.events[0].dates.start.localDate + " Event Start Time: " + response._embedded.events[0].dates.start.localTime);
    });


        // function displayEventInfo() {
        // var events = $(this).attr("data-name");
        // var site = "https://app.ticketmaster.com/discovery/v2/events?" + events + "apikey=WPcvWaSga9OR6jQP2PDNVNimKtFhAaMj";


        // Here we run our AJAX call to the OpenWeatherMap API
        // $.ajax({
        //     url: site,
        //     method: "GET"
        //     })
            
        //     // We store all of the retrieved data inside of an object called "response"
        //     .then(function(response) {

//          var eventDiv = $("<div>");

//          var venueImage = response._embedded.events[0]._embedded.venues[0].images[0].url;

//          var image = $("<img>").attr("src", venueImage);

//          eventDiv.append(image);

//          var name = response._embedded.events[0].name;

//          var pOne = $("<p>").text("Event Name: " + name);

//          eventDiv.append(pOne);

                   
//         var priceMax = response._embedded.events[0].priceRanges[0].max;

//         var priceMin = response._embedded.events[0].priceRanges[0].min;
                   
//         var pTwo = $("<p>").text("Price Ranges: Max: $" + priceMax + " Min: $" + priceMin);
         
                   
//         eventDiv.append(pTwo);
         
//         var intialStartDate = response._embedded.events[0].dates.start.localDate;

//         var intialStartTime = response._embedded.events[0].dates.start.localTime;
         
//         var pThree = $("<p>").text("Event Start Date: " + intialStartDate + " Event Start Time: " + intialStartTime);
         
//         eventDiv.append(pThree);

//         $("#event-info").prepend(eventDiv);
//     });

// }

