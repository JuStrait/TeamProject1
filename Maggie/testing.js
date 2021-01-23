var getEvents = document.getElementById('getEvents');

// input location variables
var keywordInput = document.getElementById('eventKeyword');
var cityInput = document.getElementById('eventCity');
var stateInput = document.getElementById('eventState');
var zipInput = document.getElementById('eventZip');
var radius = document.getElementById('eventDistance');
var startMonth = document.getElementById('eventMonth01');
var startDate = document.getElementById('eventDate01');
var startYear = document.getElementById('eventYear01');
var endMonth = document.getElementById('eventMonth02');
var endDate = document.getElementById('eventDate02');
var endYear = document.getElementById('eventYear02');
var familyEvents = document.getElementById('familyEvents');


function rangeStart() {
        var d = new Date();
        d.setFullYear((startYear.value), (startMonth.value), (startDate.value));
        
};

function rangeEnd() {
        var f = new Date();
        f.setFullYear((startYear.value), (startMonth.value), (startDate.value));

};


function generateURL() {
        var apiKey = WPcvWaSga9OR6jQP2PDNVNimKtFhAaMj;
        var site = (`https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}`);
        if (keywordInput.value != "") {
                var keyword
        }
        
        
}

// generated for search starting oct 1, tulsa, ok, transiberianOrchestra
// https://app.ticketmaster.com/discovery/v2/events?apikey=WPcvWaSga9OR6jQP2PDNVNimKtFhAaMj&keyword=transiberian%20orchestra&locale=*&startDateTime=2021-10-01T09:57:00Z&city=tulsa&stateCode=OK

//  http://app.ticketmaster.com/discovery/v2/events.json?keyword=Madonna&apikey=4dsfsf94tyghf85jdhshwge334&callback=myFunction

// getEvents.addEventListener("click", generateURL);

// function myFunction() {
        //   document.getElementById("demo").innerHTML = "Paragraph changed.";
        // }

                //         TicketMaster:
                // Consumer Key: WPcvWaSga9OR6jQP2PDNVNimKtFhAaMj
                // Consumer Secret:
                // hSLDGz2OMt3oNYzw
        // ticket master: https://app.ticketmaster.com/{package}/{version}/{resource}.json?apikey=**{API key}
//         https://app.ticketmaster.com/discovery/v1/events.json?apikey=4dsfsf94tyghf85jdhshwge334


        //  zomato apiKey = 27fc725ec538fb1dfbcf8303ae520c88

        // var submitBtn = document.getElementById('submitBtn');

        // function testing() {
        //     var city = document.getElementById('cityInput').value;
        //     var apiKey = 'WPcvWaSga9OR6jQP2PDNVNimKtFhAaMj';
        //     fetch(`https://app.ticketmaster.com/discovery/v2/events.json?city=${city}&apikey=${apiKey}`)
        //         .then(function(res){return res.json()})
        //         .then(function(anything){console.log(anything)})
        // }
        // $.ajax({
        //     url: "",
        //     method: "GET"
        // }).then(function(response) {
        //     console.log(response);
        // })
    
       getEvents.addEventListener("click", rangeStart);
        