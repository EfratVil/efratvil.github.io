// ============ initinating ============
   var margin = { top: 0, right: 20, bottom: 0, left: 20 },
   width = 682 - margin.left - margin.right,
   height = 120 - margin.top - margin.bottom;
   var padding = 0;

//tooltip
var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

var svg = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg1 = d3.select("#chart2")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var svg2= d3.select("#chart3")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


//function colorPicker(v) {

//    if (v == 0) { return "#e0e0e0" }
//    else if (v == 1) { return "#d73027"; }
//    else if (v == 2) { return "#fdae61"; }
//    else if (v == 3) { return "#a6d96a"; }
//    else if (v == 4) { return "#1a9850"; }
//    else if (v == 5) { return "#1a9850"; }
//    else if (v == 6) { return "#a6d96a"; }
//    else if (v == 7) { return "#fdae61"; }
//    else { return "#d73027"; }
//}


//function colorPicker(v) {

//    if (v == 0) { return "#e0e0e0" }
//    else if (v == 1) { return "#bd0026"; }
//    else if (v == 2) { return "#fc4e2a"; }
//    else if (v == 3) { return "#fed976"; }
//    else if (v == 4) { return "#addd8e"; }
//    else if (v == 5) { return "#41ab5d"; }
//    else if (v == 6) { return "#7fcdbb"; }
//    else if (v == 7) { return "#6baed6"; }
//    else { return "#08519c"; }
//}



function colorPicker_6S(v) {

    if (v == 0) { return "#e0e0e0" }
    else if (v == 1 || v == 8) { return "#d73027"; }
    else if (v == 2 || v == 7) { return "#fee08b"; }
    else if (v == 3 || v == 6) { return "#d9ef8b"; }
    else { return "#1a9850"; }
}


function colorPicker_PuOr(v) {

    if (v == 0) { return "#e0e0e0" }
    else if (v == 1) { return "#b35806"; }
    else if (v == 2) { return "#e08214"; }
    else if (v == 3) { return "#fdb863"; }
    else if (v == 4) { return "#fee0b6"; }
    else if (v == 5) { return "#d8daeb"; }
    else if (v == 6) { return "#b2abd2"; }
    else if (v == 7) { return "#8073ac"; }
    else { return "#542788"; }
}



function colorPicker_grade(v) {

    if (v >= 406) { return "#f46d43"; }  //Calibration
    else if (v >= 400) { return "#d73027"; }  //bad days
    else if (v >= 300) { return "#bababa"; }   //System not installed 
    else if (v >= 200) { return "#a6d96a"; }  //acceptable days
    else { return "#66bd63"; }                //good days
}


                                
                                
                                
                                
                                
                                
                                

var parseDate = d3.time.format("%m/%d/%Y").parse;

//================= Read file & create SVG =====================
d3.csv("data/sensors_daily_features.csv", function (error, data) {
    if (error) throw error;

    data.forEach(function (d, i) {
        d.date = parseDate(d.thedate);
        d.sensor_id = +d.sensor_id;
        d.MDS = +d.MDS; //Value;
        d.zone_MDS = +d.zone_MDS;
        d.Growth = +d.Growth;
        d.zone_Growth = +d.zone_Growth;
        d.Grade = +d.Grade;
        //d.MDS = +d.MDS; //Value;
        // = +d.zone_MDS;
        d.Include_Flag = d.Include_Flag;
    });

    
    var s = data.filter(function (d) { return d.sensor_id == 12884 ; });// && d.Include_Flag=="Y"
  
    svg.selectAll("rect")
       .data(s)
       .enter()
       .append("rect")
       .attr({
            x: function (d, i) { return i * (width / s.length); },
            y: function (d) { return height - (d.zone_MDS + 1) * (height / 9); },//
            width: width / s.length - padding,
            height: height/9,
            fill: function (d) { return colorPicker_6S(d.zone_MDS); }
       })
     .on("mouseover", function (d) {
         tooltip.transition()
           .duration(500)
           .style("opacity", .9);
         tooltip.html("<strong>Date: " + d.thedate + "<br/>Zone: " + d.zone_MDS + "</strong>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
     })
      .on("mouseout", function (d) {
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
      });




    svg1.selectAll("rect")
   .data(s)
   .enter()
   .append("rect")
   .attr({
       x: function (d, i) { return i * (width / s.length); },
       y: function (d) { return 0; },
       width: width / s.length - padding,
       height: height,
       fill: function (d) { return colorPicker_PuOr(d.zone_MDS); }
   })
 .on("mouseover", function (d) {
     tooltip.transition()
       .duration(500)
       .style("opacity", .9);
     tooltip.html("<strong>Date: " + d.thedate + "<br/>Zone: " + d.zone_MDS + "</strong>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
 })
  .on("mouseout", function (d) {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
  });




    svg2.selectAll("rect")
   .data(s)
   .enter()
   .append("rect")
   .attr({
       x: function (d, i) { return i * (width / s.length); },
       y: function (d) { return 0; },
       width: width / s.length - padding,
       height: height,
       fill: function (d) { return colorPicker_grade(d.Grade); }
   })
 .on("mouseover", function (d) {
     tooltip.transition()
       .duration(500)
       .style("opacity", .9);
     tooltip.html("<strong>Date: " + d.thedate + "<br/>Grade: " + d.Grade + "</strong>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");
 })
  .on("mouseout", function (d) {
      tooltip.transition()
        .duration(500)
        .style("opacity", 0);
  });


    //================= Change Indicator event =====================
    d3.select("#Sensor").on("change", function () {
        var sel = d3.select('#Sensor').node().value;

        s = data.filter(function (d) { return d.sensor_id == sel; });

        svg.selectAll("rect")
        .data(s)
        .transition()
        .ease('linear')
        .duration(1000)
        .attr({ 
            y: function (d) { return height - (d.zone_MDS + 1) * (height / 9); },
            fill: function (d) { return colorPicker_6S(d.zone_MDS); }
        })


        svg1.selectAll("rect")
        .data(s)
        .transition()
        .ease('linear')
        .duration(1000)
        .attr({
            fill: function (d) { return colorPicker_PuOr(d.zone_MDS); }
        })


        svg2.selectAll("rect")
       .data(s)
       .transition()
       .ease('linear')
       .duration(1000)
       .attr({
           fill: function (d) { return colorPicker_grade(d.Grade); }
       })




    });  // on change

   
});