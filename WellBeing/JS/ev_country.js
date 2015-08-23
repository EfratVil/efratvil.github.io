// ============ initinating ============
var margin = { top: 20, right: 20, bottom: 180, left: 50 },
   width = 960 - margin.left - margin.right,
   height = 400 - margin.top - margin.bottom;

//tooltip
var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


//var x = d3.scale.linear().range([0, width]);
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

//var xAxis = d3.svg.axis()
//    .scale(x)
//    .orient("bottom").ticks(24).tickSize(0)
//     .tickPadding(8)
//    .tickFormat(function (d, i) {
//        return ['Dwellings without basic facilities', 'Housing expenditure', 'Rooms per person', 'Household disposable income', 'Income and Wealth', 'Employment rate', 'Job / Employment insecurity', 'Long term unemployment rate', 'Personal earnings', 'Social network support', 'Educational attainment', 'Students’ cognitive skills', 'Years in education', 'Air pollution', 'Water quality', 'Consultation on rule-making', 'Voter turnout', 'Life expectancy at birth', 'Self-reported health status', 'Subjective Life satisfaction', 'Assault rate', 'Homicides rates', 'Employees working long hours', 'leisure & personal care'][i];
//    });

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickFormat(function (d, i) {
        return ['Dwellings without basic facilities', 'Housing expenditure', 'Rooms per person', 'Household disposable income', 'Income and Wealth', 'Employment rate', 'Job / Employment insecurity', 'Long term unemployment rate', 'Personal earnings', 'Social network support', 'Educational attainment', 'Students cognitive skills', 'Years in education', 'Air pollution', 'Water quality', 'Consultation on rule-making', 'Voter turnout', 'Life expectancy at birth', 'Self-reported health status', 'Subjective Life satisfaction', 'Assault rate', 'Homicides rates', 'Employees working long hours', 'leisure & personal care'][i];
    });






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
d3.csv("data/zones_long.csv", function (error, data) {
    if (error) throw error;

    data.forEach(function (d,i) {
        d.ID = +d.ID;
        d.index = (i + 1 - d.ID)/36 +1; //get indicator ID
        d.Value = +d.Value;
        d.zone_id = +d.zone_id;
    });

    //console.log(data);

    var dsf = data.filter(function (d) { return d.Country == "Australia" && d.year == 2015; });

   // x.domain(d3.extent(dsf, function (d) { return d.index; })).nice();
    x.domain(data.map(function (d) { return d.Indicator; }));

    y.domain([0, 7]);



    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "0.2em")
            .attr("transform", function (d) {
                return "rotate(-65)"
            });


    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    console.log(x.rangeBand(10));

    svg.selectAll(".dot")
        .data(dsf)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 7)
        .attr("cx", function (d, i) { return i * (width/24.5) + 24 })  //x.rangeBand(d);
        .attr("cy", function (d) { return y(d.zone_id); })
        .style("fill", function (d) { return colorPicker(d.zone_id); })
     .on("mouseover", function (d) {
         tooltip.transition()
           .duration(500)
           .style("opacity", .9);
         tooltip.html("<strong>Zone: " + d.zone_id + "</strong>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          })
      .on("mouseout", function (d) {
         tooltip.transition()
           .duration(500)
           .style("opacity", 0);
          });


    //================= Change Indicator event =====================
    d3.select("#Country").on("change", function () {

        var sel = d3.select('#Country').node().value; 
        var year = d3.select('#year').node().value;
        dsf = data.filter(function (d) { return d.Country == sel && d.year == year; });
        

      //  y.domain([d3.min(dsf, function (d) { return d.Value; }), d3.max(dsf, function (d) { return d.zone_id; })]);


        svg.selectAll(".dot")
       .data(dsf)
        svg.selectAll('circle')
          .transition()
          .ease('linear')
          .duration(1000)
          .attr("cx", function (d, i) { return i * (width / 24.5) + 24 })
          .attr("cy", function (d) { return y(d.zone_id); })
          .style("fill", function (d) { return colorPicker(d.zone_id); });

    });  // on change

    d3.select("#year").on("change", function () {

        var sel = d3.select('#Country').node().value;
        var year = d3.select('#year').node().value;
        dsf = data.filter(function (d) { return d.Country == sel && d.year == year;; });


        //  y.domain([d3.min(dsf, function (d) { return d.Value; }), d3.max(dsf, function (d) { return d.zone_id; })]);


        svg.selectAll(".dot")
       .data(dsf)
        svg.selectAll('circle')
          .transition()
          .ease('linear')
          .duration(1000)
          .attr("cx", function (d, i) { return i * (width / 24.5) + 24 })
          .attr("cy", function (d) { return y(d.zone_id); })
          .style("fill", function (d) { return colorPicker(d.zone_id); });

    });  // on change
}); // read csv


