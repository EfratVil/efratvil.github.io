// ============ initinating ============
var margin = { top: 20, right: 20, bottom: 30, left: 55 },
   width = 960 - margin.left - margin.right,
   height = 400 - margin.top - margin.bottom;

//tooltip
var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);



var parseDate = d3.time.format("%Y%m%d").parse;

// Set the ranges

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom").ticks(10);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")


// Define the line
//var valueline = d3.svg.line()
//    .x(function (d) { return x(d.date); })
//    .y(function (d) { return y(d.BX); });

var line = d3.svg.line()
    .interpolate("basis")
    .x(function (d) { return x(d.date); })
    .y(function (d) { return y(d.BX); });



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
d3.csv("data/Assets.csv", function (error, data) {
    if (error) throw error;


    data.forEach(function (d) {
        d.date = parseDate(d.TradDate); 
        d["BX"] = +d["BX"];
        d["CX"] = +d["CX"];
        d["EX"] = +d["EX"];
        d["GX"] = +d["JX"];
        d["RX"] = +d["RX"];
        d["SX"] = +d["SX"];
        d["UX"] = +d["UX"];
        d["WX"] = +d["WX"];
    });


     x.domain(d3.extent(data, function (d) { return d.date; }));
     y.domain([d3.min(data, function (d) { return d.BX; }), d3.max(data, function (d) { return d.BX; })]).nice();
    

    svg.append("g")
        .attr("class", "x axis")
        .attr('id', 'x_Lable')
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
      .append("text")
        .attr("class", "label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Corn");

    svg.append("g")
        .attr("class", "y axis")
        .attr('id', 'y_Lable')
        .call(yAxis)
      .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("GOLD");

    //// Add the valueline path.
    //svg.append("path")
    //    .attr("class", "line")
    //    .attr("d", valueline(data));

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);
   
    ////================= Change asset event =====================
    //function ChangeAsset() {
    //    // get new asset name
    //    var x_asset = d3.select('#x_asset').node().value;

    //    //    console.log("x_asset - " + x_asset);

    //    // update the domain calc function
    //    x.domain(d3.extent(data, function (d) { return d[d.date]; }));
    //    y.domain([d3.min(data, function (d) { return d[x_asset]; }), d3.max(data, function (d) { return d[x_asset]; })]).nice();

    // var   valueline = d3.svg.line()
    //.x(function (d) { return x(d.date); })
    //.y(function (d) { return y(d[x_asset]); });


    //    var svg = d3.select("#chart").transition();

    //    // Make the changes
    //    svg.select(".line")   // change the line
    //        .duration(750)
    //        .attr("d", valueline(data));
    //    svg.select(".x.axis") // change the x axis
    //        .duration(750)
    //        .call(xAxis);
    //    svg.select(".y.axis") // change the y axis
    //        .duration(750)
    //        .call(yAxis);
    //}


    //================= Change asset event =====================
    d3.select("#x_asset").on("change", change);


    var timeout = setTimeout(function () {
        d3.select("input[value=\"BX\"]").property("checked", true).each(change);
    }, 2000);

    function change() {
        clearTimeout(timeout);

        var x_asset = d3.select('#x_asset').node().value;

        city = this.value;

        // First transition the line & label to the new city.
        var t0 = svg.transition().duration(750);
        t0.selectAll(".line").attr("d", line);
       // t0.selectAll(".label").attr("transform", transform).text(city);

        // Then transition the y-axis.
        //y.domain(d3.extent(data, function (d) { return d[x_asset]; }));
        y.domain([d3.min(data, function (d) { return d[x_asset]; }), d3.max(data, function (d) { return d[x_asset]; })]).nice();
        var t1 = t0.transition();
        t1.selectAll(".line").attr("d", line);
      //  t1.selectAll(".label").attr("transform", transform);
        t1.selectAll(".y.axis").call(yAxis);
    }

    function transform(d) {
        return "translate(" + x(d.date) + "," + y(d[x_asset]) + ")";
    }






});

