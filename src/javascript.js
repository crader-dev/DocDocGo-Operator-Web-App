/*
This is the Operator Web Application for the DocDocGo Project,
done for the CS Design of Information Capstone.

Created by Anthony Napoleon
 */

var DDG_API_ADDRESS = "34.199.76.53";

var requests = [];
// Where we will be dynamically generating the requests list.
var canvas;
var row = [];

function init(){

    requests = [["Request 1", "Anthony", "I hurt my ankle while I was vacuuming.", "4"],
        ["Request 2", "Jesus", "I got a paper cut. The pain is not too bad but I dont want it to get infected.", "2"],
        ["Request 3", "Sunny", "Description asldkjf;lasdkjf;alskdjfl;askdjf", "9"],
        ["Request 4", "Cameron", "Description of ailment asldkjfsdfsdfa", "6"]];

    console.log(requests);
    console.log(requests[0][0]);

    // Dynamically create the list using the data from the requests.
    canvas = d3.select("body")
        .append("div")
        .attr("id", "canvas")
        .html("Hello")
        .style("fill", "black");

    // The initial call to retrieve requests from the server.
    httpGetAsync("http://" + DDG_API_ADDRESS + "/api/v0/requests/?status=WAIT", displayRequests)
}

/**
 * Called when the Ambulance button is clicked.
 */
function ambulanceClicked(index){
    console.log("AmbulanceClicked method.")
    console.log(requests);
    console.log("The row number is " + index);
    //alert("Request: " + requests[index] + " was clicked \n" +
    //"Ambulance will be sent for " + requests[index][1]);

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("PATCH", "http://" + DDG_API_ADDRESS + "/api/v0/requests/" + requests[index].id + "/");
    xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xmlHttp.send(JSON.stringify({status : "DENY"}));
}

/**
 * Called when the DocDocGo button is clicked for a request.
 */
function docClicked(index){
    console.log("DocClicked method.")
    //alert("DocDocGo Button was clicked.");

    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("PATCH", "http://" + DDG_API_ADDRESS + "/api/v0/requests/" + requests[index].id + "/");
    xmlHttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xmlHttp.send(JSON.stringify({status : "ACPT"}));
}

/**
 * This function is used to make an http request to the server.
 *
 * @param theUrl
 * @param callback
 */
function httpGetAsync(theUrl, callback)
{
    console.log("Inside httpGetAsync");
    var xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            callback(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader('X-CSRFToken', document.cookie.match(/csrftoken=(.*)/));
    xmlHttp.send(null);
}

function displayRequests(response){
    //alert("Request List was updated.");
    console.log("The displayRequests function was called.");
    console.log(response);

    // Parse the JSON response into an array.
    var parsedResponse = JSON.parse(response);
    var array = [];
    for (var x in parsedResponse){
        array.push(parsedResponse[x]);
    }
    requests = array;

    // Clear the canvas item before displaying the list (prevent multiple lists)
    clearCanvas();
    d3.select("body").selectAll("h1").remove();

    // Create the h1 element and append to the body.
    var x = document.createElement("h1");
    var t = document.createTextNode("No requests to display.");
    x.appendChild(t);
    document.body.appendChild(x);

    requests.forEach(function(item, index){
        console.log("Inside requests foreach");

        clearCanvas();
        d3.select("body").selectAll("h1").remove();

        // first create the row div "container)
        row[index] = canvas.append("div")
        //.html("this is a row div")
            .attr("class", "container")
            .attr("value", index);
        // append first column in the row (Request info)
        var details = row[index].append("div")
            .attr("class", "flex-item")
            .html("Details");

        details.append("div")
            .html("Request ID: " + requests[index].id);
        details.append("div")
            .html("Description: " + requests[index].description);
        details.append("div")
            .html("Status: " + requests[index].status);
        details.append("div")
            .html("Latitude: " + requests[index].latitude);
        details.append("div")
            .html("Longitude: " + requests[index].longitude);

        // Buttons section

        var fixed = row[index].append("div")
            .attr("class", ".fixed")

        fixed.append("img")
            .attr("src", "ambulance.png")
            .on("click", function(){
                //alert("clicked");
                ambulanceClicked(index);
            });
        console.log("Request " + index + " has a value of " + requests[index]);

        fixed.append("img")
            .attr("src", "doctor.png")
            .on("click", function(){
                //alert("clicked");
                docClicked(index);
            });

        // end buttons section

    })

    // console.log("Looking at the first entry of requests now.");
    // console.log("ID is: " + requests[0].id);
    // console.log("Description is: " + requests[0].description);

    // Call the httpGetAsync method after 15 seconds (15000 milliseconds).
    setTimeout(function(){httpGetAsync("http://" + DDG_API_ADDRESS + "/api/v0/requests/?status=WAIT", displayRequests);}, 15000)
}

/**
 * Helper function to clear the canvas div.
 */
function clearCanvas(){
    d3.select("#canvas").html(null);
}

// Call the init function

init();