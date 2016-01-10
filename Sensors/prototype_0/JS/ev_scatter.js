// ============ initinating ============
var margin = { top: 20, right: 20, bottom: 120, left: 65 },
   width = 960 - margin.left - margin.right,
   height = 360 - margin.top - margin.bottom;

//tooltip
var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

//var x = d3.scale.linear().range([0, width]);
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");


var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


function colorPicker(v) {
    if (v == 0) { return "#d73027"; }
    else if (v == 1) { return "#f46d43"; }
    else if (v == 2) { return "#fdae61"; }
    else if (v == 3) { return "#fee08b"; }
    else if (v == 4) { return "#d9ef8b"; }
    else if (v == 5) { return "#a6d96a"; }
    else if (v == 6) { return "#66bd63"; }
    else { return "#1a9850"; }
}

//================= Read file & create SVG =====================
d3.csv("data/USairpollution.csv", function (error, data) {
    if (error) throw error;

    data.forEach(function (d) {
        d.popul = +d.popul;
    });




    xAxis
 .ticks(data.length)
 .tickFormat(function (d, i) {
     return data[i].State;
 });


    //Setting the scale function
    y.domain([d3.min(data, function (d) { return d.popul; }), d3.max(data, function (d) { return d.popul; })]);

       x.domain(data.map(function (d) { return d.State; }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function (d) {
                return "rotate(-65)"
            });


    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
      //  .selectAll("text")
       //     .style("font-size", "12px");
      
    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 6)
       // .attr("cx", function (d) { function (d, i) { return i * (width/24.5) + 24 })}; })
        .attr("cx", function (d, i) { return (i+0.5) * (width / (data.length))  })
        .attr("cy", function (d) { return y(d.popul); })
        .style("fill", function (d) { return "#fdae61"; })  //colorPicker(d.zone_id)
     .on("mouseover", function (d) {
         tooltip.transition()
           .duration(500)
           .style("opacity", .9)
         tooltip.html("<strong>" + d.State + "</strong></br>" + d.popul)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          })
      .on("mouseout", function (d) {
         tooltip.transition()
           .duration(500)
           .style("opacity", 0);
          });


    //================= Change Indicator event =====================
    //d3.select("#xaxis").on("change", function () {

    //    var sel = d3.select('#xaxis').node().value; 
    //    var year = d3.select('#year').node().value;


    //    dsf = data.filter(function (d) { return d.Indicator == sel && d.year == year; });

       

    //    // y.domain([d3.min(dsfy, function (d) { return d.Value; }), d3.max(dsfy, function (d) { return d.Value; })]);
    //    //Setting the scale function
    //   // dsfy = data.filter(function (d) { return d.Indicator == "sel" });
    //    // y.domain([d3.min(dsfy, function (d) { return d.Value; }), d3.max(dsfy, function (d) { return d.Value; })]);
    //    y.domain([d3.min(dsf, function (d) { return d.Value; }), d3.max(dsf, function (d) { return d.Value; })]);

    //  //  console.log("min - " + d3.min(dsfy, function (d) { return d.Value; }));
    //  //  console.log("max - " + d3.max(dsfy, function (d) { return d.Value; }));

    //    // Update Y Axis
    //    svg.select(".y.axis")
    //        .transition()
    //        .ease('linear')
    //        .duration(1000)
    //        .call(yAxis);
       

    //    svg.selectAll(".dot")
    //   .data(dsf)
    //    svg.selectAll('circle')
    //      .transition()
    //      .duration(1000)
    //     // .attr("cx", function (d) { return x(d.ID); })
    //      .attr("cx", function (d, i) { return i * (width / 36.5) + 20 })
    //      .attr("cy", function (d) { return y(d.Value); })
    //      .style("fill", function (d) { return colorPicker(d.zone_id); });

    //});  // on change



   

}); // read csv


