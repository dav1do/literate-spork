//d3.select("body").append("p").text("New Paragraph");
//
//var dataset = [ 5, 10, 15, 20, 25 ];
//
//d3.select("body").selectAll("p")
//    .data(dataset)
//    .enter()
//    .append("p")
//    .text("New Paragraph..");
//
//
//    <!--var dataset = [];                         //Initialize empty array-->
//<!--for (var i = 0; i < 5; i++) {            //Loop 25 times-->
//    <!--var newNumber = Math.round(-->
//                <!--Math.random() * 30);   //New random number (0-30)-->
//    <!--dataset.push(newNumber);              //Add new number to array-->
//<!--}-->
//
//<!--var w = 500;-->
//<!--var h = 50;-->
//
//<!--var svg = d3.select("body")-->
//    <!--.append("svg")-->
//    <!--.attr("height",h)-->
//    <!--.attr("width",w)-->
//
//<!--var circles = svg.selectAll("circle")-->
//    <!--.data(dataset)-->
//    <!--.enter()-->
//    <!--.append("circle");-->
//
//<!--circles.attr("cx", function(d, i) {-->
//            <!--return (i * 50) + 25;-->
//        <!--})-->
//        <!--.attr("cy", h/2)-->
//        <!--.attr("r", function(d) {-->
//                <!--return d;-->
//        <!--})-->
//        <!--.attr("fill","yellow")-->
//        <!--.attr("stroke","orange")-->
//        <!--.attr("stroke-width", function(d) {-->
//             <!--return d/2; }-->
//        <!--);-->
//
//
//<!--d3.select("body").selectAll("div")-->
//    <!--.data(dataset)-->
//    <!--.enter()-->
//    <!--.append("div")-->
//    <!--.classed("bar",true)-->
//    <!--.style("height", function(d) {-->
//                <!--var barHeight = d*5;-->
//                <!--return barHeight+"px";-->
//                <!--});-->
//
//<!--d3.select("body").selectAll("p")-->
//    <!--.data(dataset)-->
//    <!--.enter()-->
//    <!--.append("p")-->
//    <!--.text(function(d) { return ' this is d ' +d; })-->
//    <!--.style("color", "red");-->





////Dynamic, random dataset
//var dataset = [];
//var numDataPoints = 50;
//var xRange = Math.random() * 1000;
//var yRange = Math.random() * 1000;
//for (var i = 0; i < numDataPoints; i++) {
//    var newNumber1 = Math.floor(Math.random() * xRange);
//    var newNumber2 = Math.floor(Math.random() * yRange);
//    dataset.push([newNumber1, newNumber2]);
//}
//
//var h = 300;
//var w = 500;
//var padding = 30;
//
//var xScale = d3.scale.linear()
//                .domain([0, d3.max(dataset, function(d) { return d[0]; })])
//                .range([padding, w - padding * 2]);
//
//var yScale = d3.scale.linear()
//                .domain([0, d3.max(dataset, function(d) { return d[1]; })])
//                .range([h - padding, padding]);
//
//var rScale = d3.scale.linear()
//                .domain([0, d3.max(dataset, function(d) { return d[1]; })])
//                .range([2,5]);
//
//var xAxis = d3.svg.axis()
//            .scale(xScale)
//            .orient("bottom")
//            .ticks(5);
//
//var yAxis = d3.svg.axis()
//            .scale(yScale)
//            .orient("left")
//            .ticks(5);
//
//var svg = d3.select("body")
//            .append("svg")
//            .attr("width", w)
//            .attr("height", h)
//
//var circleAttrs = {
//    "cx": function (d) { return xScale(d[0]); },
//    "cy": function (d) { return yScale(d[1]); },
//    "r": function (d) { return rScale(d[1]); },
//    "fill": function(d) { return "rgb(0, 0, " + (d * 10) + ")"; },
//    };
//
//<!--var textAttrs = {-->
//    <!--"x": function (d) { return xScale(d[0]); },-->
//    <!--"y": function (d) { return yScale(d[1]); },-->
//    <!--"fill": "red",-->
//    <!--"font-size": "11px",-->
//    <!--"font-family": "sans-serif"-->
//    <!--};-->
//
//svg.selectAll("circle")
//    .data(dataset)
//    .enter()
//    .append("circle")
//    .attr(circleAttrs)
//
//<!--svg.selectAll("text")-->
//    <!--.data(dataset)-->
//    <!--.enter()-->
//    <!--.append("text")-->
//    <!--.text(function(d) { return d[0] + "," + d[1]; })-->
//    <!--.attr(textAttrs);-->
//
//svg.append("g")
//    .attr("class", "axis")
//    .attr("transform", "translate(0," + (h - padding) + ")")
//    .call(xAxis);
//
//svg.append("g")
//    .attr("class", "axis")
//    .attr("transform", "translate(" + (padding) + ",0)")
//    .call(yAxis);



//var margin = {top: 20, right: 10, bottom: 20, left: 10};
//
//var width = 960 - margin.left - margin.right,
//height = 500 - margin.top - margin.bottom;
//
//// Lastly, define svg as a G element that translates the origin to the top-left corner of the chart area.
//var svg = d3.select("body").append("svg")
//    .attr("width", width + margin.left + margin.right)
//    .attr("height", height + margin.top + margin.bottom)
//    .append("g");
//    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


var margin = {top: 20, right: 10, bottom: 20, left: 10};

var width = 960 - margin.left - margin.right,
height = 300 - margin.top - margin.bottom;



//Width and height
var w = 600;
var h = 250;

var dataset = [ 5, 10, 13, 19, 21, 25, 22, 18, 15, 13,
                11, 12, 15, 20, 18, 17, 16, 18, 23, 25 ];

var xScale = d3.scale.ordinal()
                .domain(d3.range(dataset.length))
                .rangeRoundBands([0, w], 0.05);

var yScale = d3.scale.linear()
                .domain([0, d3.max(dataset)])
                .range([0, h]);

//Create SVG element
var svg = d3.select("body")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

//Create bars
svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function(d, i) {
        return xScale(i);
   })
   .attr("y", function(d) {
        return h - yScale(d);
   })
   .attr("width", xScale.rangeBand())
   .attr("height", function(d) {
        return yScale(d);
   })
   .attr("fill", function(d) {
        return "rgb(0, 0, " + (d * 10) + ")";
   });

//Create labels
svg.selectAll("text")
   .data(dataset)
   .enter()
   .append("text")
   .text(function(d) {
        return d;
   })
   .attr("text-anchor", "middle")
   .attr("x", function(d, i) {
        return xScale(i) + xScale.rangeBand() / 2;
   })
   .attr("y", function(d) {
        return h - yScale(d) + 14;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "white");




//On click, update with new data
d3.select("p")
    .on("click", function() {
        //See which p was clicked
        var paragraphID = d3.select(this).attr("id");

        //Decide what to do next
        if (paragraphID == "add") {
            //Add a data value
            var maxValue = 25;
            var newNumber = Math.floor(Math.random() * maxValue);
            var lastKeyValue = dataset[dataset.length - 1].key;
            console.log(lastKeyValue);
            dataset.push({
                key: lastKeyValue + 1,
                value: newNumber
            });
        } else {
            //Remove a value
            dataset.pop();
        }

        //Update scale domains
        xScale.domain(d3.range(dataset.length));	//Recalibrate the x scale domain, given the new length of dataset
        yScale.domain([0, d3.max(dataset)]);		//Recalibrate the y scale domain, given the new max value in dataset

        //Select…
        var bars = svg.selectAll("rect")			//Select all bars
            .data(dataset);							//Re-bind data to existing bars, return the 'update' selection
                                                    //'bars' is now the update selection

        //Enter…
        bars.enter()								//References the enter selection (a subset of the update selection)
            .append("rect")							//Creates a new rect
            .attr("x", w)							//Sets the initial x position of the rect beyond the far right edge of the SVG
            .attr("y", function(d) {				//Sets the y value, based on the updated yScale
                return h - yScale(d);
            })
            .attr("width", xScale.rangeBand())		//Sets the width value, based on the updated xScale
            .attr("height", function(d) {			//Sets the height value, based on the updated yScale
                return yScale(d);
            })
            .attr("fill", function(d) {				//Sets the fill value
                return "rgb(0, 0, " + (d * 10) + ")";
            });

        //Update…
        bars.transition()							//Initiate a transition on all elements in the update selection (all rects)
            .duration(500)
            .attr("x", function(d, i) {				//Set new x position, based on the updated xScale
                return xScale(i);
            })
            .attr("y", function(d) {				//Set new y position, based on the updated yScale
                return h - yScale(d);
            })
            .attr("width", xScale.rangeBand())		//Set new width value, based on the updated xScale
            .attr("height", function(d) {			//Set new height value, based on the updated yScale
                return yScale(d);
            });

        //Exit…
        bars.exit()				//References the exit selection (a subset of the update selection)
            .transition()		//Initiates a transition on the one element we're deleting
            .duration(500)
            .attr("x", w)		//Move past the right edge of the SVG
            .remove();   		//Deletes this element from the DOM once transition is complete



        //Update all labels
        //
        //Exercise: Modify this code to remove the correct label each time!
        //
        svg.selectAll("text")
           .data(dataset)
           .transition()
           .duration(500)
           .text(function(d) {
                return d;
           })
           .attr("x", function(d, i) {
                return xScale(i) + xScale.rangeBand() / 2;
           })
           .attr("y", function(d) {
                return h - yScale(d) + 14;
           });
    });