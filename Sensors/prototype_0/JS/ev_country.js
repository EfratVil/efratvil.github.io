// ============ initinating ============
var margin = { top: 20, right: 20, bottom: 180, left: 50 },
   width = 960 - margin.left - margin.right,
   height = 400 - margin.top - margin.bottom;


// Parse the date / time
var parseDate = d3.time.format("%m/%d/%Y").parse;

//tooltip
var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);


//var x = d3.scale.linear().range([0, width]);
var x = d3.time.scale().range([0, width]);

//var x = d3.time.scale()
  //  .domain([new Date(data[0].date), d3.time.day.offset(new Date(data[data.length - 1].date), 1)])
  //  .rangeRound([0, width - margin.left - margin.right]);


//var x = d3.scale.ordinal()
//    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

//var xAxis = d3.svg.axis()
//    .scale(x)
//    .orient("bottom")
//    .tickFormat(function (d, i) {
//        return ['Dwellings without basic facilities', 'Housing expenditure', 'Rooms per person', 'Household disposable income', 'Income and Wealth', 'Employment rate', 'Job / Employment insecurity', 'Long term unemployment rate', 'Personal earnings', 'Social network support', 'Educational attainment', 'Students cognitive skills', 'Years in education', 'Air pollution', 'Water quality', 'Consultation on rule-making', 'Voter turnout', 'Life expectancy at birth', 'Self-reported health status', 'Subjective Life satisfaction', 'Assault rate', 'Homicides rates', 'Employees working long hours', 'leisure & personal care'][i];
//    });

//var xAxis = d3.svg.axis().scale(x)
  //  .orient("bottom").ticks(5);



var xAxis = d3.svg.axis()
    .scale(x)
    .orient('bottom')
    .ticks(d3.time.days, 1)
    .tickFormat(d3.time.format('%m/%d/%Y'))
    .tickSize(0)
    .tickPadding(8);





var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .call(d3.behavior.zoom().on("zoom", function () {
         svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
     }))
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


function colorPicker(v, F) {

    if (v == 0) { return "#e0e0e0" }
    else if (v == 1) { return "#d73027"; }
    else if (v == 2) { return "#fdae61"; }
    else if (v == 3) { return "#a6d96a"; }
    else if (v == 4) { return "#1a9850"; }
    else if (v == 5) { return "#1a9850"; }
    else if (v == 6) { return "#a6d96a"; }
    else if (v == 7) { return "#fdae61"; }
    else { return "#d73027"; }
}

//================= Read file & create SVG =====================
d3.csv("data/sensors_daily_features.csv", function (error, data) {
    if (error) throw error;

    var dsf = data; //.filter(function (d) { return d.Include_Flag == "Y"; });


    dsf.forEach(function (d,i) {
        d.sensor_id = +d.sensor_id;
      //  d.thedate = parseDate(d.thedate); //get indicator ID
        d.MDS = +d.MDS; //Value;
        d.zone_MDS = +d.zone_MDS;
        d.Include_Flag = d.Include_Flag;
    });

  //  console.log(dsf);

    var s = dsf.filter(function (d) { return d.sensor_id == 13580; });

    console.log(s);

   // x.domain(d3.extent(dsf, function (d) { return d.index; })).nice();
    //x.domain(data.map(function (d) { return d.Indicator; }));
    x.domain(d3.extent(data, function (d) { return d.thedate; }));
    y.domain([1, 8]);


    // Add the X Axis
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);


    //svg.append("g")
    //    .attr("class", "x axis")
    //    .attr("transform", "translate(0," + height + ")")
    //    .call(xAxis)
    //        .selectAll("text")
    //        .style("text-anchor", "end")
    //        .attr("dx", "-.8em")
    //        .attr("dy", "0.2em")
    //        .attr("transform", function (d) {
    //            return "rotate(-65)"
    //        });


    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    //console.log(x.rangeBand(10));

    svg.selectAll(".dot")
        .data(s)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 7)
        .attr("cx", function (d, i) { return i * (width/24.5) + 24 })  //x.rangeBand(d);
        .attr("cy", function (d) { return y(d.zone_MDS); })   // d.zone_id
        .style("fill", function (d) { return colorPicker(d.zone_MDS, d.Include_Flag); })
     .on("mouseover", function (d) {
         tooltip.transition()
           .duration(500)
           .style("opacity", .9);
         tooltip.html("<strong>Date: " + d.thedate +"<br/>Zone: " + d.zone_MDS + "</strong>")
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
        //  var year = d3.select('#year').node().value;
       
        s = dsf.filter(function (d) { return d.sensor_id == sel; });
        
       // console.log(s);
      //  y.domain([d3.min(dsf, function (d) { return d.Value; }), d3.max(dsf, function (d) { return d.zone_MDS; })]);


        svg.selectAll(".dot")
       .data(s)
        svg.selectAll('circle')
          .transition()
          .ease('linear')
          .duration(1000)
          .attr("cx", function (d, i) { return i * (width / 24.5) + 24 })
          .attr("cy", function (d) { return y(d.zone_MDS); })
          .style("fill", function (d) { return colorPicker(d.zone_MDS); });

    });  // on change

    //d3.select("#year").on("change", function () {

    //    var sel = d3.select('#Country').node().value;
    //    var year = d3.select('#year').node().value;
    //    dsf = data.filter(function (d) { return d.Country == sel && d.year == year;; });


    //    //  y.domain([d3.min(dsf, function (d) { return d.Value; }), d3.max(dsf, function (d) { return d.zone_MDS; })]);


    //    svg.selectAll(".dot")
    //   .data(dsf)
    //    svg.selectAll('circle')
    //      .transition()
    //      .ease('linear')
    //      .duration(1000)
    //      .attr("cx", function (d, i) { return i * (width / 24.5) + 24 })
    //      .attr("cy", function (d) { return y(d.zone_MDS); })
    //      .style("fill", function (d) { return colorPicker(d.zone_MDS); });

    //});  // on change
}); // read csv


