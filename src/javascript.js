/*
This is the Operator Web Application for the DocDocGo Project,
done for the CS Design of Information Capstone.

Created by Anthony Napoleon
 */


var requests = [];
var canvas;
var row = [];

function init(){

    // Retrieve the requests here from the server
    // requests =

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


    // START LOOP


    // this is working but not eh click events
    /*for (x = 0; x < requests.length; x++)
    {
        // first create the row div "container)
        row[x] = canvas.append("div")
        //.html("this is a row div")
            .attr("class", "container")
            .attr("value", x);
        // append first column in the row (Request info)
        row[x].append("div")
            .attr("class", "flex-item")
            .html("Details");
        var fixed = row[x].append("div")
            .attr("class", ".fixed")
        //.classed("fixed", true)
        //.html("fixed");
        fixed.append("input")
            .attr("type", "button")
            .attr("value", "ambulance")
            .on("click", function(){
                ambulanceClicked(row[x].value);
            });
        console.log("Request " + x + " has a value of " + requests[x]);

        fixed.append("input")
            .attr("type", "button")
            .attr("value", "DocDocGo")
            .on("click", function(){
                docClicked();
            });

        //.append("div")
        //.attr("class", "label")
        //.html("This is label two.");
    }*/

    /*d3.select(this)
        .data(requests).enter()
        .append("div").text(function(d){
            return d;
        });*/

    requests.forEach(function(item, index){
        /*canvas.append("div")
            .html("Index " + index + " item: " + item);*/

        // first create the row div "container)
        row[index] = canvas.append("div")
        //.html("this is a row div")
            .attr("class", "container")
            .attr("value", index);
        // append first column in the row (Request info)
        var details = row[index].append("div")
            .attr("class", "flex-item")
            .html("Details");
        /*.append("div")
        .attr("class", "label")
        .html("This is label one.");*/

        details.append("div")
            .html( requests[index][0]);
        details.append("div")
            .html("Name: " + requests[index][1]);
        details.append("div")
            .html("Description: " + requests[index][2]);
        details.append("div")
            .html("Pain Scale: " + requests[index][3]);


        // Buttons section

        var fixed = row[index].append("div")
            .attr("class", ".fixed")
        //.classed("fixed", true)
        //.html("fixed");
        fixed.append("input")
            .attr("type", "button")
            .attr("value", "ambulance")
            .on("click", function(){
                ambulanceClicked(index);
            });
        console.log("Request " + index + " has a value of " + requests[index]);

        fixed.append("input")
            .attr("type", "button")
            .attr("value", "DocDocGo")
            .on("click", function(){
                docClicked();
            });
    })
}

/**
 * Called when the Ambulance button is clicked.
 */
    console.log("AmbulanceClicked method.")
    console.log(requests);
}

/**
 * Called when the DocDocGo button is clicked for a request.
 */
function docClicked(){
    console.log("DocClicked method.")
    alert("DocDocGo Button was clicked.");
}

// Call the init function

init();
