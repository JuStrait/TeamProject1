// variable for submit button - ticketmasters
var getEvents = document.getElementById('getEvents');

// input location variables - ticketmasters
var keywordInput = document.querySelector('#eventKeyword');
var cityInput = document.getElementById('eventCity').value;
var stateInput = document.getElementById('eventState').value;
var zipInput = document.getElementById('eventZip').value;
var radius = document.getElementById('eventDistance').value;
var familyEvents = document.getElementById('familyEvents').value;



function generateURL () {
        var apiKey = 'WPcvWaSga9OR6jQP2PDNVNimKtFhAaMj';
        var url = [(`https://app.ticketmaster.com/discovery/v2/events?apikey=${apiKey}`)];
        addKeyword(url);
}

// function to add keyword taking url array from ^
function addKeyword(key) {
        if (!keywordInput.value) {
                rangeStart(key);
        } else {
                var input = keywordInput.value;
                var keyword = input.split(" ");
                var str1 = keyword.join("%20"); 
                key.push("&keyword=", str1);
                console.log(key);
                rangeStart(key);
        }
}

// function to add start date taking url array from ^
function rangeStart(start) {
        var c = document.getElementById('startDateTime').value;
        if (!c) {
                start.push("&locale=*");
                rangeEnd(start);
        } else {
                var d = 'T05:00:00Z';
                var startDate = c.concat(d); 
                start.push("&locale=*&startDateTime=", startDate);
                console.log(start);
                rangeEnd(start);
        }
}

// function to add start date taking url array from ^
function rangeEnd(end) {
        var f = document.getElementById('endDateTime').value;
        if (!f) {
                rangeEnd(end);
        } else {
                var d = 'T05:00:00Z';
                var endDate = f.concat(d); 
                start.push("&endDateTime=", endDate);
                console.log(end);
                rangeEnd(end);
        }
}




// function to add city taking url array from ^
// function to add stateInput taking url array from ^
// function to add zip ConvolverNode taking url array from ^
// function to add radius taking url array from ^
// function to add family friendly toggle taking url array from ^



function rangeEnd() {
        var f = new Date();
        f.setFullYear(endYear, endMonth, endDate);
        return f;
};

//         if (keywordInput !== "") {
//                 console.log("here");
//                 var keyword = keywordInput.split(" ");
//                 console.log(keyword);
//                 var str1 = keyword.join("%20"); 
//                 console.log(str1);
//                 url.push(str1);
//                 console.log(url);  
//         }
// }


// generated for search starting oct 1, tulsa, ok, transiberianOrchestra
// https://app.ticketmaster.com/discovery/v2/events?apikey=WPcvWaSga9OR6jQP2PDNVNimKtFhAaMj&keyword=transiberian%20orchestra&locale=*&startDateTime=2021-10-01T09:57:00Z&city=tulsa&stateCode=OK

//  http://app.ticketmaster.com/discovery/v2/events.json?keyword=Madonna&apikey=4dsfsf94tyghf85jdhshwge334&callback=myFunction

// function myFunction() {document.getElementById("demo").innerHTML = "Paragraph changed.";
                //         TicketMaster:
                // Consumer Key: WPcvWaSga9OR6jQP2PDNVNimKtFhAaMj
                // Consumer Secret:
                // hSLDGz2OMt3oNYzw
        // ticket master: https://app.ticketmaster.com/{package}/{version}/{resource}.json?apikey=**{API key}
//         https://app.ticketmaster.com/discovery/v1/events.json?apikey=4dsfsf94tyghf85jdhshwge334

        //  zomato apiKey = 27fc725ec538fb1dfbcf8303ae520c88
    
getEvents.addEventListener("click", generateURL);

        