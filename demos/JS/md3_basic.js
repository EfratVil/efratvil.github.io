//---------------------------------------------------------------------------------
// Version 0_1
//---------------------------------------------------------------------------------

function d3mv_Line_chart(args) {

    //Todo: custom ticklines
    //Todo: add axis lables
    //Todo: configurable grid lines

    var chart = args.chart;
    var data = args.data;
    var x_ds = args.x_ds;
    var y_ds = args.y_ds;
    var width = args.width || 500;
    var height = args.height || width / 1.618;
    var margin = args.margin || { top: 20, right: 20, bottom: 30, left: 50 };
    var dots = args.add_dots || false;
    var no_line = args.no_line || false;
    var xAxisTickValues = args.xAxisTickValues || "";

    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    
    //  var parseDate = d3.time.format("%Y-%m-%d hh:mm:ss").parse;
    var x = d3.scaleLinear()//d3.time.scale()
        .range([0, width]);

//    var x = d3.time.scale()
  //     .range([0, width]);


    var y = d3.scaleLinear() 
        .range([height, 0]);

    data.forEach(function (d) {                             //Todo - configurable date field
        Object.keys(data[0]).filter(function (k) { return k != "Date" && k != "grade_auto" && k != "sensors_group" }).forEach(function (k) {
            d[k] = +d[k];
        });
    });


    //var xAxis = d3.svg.axis()
    //    .scale(x)
    //    .orient("bottom")
    //    .innerTickSize(-height)
    //    .outerTickSize(0)
    //    .tickPadding(10);

    ////d3.range(0, 200, 28)
    //if (xAxisTickValues != "")
    //{ xAxis.tickValues(xAxisTickValues); }
    ////xAxis.tickValues(d3.range(0, 200, 28));
    //  // .tickValues([24, 48, 72, 96, 120, 144, 168]);;

    //var yAxis = d3.svg.axis()
    //    .scale(y)
    //    .orient("left")
    //     .innerTickSize(-width)
    //    .outerTickSize(0)
    //    .tickPadding(10);

    var line = d3.line()
     //   .interpolate("basis")
        .x(function (d) { return x(d[x_ds]); })
        .y(function (d) { return y(d[y_ds]); });

    //// function for the x grid lines
    //function make_x_axis() {
    //    return d3.svg.axis()
    //        .scale(x)
    //        .orient("bottom")
    // //       .ticks(6)
    //        .tickValues([24, 48, 72, 96, 120, 144, 168]);
    //}

    var svg = d3.select("#" + chart).append("svg")
        .attr("id", chart + "_svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function (d) { return d[x_ds]; }));
    y.domain(d3.extent(data, function (d) { return d[y_ds]; }));

    //svg.append("g")
    //    .attr("class", "x axis")
    //    .attr("transform", "translate(0," + height + ")")
    //    .call(xAxis);

    //svg.append("g")
    //    .attr("class", "y axis")
    //    .call(yAxis);
   
    var gX = svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
      //  .ticks(d3.time.minutes, 15)
      //.tickFormat(d3.time.format("%H:%M"))
        .call(d3.axisBottom(x));

    var gY = svg.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
      .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Temp (C)");

    // add line
    if  (!no_line) {
        svg.append("path")
         .datum(data)
         .attr("class", "line")
         .attr("d", line)
         .attr("id", "line");
    }


    // Add circles 
    if (dots) {
                svg.selectAll(".dot")
                .data(data)
              .enter().append("circle")
                .attr("class", "dot")
                .attr("r", 3)
                .attr("cx", function (d) { return x(d[x_ds]); })
                .attr("cy", function (d) { return y(d[y_ds]); })
                .attr("opacity", 1)
        // .style("fill", function (d) { return "#74add1;" }) //color
        .style("fill", function (d) { if (d.grade_auto == "Outlier") { return "Red" } else { if (d.grade_auto == "tbd") { return "Orange" } else { return "Green" } } }) //color
                }

    //// Draw the x Grid lines
    //svg.append("g")
    //    .attr("class", "grid")
    //    .attr("transform", "translate(0," + height + ")")
    //    .call(make_x_axis()
    //        .tickSize(-height, 0, 0)
    //        .tickFormat("")
    //    )
    //    d3.selectAll("input").on("change", change);
}

function d3mv_Line_chart_zoom(args) {

    //Todo: custom ticklines
    //Todo: add axis lables
    //Todo: configurable grid lines

    var chart = args.chart;
    var data = args.data;
    var x_ds = args.x_ds;
    var y_ds = args.y_ds;
    var width = args.width || 500;
    var height = args.height || width / 1.618;
    var margin = args.margin || { top: 20, right: 20, bottom: 30, left: 50 };
    var dots = args.add_dots || false;
    var no_line = args.no_line || false;
    var xAxisTickValues = args.xAxisTickValues || "";

    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;


    //  var parseDate = d3.time.format("%Y-%m-%d hh:mm:ss").parse;
    var x = d3.scaleLinear()//d3.time.scale()
        .range([0, width]);
    var x0 = d3.scaleLinear().range([0, width]);
    //    var x = d3.time.scale()
    //     .range([0, width]);


    var y = d3.scaleLinear()
        .range([height, 0]);

    data.forEach(function (d) {                             //Todo - configurable date field
        Object.keys(data[0]).filter(function (k) { return k != "Date" && k != "grade_auto" && k != "sensors_group" }).forEach(function (k) {
            d[k] = +d[k];
        });
    });


    //var xAxis = d3.svg.axis()
    //    .scale(x)
    //    .orient("bottom")
    //    .innerTickSize(-height)
    //    .outerTickSize(0)
    //    .tickPadding(10);

    ////d3.range(0, 200, 28)
    //if (xAxisTickValues != "")
    //{ xAxis.tickValues(xAxisTickValues); }
    ////xAxis.tickValues(d3.range(0, 200, 28));
    //  // .tickValues([24, 48, 72, 96, 120, 144, 168]);;

    //var yAxis = d3.svg.axis()
    //    .scale(y)
    //    .orient("left")
    //     .innerTickSize(-width)
    //    .outerTickSize(0)
    //    .tickPadding(10);

    // setup zoom
    var zoom = d3.zoom()
        .scaleExtent([1, 50])
        .translateExtent([[0, 0], [width, height]])
        .extent([[0, 0], [width, height]])
        .on("zoom", zoomed);

    var line = d3.line()
     //   .interpolate("basis")
        .x(function (d) { return x(d[x_ds]); })
        .y(function (d) { return y(d[y_ds]); });

    //// function for the x grid lines
    //function make_x_axis() {
    //    return d3.svg.axis()
    //        .scale(x)
    //        .orient("bottom")
    // //       .ticks(6)
    //        .tickValues([24, 48, 72, 96, 120, 144, 168]);
    //}

    var svg = d3.select("#" + chart).append("svg")
        .attr("id", chart + "_svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function (d) { return d[x_ds]; }));
    y.domain(d3.extent(data, function (d) { return d[y_ds]; }));


    var rect = svg.append("rect")
    .attr("class", "zoom")
    .attr("width", width)
    .attr("height", height)
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    .call(zoom);

    // Create clip-path
    svg.append("defs").append("clipPath")
        .attr("id", "clip")
       .append("rect")
        .attr("width", width)
        .attr("height", height);

    //svg.append("g")
    //    .attr("class", "x axis")
    //    .attr("transform", "translate(0," + height + ")")
    //    .call(xAxis);

    //svg.append("g")
    //    .attr("class", "y axis")
    //    .call(yAxis);

    var gX = svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
      //  .ticks(d3.time.minutes, 15)
      //.tickFormat(d3.time.format("%H:%M"))
        .call(d3.axisBottom(x));

    var gY = svg.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
      .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Temp (C)");

    // add line
    if (!no_line) {
        svg.append("path")
         .datum(data)
         .attr("class", "line")
         .attr("d", line)
         .attr("id", "line");
    }


    // Add circles 
    if (dots) {
        svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3)
        .attr("cx", function (d) { return x(d[x_ds]); })
        .attr("cy", function (d) { return y(d[y_ds]); })
        .attr("opacity", 1)
// .style("fill", function (d) { return "#74add1;" }) //color
.style("fill", function (d) { if (d.grade_auto == "Outlier") { return "Red" } else { if (d.grade_auto == "tbd") { return "Orange" } else { return "Green" } } }) //color
    }

    //// Draw the x Grid lines
    //svg.append("g")
    //    .attr("class", "grid")
    //    .attr("transform", "translate(0," + height + ")")
    //    .call(make_x_axis()
    //        .tickSize(-height, 0, 0)
    //        .tickFormat("")
    //    )
    //    d3.selectAll("input").on("change", change);

    function zoomed() {
        var t = d3.event.transform, xt = t.rescaleX(x);
        g.select(".area").attr("d", area.x(function (d) { return xt(d.date); }));
        g.select(".axis--x").call(xAxis.scale(xt));
    }


    function zoomed() {
        var t = d3.event.transform;
        x.domain(t.rescaleX(x0).domain());
        //dims.forEach(dim => {
        //    var selector = ".line--" + dim;
        //    svg.select(selector)
        //      .attr("d", lines[dim]);
        //});

        svg.select(".line").attr("d", line)
        svg.select(".axis--x").call(d3.axisBottom(x));
    }

}


function d3mv_MultiLine_chart(args) {

    var chart = args.chart;
    var data = args.data;
    var x_ds = args.x_ds;
    var width = args.width || 500;
    var height = args.height || width / 1.618;
    var margin = args.margin || { top: 20, right: 20, bottom: 30, left: 50 };
    var dots = args.add_dots || false;
    var y_axis_lbl = args.y_axis_lbl || "";

    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    data.forEach(function (d) {                             //Todo - configurable date field
        Object.keys(data[0]).filter(function (k) { return k != "Date" }).forEach(function (k) {
            d[k] = +d[k];
        });
    });


    // var parseDate = d3.time.format("%Y%m%d").parse;
    //  var parseDate = d3.time.format("%Y-%m-%d hh:mm:ss").parse;

    var x = d3.scaleLinear()//d3.time.scale()
        .range([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);

    //var color = d3.scale.category10();
    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var line = d3.line()
       // .interpolate("basis")
        .x(function (d) { return x(d[x_ds]); })
        .y(function (d) { return y(d.key); });

    var svg = d3.select("#" + chart).append("svg")
        .attr("id", "id_" + chart)
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    color.domain(d3.keys(data[0]).filter(function (key) { return key !== x_ds; }));

    var lines = color.domain().map(function (name) {
        return {
            name: name,
            values: data.map(function (d) {
                return { id: d[x_ds], key: +d[name] };
            })
        };
    });

    x.domain(d3.extent(data, function (d) { return d.id; }));

    y.domain([
      d3.min(lines, function (c) { return d3.min(c.values, function (v) { return v.key; }); }),
      d3.max(lines, function (c) { return d3.max(c.values, function (v) { return v.key; }); })
    ]);

var gX = svg.append("g")
     .attr("class", "axis axis--x")
     .attr("transform", "translate(0," + height + ")")
   //  .ticks(d3.time.minutes, 15)
   //.tickFormat(d3.time.format("%H:%M"))
     .call(d3.axisBottom(x));

var gY = svg.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y))
  .append("text")
    .attr("class", "axis-title")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Temp (C)");


    var city = svg.selectAll(".city")
        .data(lines)
      .enter().append("g")
        .attr("class", "city");

    city.append("path")
        .attr("class", "line")
        .attr("d", function (d) { return line(d.values); })
        .style("stroke", function (d) { return color(d.name); });

    city.append("text")
        .datum(function (d) { return { name: d.name, value: d.values[d.values.length - 1] }; })
        .attr("transform", function (d) { return "translate(" + x(d.value.id) + "," + y(d.value.key) + ")"; })
        .attr("x", 20 )
        .attr("dy", ".35em")
        .text(function (d) { return d.name; });
}

function d3mv_MultiLine_chart1(args) {

    var chart = args.chart;
    var data = args.data;
    var x_ds = args.x_ds;
    var width = args.width || 500;
    var height = args.height || width / 1.618;
    var margin = args.margin || { top: 20, right: 20, bottom: 30, left: 50 };
    var dots = args.add_dots || false;
    var y_axis_lbl = args.y_axis_lbl || "";



    var width = width - margin.left - margin.right,
        height = height - margin.top - margin.bottom;

    data.forEach(function (d) {                             //Todo - configurable date field
        Object.keys(data[0]).filter(function (k) { return k != "Date" }).forEach(function (k) {
            d[k] = +d[k];
        });
    });

    var x = d3.scaleLinear()//d3.time.scale()
        .range([0, width]);

    //var x = d3.scale.ordinal()
    //  .domain(ds_col_to_array(data, x_ds))  // .domain(["apple", "orange", "banana", "grapefruit"])
    //  .rangePoints([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var svg = d3.select("#" + chart).append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //var xAxis = d3.svg.axis()
    //    .scale(x)
    //    .orient("bottom")
    //    .innerTickSize(-height)
    //    .outerTickSize(0)
    //    .tickValues([24, 48, 72, 96, 120, 144, 168])
    //    .tickPadding(10);

    //var yAxis = d3.svg.axis()
    //    .scale(y)
    //    .orient("left")
    //     .innerTickSize(-width)
    //    .outerTickSize(0)
    //    .tickPadding(10);




    var line = d3.line()
       // .interpolate("basis")
        .x(function (d) { return x(d[x_ds]); })
        .y(function (d) { return y(d.key); });

  

    color.domain(d3.keys(data[0]).filter(function (key) { return key !== x_ds; }));

    console.log(d3.keys(data[0]).filter(function (key) { return key !== x_ds; }));
    //data.forEach(function(d) {
    //    d.date = parseDate(d.date);
    //});

    var lines = color.domain().map(function (name, i) {
        return {
            name: name,
            id: i + 1,
            values: data.map(function (d) {
                return { id: d[x_ds], key: +d[name] };
            })
        };
    });

    console.log(lines);
    // console.log(lines.length);

    x.domain(d3.extent(data, function (d) { return d[x_ds]; }));

    y.domain([
      d3.min(lines, function (c) { return d3.min(c.values, function (v) { return v.key; }); }),
      d3.max(lines, function (c) { return d3.max(c.values, function (v) { return v.key; }); })
    ]);

    //svg.append("g")
    //    .attr("class", "x axis")
    //    .attr("transform", "translate(0," + height + ")")
    //    .call(xAxis);

    //svg.append("g")
    //    .attr("class", "y axis")
    //    .call(yAxis)

    //if (y_axis_lbl != "") {
    //    svg.append("text")
    //       .attr("transform", "rotate(-90)")
    //       .attr("y", 6)
    //       .attr("dy", ".71em")
    //       .style("text-anchor", "end")
    //       .text("y axis");
    //}


    var gX = svg.append("g")
     .attr("class", "axis axis--x")
     .attr("transform", "translate(0," + height + ")")
   //  .ticks(d3.time.minutes, 15)
   //.tickFormat(d3.time.format("%H:%M"))
     .call(d3.axisBottom(x));

    var gY = svg.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
      .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Temp (C)");



    var city = svg.selectAll(".city")
        .data(lines)
      .enter().append("g")
        .attr("class", "city");

    city.append("path")
        .attr("class", "line")
         .attr('id', function (d) { return "line_" + d.name; })
        .attr("d", function (d) { return line(d.values); })
        .style("stroke", function (d) { return color(d.name); });


    // Add the Legend
    //city.append("text")
    //    .attr("x", (legendSpace / 2) + legendSpace) // spacing
    //    .attr("y", height + (margin.bottom / 2) + 5)
    //    .attr("class", "legend")    // style the legend
    //    .style("fill", function () { // dynamic colours
    //        return d.color = color(d.name);
    //    })
    //    .text(d.key);

    var lines_count = lines.length;

    city.append("text")
        .datum(function (d) { return { name: d.name, id: d.id, value: d.values[d.values.length - 1] }; })
        //.attr("transform", function (d) { return "translate(" + x(d.value.id) + "," + y(d.value.key) + ")"; })
       // .attr("x", 3)
        .attr("class", "Legend")
        .attr("x", function (d) { return (d.id - 1) * width / lines_count }) // spacing
        .attr("y", height + (margin.bottom / 2) + 5)
        .style("fill", function (d) { // dynamic colours
            return d.color = color(d.name);
        })
        .attr("dy", ".50em")
        .text(function (d) { return d.name; });


}

function d3mv_ts_chart(args) {

    //Todo: d.Date is hardcoded!!!!!!!!!
    //Todo: Time formate is hardcoded!!!!!!!!!
    //Todo: custom ticklines
    //Todo: add axis lables
    //Todo: configurable grid lines

    var chart = args.chart;
    var data = args.data;
    var x_ds = args.x_ds;
    var y_ds = args.y_ds;
    var width = args.width || 500;
    var height = args.height || width / 1.618;
    var margin = args.margin || { top: 20, right: 20, bottom: 30, left: 50 };
    var dots = args.add_dots || false;
    var no_line = args.no_line || false;
    var xAxisTickValues = args.xAxisTickValues || "";

    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    //cl(data, "data")

    var parseTime = d3.timeParse("%Y-%m-%d");

    var x = d3.scaleTime()
        .range([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);

    data.forEach(function (d) {                             //Todo - configurable date field
        Object.keys(data[0]).filter(function (k) { return k != "Date" }).forEach(function (k) {
            d[k] = +d[k];
        });
        d.Date = parseTime(d.Date);
    });
    
    var line = d3.line()
     //   .interpolate("basis")
        .x(function (d) { return x(d[x_ds]); })
        .y(function (d) { return y(d[y_ds]); });

    //// function for the x grid lines
    //function make_x_axis() {
    //    return d3.svg.axis()
    //        .scale(x)
    //        .orient("bottom")
    // //       .ticks(6)
    //        .tickValues([24, 48, 72, 96, 120, 144, 168]);
    //}

    var svg = d3.select("#" + chart).append("svg")
        .attr("id", chart + "_svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function (d) { return d[x_ds]; }));
    y.domain(d3.extent(data, function (d) { return d[y_ds]; }));

    var gX = svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
      //  .ticks(d3.time.minutes, 15)
      //.tickFormat(d3.time.format("%H:%M"))
        .call(d3.axisBottom(x));

    var gY = svg.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
      .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Temp (C)");

    // add line
    if (!no_line) {
        svg.append("path")
         .datum(data)
         .attr("class", "line")
         .attr("d", line)
    }

    // Add circles 
    if (dots) {
        svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3)
        .attr("cx", function (d) { return x(d[x_ds]); })
        .attr("cy", function (d) { return y(d[y_ds]); })
        .attr("opacity", 1)
        .style("fill", function (d) { return "#74add1;" }) //color
    }
}

function d3mv_bar_chart(args) {

    var chart = args.chart;
    var data = args.data;
    var x_ds = args.x_ds;
    var y_ds = args.y_ds;
    var width = args.width || 500;
    var height = args.height || width / 1.618;
    var margin = args.margin || { top: 20, right: 20, bottom: 30, left: 50 };
    var color = args.color || "#1f78b4";
    

    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    data.forEach(function (d) {                             //Todo - configurable date field
        Object.keys(data[0]).filter(function (k) { return k != "Date" }).forEach(function (k) {
            d[k] = +d[k];
        });
    });

  //  var x = d3.scale.ordinal().rangeRoundBands([0, width], .1);
    var x = d3.scaleBand().range([0, width], .1);  //.domain(d3.range(data.length))


    var y = d3.scaleLinear()
        .range([height, 0]);

    //var xAxis = d3.svg.axis()
    //.scale(x)
    //.orient("bottom");

    //var yAxis = d3.svg.axis()
    //    .scale(y)
    //    .orient("left")
    //    .ticks(10, "%");

    var svg = d3.select("#" + chart).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function (d) { return d[x_ds]; }));
    y.domain([0, d3.max(data, function (d) { return d[y_ds]; })]);

    //svg.append("g")
    //    .attr("class", "x axis")
    //    .attr("transform", "translate(0," + height + ")")
    //    .call(xAxis);

    //svg.append("g")
    //    .attr("class", "y axis")
    //    .call(yAxis)
    //  .append("text")
    //    .attr("transform", "rotate(-90)")
    //    .attr("y", 6)
    //    .attr("dy", ".71em")
    //    .style("text-anchor", "end")
    //    .text("Frequency");

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d[x_ds]); })
        .attr("width", x.bandwidth())
        .attr("y", function (d) { return y(d[y_ds]); })
        .attr("height", function (d) { return height - y(d[y_ds]); });

    var gX = svg.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
  //  .ticks(d3.time.minutes, 15)
  //.tickFormat(d3.time.format("%H:%M"))
    .call(d3.axisBottom(x));

    var gY = svg.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y))
      .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Temp (C)");


}

function d3mv_stacked_bar_chart(args) {

    var chart = args.chart;
    var data1 = args.data;
    var x_ds = args.x_ds;
    var y_ds = args.y_ds;
    var width = args.width || 500;
    var height = args.height || width / 1.618;
    var margin = args.margin || { top: 20, right: 20, bottom: 30, left: 40 };
   // var color = args.color || "#1f78b4";
    var colors = args.colors || d3.schemeCategory20;

    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    var svg = d3.select("#" + chart).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1)
    .align(0.1);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var stack = d3.stack();

    var columns = Object.keys(data1[0]).slice(1);

    // adding total field
    for (var i in data1) {
        var row = data1[i];
        for (i = 0, t = 0; i < columns.length; ++i) t += row[columns[i]] = +row[columns[i]];
        row.total = t;
    }

    data1.sort(function (a, b) { return b.total - a.total; });

    x.domain(data1.map(function (d) { return d.State; }));
    y.domain([0, d3.max(data1, function (d) { return d.total; })]).nice();
    z.domain(columns);

    ccc = stack.keys(columns)(data1);

    g.selectAll(".serie")
      .data(ccc) //stack.keys(data.columns.slice(1))(data)
      .enter().append("g")
        .attr("class", "serie")
        .attr("fill", function (d) { return z(d.key); })
      .selectAll("rect")
      .data(function (d) { return d; })
      .enter().append("rect")
        .attr("x", function (d) { return x(d.data.State); })
        .attr("y", function (d) { return y(d[1]); })
        .attr("height", function (d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth());

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "s"))
      .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks(10).pop()))
        .attr("dy", "0.35em")
        .attr("text-anchor", "start")
        .attr("fill", "#000")
        .text("Population");

    var legend = g.selectAll(".legend")
      .data(columns.reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; })
        .style("font", "10px sans-serif");

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", z);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .text(function (d) { return d; });

    ccc = stack.keys(columns)(data1);

    g.selectAll(".serie")
      .data(ccc) 
      .enter().append("g")
        .attr("class", "serie")
        .attr("fill", function (d) { return z(d.key); })
      .selectAll("rect")
      .data(function (d) { return d; })
      .enter().append("rect")
        .attr("x", function (d) { return x(d.data.State); })
        .attr("y", function (d) { return y(d[1]); })
        .attr("height", function (d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth());

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "s"))
      .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks(10).pop()))
        .attr("dy", "0.35em")
        .attr("text-anchor", "start")
        .attr("fill", "#000")
        .text("Population");

    var legend = g.selectAll(".legend")
      .data(columns.reverse())
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; })
        .style("font", "10px sans-serif");

    legend.append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", z);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .text(function (d) { return d; });
}

//used for PhySod demo
function d3mv_stacked_bar_chart_link(args) {

    var chart = args.chart;
    var data1 = args.data;
    var x_ds = args.x_ds;
    var y_ds = args.y_ds;
    var width = args.width || 500;
    var height = args.height || width / 1.618;
    var margin = args.margin || { top: 20, right: 20, bottom: 30, left: 40 };
    // var color = args.color || "#1f78b4";
    var colors = args.colors || d3.schemeCategory20;

    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    var svg = d3.select("#" + chart).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom);
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var x = d3.scaleBand()
    .rangeRound([0, width])
    .padding(0.1)
    .align(0.1);

    var y = d3.scaleLinear()
        .rangeRound([height, 0]);

    var z = d3.scaleOrdinal()
   //     .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    //.range(["#8c3b26", "#b4683f", "#e2914b", "#73b0d3", "#57859f", "#3a586a", "#3a586a"]);
    .range(colors); //d3.schemeCategory20
    var stack = d3.stack();

    var columns = Object.keys(data1[0]).slice(1);

    // adding total field
    for (var i in data1) {
        var row = data1[i];
        for (i = 0, t = 0; i < columns.length; ++i) t += row[columns[i]] = +row[columns[i]];
        row.total = t;
    }

    //data1.sort(function (a, b) { return b.total - a.total; });

    //--------- 3) TODO --> change state....
    x.domain(data1.map(function (d) { return d.State; }));
    y.domain([0, d3.max(data1, function (d) { return d.total; })]).nice();
    z.domain(columns);

    ccc = stack.keys(columns)(data1);

  //  console.log("------");
   // console.log(data1);

    g.selectAll(".serie")
      .data(ccc) //stack.keys(data.columns.slice(1))(data)
      .enter().append("g")
        .attr("class", "serie")
        .attr("fill", function (d) { return z(d.key); })
           .on("click", function (d) {
               alert(d.State);
           })
      .selectAll("rect")
      .data(function (d) { return d; })
      .enter().append("rect")
        .attr("x", function (d) { return x(d.data.State); })
        .attr("y", function (d) { return y(d[1]); })
        .attr("height", function (d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth());

    //g.append("g")
    //    .attr("class", "axis axis--x")
    //    .attr("transform", "translate(0," + height + ")")
    //    .call(d3.axisBottom(x));


    // ====== TODO: make parameter
    // Y axis label!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //g.append("g")
    //   // .attr("transform", "translate(" + x(1) + ",0)")
    //    .attr("class", "axis axis--y")
    //    //<g transform="translate(80,0)">
    //    .attr("transform", "translate(-10,0)")
    //    .call(d3.axisLeft(y).ticks(10, "s"));
    ////  .append("text")
    ////    .attr("x", 2)
    ////    .attr("y", y(y.ticks(10).pop()))
    ////    .attr("dy", "0.35em")
    ////    .attr("text-anchor", "start")
    ////    .attr("fill", "#000")
    ////    .text("Population");

    g.append("g")
  
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y)
        .ticks(20)
        .tickFormat(d3.format(".0s"))
        )
      //.append("text")
      //  .attr("x", 2)
      //  .attr("y", y(y.ticks(10).pop()))
      //  .attr("dy", "0.35em")
      //  .attr("text-anchor", "start")
      //  .attr("fill", "#000")
      //  .text("Population");

    svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 20)
            .attr("x", -height/2)
            .attr("dy", "1em")
            .style("text-anchor", "end")
            .style("font-size", "14px")
            .text("Sensors");



    var legend = g.selectAll(".legend")
      .data(columns) //.reverse()
      .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) { return "translate(0," + (i * 20 + 40) + ")"; })
        .style("font", "10px sans-serif");

    legend.append("rect")
        .attr("x", width + margin.right - 34)
        .attr("width", 18)
        .attr("height", 18)
        .attr("fill", z);

    legend.append("text")
        .attr("x", width + margin.right - 78)
        .attr("y", 9)
        .attr("dy", ".35em")
        .attr("text-anchor", "end")
        .text(function (d) { return d; });

    ccc = stack.keys(columns)(data1);

    g.selectAll(".serie")
      .data(ccc)
      .enter().append("g")
        .attr("class", "serie")
        .attr("fill", function (d) { return z(d.key); })
      .selectAll("rect")
      .data(function (d) { return d; })
      .enter().append("rect")
        .attr("x", function (d) { return x(d.data.State); })
        .attr("y", function (d) { return y(d[1]); })
        .attr("height", function (d) { return y(d[0]) - y(d[1]); })
        .attr("width", x.bandwidth());

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        //.attr("transform", function (d) {return "rotate(-65)"})
        .call(d3.axisBottom(x))
        // 1) ====== TODO: copy to ev lib with parameter option!!!!
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

    // 2) ====== TODO: make parameter to add y axis legend!!
    //g.append("g")
    //    .attr("class", "axis axis--y")
    //    .call(d3.axisLeft(y).ticks(10, "s"))
    //  .append("text")
    //    .attr("x", 2)
    //    .attr("y", y(y.ticks(10).pop()))
    //    .attr("dy", "0.35em")
    //    .attr("text-anchor", "start")
    //    .attr("fill", "#000")
    //    .text("Sensors_count");

    //var legend = g.selectAll(".legend")
    //  .data(columns) //.reverse()
    //  .enter().append("g")
    //    .attr("class", "legend")
    //    .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; })
    //    .style("font", "10px sans-serif");

    //legend.append("rect")
    //    .attr("x", width - 18)
    //    .attr("width", 18)
    //    .attr("height", 18)
    //    .attr("fill", z);

    //legend.append("text")
    //    .attr("x", width - 24)
    //    .attr("y", 9)
    //    .attr("dy", ".35em")       
    //    .attr("text-anchor", "end")
    //    .text(function (d) { return d; });
}

function d3mv_scatter_plot(args) {

    var chart = args.chart;
    var data = args.data;
    var x_ds = args.x_ds;
    var y_ds = args.y_ds;
    var width = args.width || 500;
    var margin = args.margin || { top: 20, right: 20, bottom: 30, left: 50 };
    var height = args.height || width / 1.618;
    var color = args.color || "#1f78b4";

    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

      //tooltip
    var tooltip = d3.select("body").append("div")
                   .attr("class", "tooltip")
                   .style("opacity", 0);

    data.forEach(function (d) {                             //Todo - configurable date field
        Object.keys(data[0]).filter(function (k) { return k != "Date" && k != "grade_auto" && k != "sensors_group" }).forEach(function (k) {
            d[k] = +d[k];
        });
    });


        var x = d3.scaleLinear()
                 .range([0, width]);

        var y = d3.scaleLinear()
            .range([height, 0]);

        var xAxis = d3.axisBottom(x).ticks(12),
            yAxis = d3.axisLeft(y).ticks(12 * height / width);

        var svg = d3.select("#" + chart).append("svg")
                 .attr("id", chart + "_svg")
                 .attr("data-margin-right", margin.right)
                 .attr("data-margin-left", margin.left)
                 .attr("data-margin-top", margin.top)
                 .attr("data-margin-bottom", margin.bottom)
                 .attr("width", width + margin.left + margin.right)
                 .attr("height", height + margin.top + margin.bottom)
                 .append("g")
                 .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        x.domain(d3.extent(data, function (d) { return d[x_ds]; })).nice();
        //console.log(d3.extent(data, function (d) { return d[x_ds]; }));
        y.domain(d3.extent(data, function (d) { return d[y_ds]; })).nice();

        svg.append("g")
        .attr("class", "x axis ")
        .attr('id', "axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
        //.append("text")
        //    .attr("class", "label")
        //    .attr("x", width)
        //    .attr("y", -6)
        //    .style("text-anchor", "end")
        //    .text("Time between Eruptions (min.)");


        svg.append("g")
            .attr("class", "y axis")
            .attr('id', "axis--y")
            .call(yAxis);
            //.append("text")
            //    .attr("class", "axis-title")
            //    .attr("transform", "rotate(-90)")
            //    .attr("y", 6)
            //    .attr("dy", ".71em")
            //    .style("text-anchor", "end")
            //    .text("Change in Price");



        svg.selectAll(".dot")
            .data(data)
          .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 4)
            .attr("cx", function (d) { return x(d[x_ds]); })
            .attr("cy", function (d) { return y(d[y_ds]); })
            .attr("opacity", 0.5)
            .style("fill", color);
     

}

function d3mv_scatter_plot1(args) {

    var chart = args.chart;
    var data = args.data;
    var x_ds = args.x_ds;
    var y_ds = args.y_ds;
    var width = args.width || 500;
    var margin = args.margin || { top: 20, right: 20, bottom: 30, left: 50 };
    var height = args.height || width / 1.618;
    var color = args.color || "#1f78b4";  //{col: "col name", colors:[]}

    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    //tooltip
    var tooltip = d3.select("body").append("div")
                   .attr("class", "tooltip")
                   .style("opacity", 0);

    data.forEach(function (d) {                             //Todo - configurable date field
        Object.keys(data[0]).filter(function (k) { return k != "Date" && k != "grade_auto" && k != "sensors_group" }).forEach(function (k) {
            d[k] = +d[k];
        });
    });

    var x = d3.scaleLinear()
             .range([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);

    var xAxis = d3.axisBottom(x).ticks(12),
        yAxis = d3.axisLeft(y).ticks(12 * height / width);

    var svg = d3.select("#" + chart).append("svg")
             .attr("id", chart + "_svg")
             .attr("data-margin-right", margin.right)
             .attr("data-margin-left", margin.left)
             .attr("data-margin-top", margin.top)
             .attr("data-margin-bottom", margin.bottom)
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom)
             .append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function (d) { return d[x_ds]; })).nice();
    //console.log(d3.extent(data, function (d) { return d[x_ds]; }));
    y.domain(d3.extent(data, function (d) { return d[y_ds]; })).nice();

    svg.append("g")
    .attr("class", "x axis ")
    .attr('id', "axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
    //.append("text")
    //    .attr("class", "label")
    //    .attr("x", width)
    //    .attr("y", -6)
    //    .style("text-anchor", "end")
    //    .text("Time between Eruptions (min.)");


    svg.append("g")
        .attr("class", "y axis")
        .attr('id', "axis--y")
        .call(yAxis);
    //.append("text")
    //    .attr("class", "axis-title")
    //    .attr("transform", "rotate(-90)")
    //    .attr("y", 6)
    //    .attr("dy", ".71em")
    //    .style("text-anchor", "end")
    //    .text("Change in Price");

    if (typeof (color) == "object")
    { var color_picker = d3.scaleLinear()
                .domain([0, 1])
                .range(color.range)
                .interpolate(d3.interpolateHcl); }


    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function (d) { return x(d[x_ds]); })
        .attr("cy", function (d) { return y(d[y_ds]); })
        .attr("opacity", 0.5)
        .style("fill", function (d) {
            if (typeof (color) == "string")
            { return color; }
            else
            { return color_picker(d[color["col"]]); }
        })
         .on("mouseover", function (d) {
             tooltip.transition()
                 .duration(500)
                 .style("opacity", .9);
             tooltip.html("x: " + d[x_ds] + "<br/>y: " + d[y_ds] + "<br/>id: " + d["id"])
                 .style("left", (d3.event.pageX + 20) + "px")
                 .style("top", (d3.event.pageY - 20) + "px");
             d3.select("#sensor_id").html(d["id"]);


             $("#sensor_id").val("sensor_id").trigger('change');

             // $("#id").val("-09-9-9 -09").trigger('change');
         })

    .on("mouseout", function (d) {
        tooltip.transition()
               .duration(500)
               .style("opacity", 0);
    })
    .on("click", function (d) {
    });

   // typeof (42)



}

function d3mv_scatter_plot_gib(args) {

    var chart = args.chart;
    var data = args.data;
    var x_ds = args.x_ds;
    var y_ds = args.y_ds;
    var width = args.width || 500;
    var margin = args.margin || { top: 20, right: 20, bottom: 30, left: 50 };
    var height = args.height || width / 1.618;
    var color = args.color || "#1f78b4";

    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    //tooltip
    var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

    var x = d3.scaleLinear()
         .range([0, width]);

    var y = d3.scaleLinear()
        .range([height, 0]);

    var xAxis = d3.axisBottom(x).ticks(12),
        yAxis = d3.axisLeft(y).ticks(12 * height / width);

    var svg = d3.select("#" + chart).append("svg")
             .attr("id", "g1_svg")
             .attr("data-margin-right", margin.right)
             .attr("data-margin-left", margin.left)
             .attr("data-margin-top", margin.top)
             .attr("data-margin-bottom", margin.bottom)
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom)
             .append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function (d) { return d[x_ds]; })).nice();
    //console.log(d3.extent(data, function (d) { return d[x_ds]; }));
    y.domain(d3.extent(data, function (d) { return d[y_ds]; })).nice();

    svg.append("g")
    .attr("class", "x axis ")
    .attr('id', "axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr('id', "axis--y")
        .call(yAxis);

    var dot = svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5)
        .attr("cx", function (d) { return x(d[x_ds]); })
        .attr("cy", function (d) { return y(d[y_ds]); })
        .attr("opacity", 0.7)
        .style("fill", "#4292c6");

    //svg.append("g")
    // .call(d3.brush().extent([[0, 0], [width, height]]).on("brush", brushed).on("end", brushended));


    //function brushed() {
    //    var s = d3.event.selection,
    //        x0 = s[0][0],
    //        y0 = s[0][1],
    //        dx = s[1][0] - x0,
    //        dy = s[1][1] - y0;
    //    // console.log(s);

    //    svg.selectAll('circle')
    //       .style("fill", function (d) {
    //           if (x(d.x) >= x0 && x(d.x) <= x0 + dx && y(d.y) >= y0 && y(d.y) <= y0 + dy)
    //           { return "#ec7014"; }
    //           else { return "#4292c6"; }
    //       });
    //}

    //function brushended() {
    //    if (!d3.event.selection) {
    //        svg.selectAll('circle')
    //          .transition()
    //          .duration(150)
    //          .ease(d3.easeLinear)
    //          .style("fill", "#4292c6");
    //    }
    //}


    //  //tooltip
    //  var tooltip = d3.select("body").append("div")
    //              .attr("class", "tooltip")
    //              .style("opacity", 0);

    //  var x = d3.scaleLinear()
    //      .range([0, width]);

    //  var y = d3.scaleLinear()
    //      .range([height, 0]);


    //  var xAxis = d3.axisBottom(x).ticks(12),
    //      yAxis = d3.axisLeft(y).ticks(12 * height / width);

    //  //var xAxis = d3.svg.axis()
    //  //    .scale(x)
    //  //    .orient("bottom").ticks(20);

    //  //var yAxis = d3.svg.axis()
    //  //    .scale(y)
    //  //    .orient("left")

    //  var svg = d3.select("#" + chart).append("svg")
    //  .attr("id", chart + "_svg")
    //            //.attr("data-margin-right", margin.right)
    //            //.attr("data-margin-left", margin.left)
    //            //.attr("data-margin-top", margin.top)
    //            //.attr("data-margin-bottom", margin.bottom)
    //  .attr("width", width + margin.left + margin.right)
    //  .attr("height", height + margin.top + margin.bottom)
    // // .call(d3.behavior.zoom().on("zoom", function () {
    ////      svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
    // // }))
    //  .append("g")
    //  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //  x.domain(d3.extent(data, function (d) { return d[x_ds]; })).nice();
    //  y.domain([d3.min(data, function (d) { return d[y_ds]; }), d3.max(data, function (d) { return d[y_ds]; })]).nice();


    //  var gX = svg.append("g")
    //  .attr("class", "axis axis--x")
    //  .attr("transform", "translate(0," + height + ")")

    ////  .ticks(d3.time.minutes, 15)
    ////.tickFormat(d3.time.format("%H:%M"))
    //  .call(xAxis);

    //  var gY = svg.append("g")
    //      .attr("class", "axis axis--y")
    //      .call(yAxis)
    //    .append("text")
    //      .attr("class", "axis-title")
    //      .attr("transform", "rotate(-90)")
    //      .attr("y", 6)
    //      .attr("dy", ".71em")
    //      .style("text-anchor", "end")
    //      .text("Temp (C)");
    //  //svg.append("g")
    //  //.attr("class", "x axis")
    //  //.attr('id', "Sum Square")
    //  //.attr("transform", "translate(0," + height + ")")
    //  //.call(xAxis);

    //  //svg.append("g")
    //  //    .attr("class", "y axis")
    //  //    .attr('id', "Sum")
    //  //    .call(yAxis);

    //  svg.selectAll(".dot")
    //      .data(data)
    //    .enter().append("circle")
    //      .attr("class", "dot")
    //      .attr("r", 4)
    //      .attr("cx", function (d) { return x(d[x_ds]); })
    //      .attr("cy", function (d) { return y(d[y_ds]); })
    //      .attr("opacity", 0.5)
    //      .style("fill", function (d) { return color; })
    //  .on("mouseover", function (d) {
    //      //    d3.select("#sensor_id").html(d[x_ds]);
    //      //    $("#sensor_id").val("sensor_id").trigger('change');
    //  })
    //  .on("mouseout", function (d) {
    //  })
    //  .on("click", function (d) {
    //  });

}

function d3mv_Histogram(args) {

    var chart = args.chart;
    var values = args.values;
    var width = args.width || 500;
    var height = args.height || width / 1.618;
    var margin = args.margin || { top: 20, right: 20, bottom: 30, left: 50 };
    var add_text = args.add_text || false;
    var highlight = args.highlight || null;

    var formatCount = d3.format(",.0f");

    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    // review: https://bl.ocks.org/mbostock/3048450
    //         https://bl.ocks.org/d3noob/96b74d0bd6d11427dd797892551a103c
    //         http://bl.ocks.org/bradoyler/6b6e481d97f5eac64c76c8ce1edc5f3f

   // cl(values, "values");

    var max = d3.max(values);
    var min = d3.min(values);
    var x = d3.scaleLinear()
          .domain([min, max])
          .rangeRound([0, width]);

    //var x = d3.scaleLinear()
    //    .rangeRound([0, width]);

    var bins = d3.histogram()
        .domain(x.domain())
        .thresholds(x.ticks(20))
        (values);

    console.log("max" + max);
    console.log("min" + min);
    console.log(bins);
   
    var y = d3.scaleLinear()
        .domain([0, d3.max(bins, function (d) { return d.length; })])
        .range([height, 0]);

    var colors = ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837']


    var svg = d3.select("#" + chart).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var bar = svg.selectAll(".bar")
        .data(bins)
      .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

    bar.append("rect")
        .attr("x", 1)
        .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
        .attr("height", function (d) { return height - y(d.length); })
    //    .style("fill", "#f46d43");
    .style("fill", function (d) {
        // if (bins[0].x1 < 27 || bins[0].x0 > 27)
        if (highlight != null) {
            if (d.x1 >= highlight && d.x0 < highlight)
           { return colors[2]; }
        }
    //else
        //{ return colors[7]; }
    });

    if (add_text) {
        bar.append("text")
            .attr("dy", ".75em")
            .attr("y", -12)
            .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
            .attr("text-anchor", "middle")
            .text(function (d) { return formatCount(d.length); });
    }

    svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));


    //var xAxis = d3.svg.axis()
    //    .scale(x)
    //    .orient("bottom");


    //if (add_text) {
    //    bar.append("text")
    //        .attr("dy", ".75em")
    //        .attr("y", -12)
    //        .attr("x", (x(data[0].dx) - x(0)) / 2)
    //        .attr("text-anchor", "middle")
    //        .text(function (d) { return formatCount(d.y); });
    //}

    //svg.append("g")
    //    .attr("class", "x axis")
    //    .attr("transform", "translate(0," + height + ")")
    //    .call(xAxis);
 


}

function d3mv_box_plot(args) {

    var chart = args.chart;
    var data = args.data;
    var values = args.values;
    var width = args.width || 500;
    var margin = args.margin || { top: 10, right: 20, bottom: 20, left: 20 };
    var height = args.height || width / 1.618;
    var color = args.color || "#1f78b4";
    var highlight = args.highlight || null;
    var showAxis = args.showAxis || 1;          //TODO: change to true / false. passing argument issue

    
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    values = values.sort(function (a, b) { return a - b; });

    var min = d3.min(values),
    max = d3.max(values);
    median = d3.median(values);

    var q1 = d3.quantile(values, 0.25),
        q3 = d3.quantile(values, 0.75),
        w1 = q1 - 1.5 * (q3 - q1),
        w1 = d3.min(values.filter(function (v) { return v <= q1 && v >= w1; }));

        w2 = q3 + 1.5 * (q3 - q1);
        w2 = d3.max(values.filter(function (v) { return v >= q3 && v <= w2; }));
    
   var outliers = values.filter(function (v) { return v > w2 || v < w1; });
      
    //tooltip
    //var tooltip = d3.select("body").append("div")
    //               .attr("class", "tooltip")
    //               .style("opacity", 0);

    var x = d3.scaleLinear()
             .range([0, width]);

    var xAxis = d3.axisBottom(x).ticks(12);

    var svg = d3.select("#" + chart).append("svg")
             .attr("id", chart + "_svg")
             .attr("data-margin-right", margin.right)
             .attr("data-margin-left", margin.left)
             .attr("data-margin-top", margin.top)
             .attr("data-margin-bottom", margin.bottom)
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom)
             .append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(values)).nice();


 
    if (showAxis==1) {
    svg.append("g")
    .attr("class", "x axis ")
    .attr('id', "axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
    }

    if (showAxis == 1) {
        var boxplot_width = height * 0.5;
    }
    else {
        var boxplot_width = height * 0.9;
    }

    var y_loc = height * 0.5 - boxplot_width/2;

    svg.append("rect")
        .attr("x", x(q1))
        .attr("y", y_loc)
        .attr("width", x(q3) - x(q1))
        .attr("height", boxplot_width)
        .style("opacity", 1.0)
        .style("fill", "#e0e0e0");  //#74add1

    // add median line
    svg.append("line")
        .style("stroke", "black")
        .attr("x1", x(median))
        .attr("y1", y_loc)
        .attr("x2", x(median))
        .attr("y2", y_loc + boxplot_width);

    // add lower whisker line
    svg.append("line")
        .style("stroke", "black")
        .attr("x1", x(w1))
        .attr("y1", y_loc)
        .attr("x2", x(w1))
        .attr("y2", y_loc + boxplot_width);

    svg.append("line")
        .style("stroke", "black")
        .attr("x1", x(w1))
        .attr("y1", y_loc + boxplot_width/2)
        .attr("x2", x(q1))
        .attr("y2", y_loc + boxplot_width/2);


    // add upper whisker line
    svg.append("line")
        .style("stroke", "black")
        .attr("x1", x(w2))
        .attr("y1", y_loc)
        .attr("x2", x(w2))
        .attr("y2", y_loc + boxplot_width);

    svg.append("line")
        .style("stroke", "black")
        .attr("x1", x(q3))
        .attr("y1", y_loc + boxplot_width/2)
        .attr("x2", x(w2))
        .attr("y2", y_loc + boxplot_width/2);


    // adding outlier points
    console.log("===============");
    console.log(outliers.length);
    console.log("-----------");

    for (i = 0; i < outliers.length; i++) {
        console.log(outliers[i]); 

             svg.append("circle")
            .attr("cx", x(outliers[i]))
            .attr("cy", y_loc + boxplot_width / 2)
            .attr("r", 5)
            .style("opacity", 0.5)
            .style("fill", "#969696");
    }


    //outliers.length - 1

    //for (i = 0; i < 2; i = i++) {
    //console.log(i); 
    //   console.log(outliers[i]);
    //    console.log("-----------");
    //}

   
    

    // adding highlight dot
    if (highlight != null) {
        svg.append("circle")
            .attr("cx", x(highlight))
            .attr("cy", y_loc + boxplot_width / 2)
            .attr("r", 5)
            .style("opacity", 1.0)
            .style("fill", "#f46d43");
    }

}

function d3mv_heatmap(args) {

    var chart = args.chart;
    var data = args.data;
    var width = args.width || 500;
    var margin = args.margin || { top: 15, right: 15, bottom: 15, left: 15 };
    var cm = args.cm || false;
  //  var height = args.height || width / 1.618;
  //  var add_text = args.add_text || false;
   

    width = width - margin.left - margin.right,
    height = width;
    
    data.forEach(function (d) {                             //Todo - configurable date field
        Object.keys(data[0]).filter(function (k) { return k != "Date" }).forEach(function (k) {
            d[k] = +d[k];
        });
    });


    var colorRange = ['#d73027', '#e0e0e0', '#4575b4'];  //blue  red white
    var x = d3.scaleBand().domain(d3.range(data.length)).range([0, width]);
    var color = d3.scaleLinear().range(colorRange);

    if (cm)
    { color.domain([-1, 0, 1]); }
    else
    {

       // Object.keys(data[0]).forEach(function (k) {
       //         //d[k] = +d[k];
       //         return d3.max(d[k]);
       //     });
       
        color.domain([-1, 0, 9]);
       //console.log(xxx);

       // var max = d3.max(data, function (d) {
       //     return d3.max(d);
       // });
       // console.log("max dfs");
       // console.log(max);
       // var min = d3.min(data, function (d) {
       //     return d3.min(d);
       // });

       // console.log("min");
       // console.log(min);
       // color.domain([min, (max-min)/2, max]);
    }
   
    var svg = d3.select("#" + chart).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
            //.call(d3.behavior.zoom().on("zoom", function () {
            //    svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
            //}))

        .append("g")
     //   .attr("transform", "translate(" + (margin) + "," + (margin) + ")");
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    //console.log(data);
    var row = svg.selectAll(".row")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "row")
        .attr("transform", function (d, i) { return "translate(0," + x(i) + ")"; })
        .each(row);

    var column = svg.selectAll(".column")
        .data(data)
        .enter().append("g")
        .attr("class", "column")
        .attr("transform", function (d, i) { return "translate(" + x(i) + ")rotate(-90)"; });


    function row(row) {

        var array = Object.keys(row).map(function (k) { return row[k]; });
        array.shift();

        var cell = d3.select(this).selectAll(".cell")
            .data(array)
            .enter()
            .append("rect")
            .attr("class", "cell")
            .attr("x", function (d, i) { return x(i); })
            .attr("width", x.bandwidth())
            .attr("height", x.bandwidth())
            .style("fill", function (d) { return color(d); });

    }



  //  d3.csv('data/cor/cor_bicovm_week9.csv', function (error, data) {
    //    if (error) return console.log(error);

   ////     ////console.log(data);
   ////     var row = svg.selectAll(".row")
   ////         .data(data)
   ////         .enter()
   ////         .append("g")
   ////         .attr("class", "row")
   ////         .attr("transform", function (d, i) { return "translate(0," + x(i) + ")"; })
   ////         .each(row);

   ////     var column = svg.selectAll(".column")
   ////         .data(data)
   ////         .enter().append("g")
   ////         .attr("class", "column")
   ////         .attr("transform", function (d, i) { return "translate(" + x(i) + ")rotate(-90)"; });


   ////     function row(row) {

   ////         var array = Object.keys(row).map(function (k) { return row[k]; });
   ////         array.shift();

   ////         var cell = d3.select(this).selectAll(".cell")
   ////             .data(array)
   ////             .enter()
   ////             .append("rect")
   ////             .attr("class", "cell")
   ////             .attr("x", function (d, i) { return x(i); })
   ////             .attr("width", x.range())
   ////             .attr("height", x.range())
   ////             .style("fill", function (d) { return color(d); });

   ////     }

   ////// })





   //// //var max = d3.max(values);
   //// //var min = d3.min(values);
   //// //var x = d3.scaleLinear()
   //// //      .domain([min, max])
   //// //      .rangeRound([0, width]);

   //// //var bins = d3.histogram()
   //// //    .domain(x.domain())
   //// //    .thresholds(x.ticks(20))
   //// //    (values);

   //// //console.log("max" + max);
   //// //console.log("min" + min);
   //// //console.log(bins);

   //// //var y = d3.scaleLinear()
   //// //    .domain([0, d3.max(bins, function (d) { return d.length; })])
   //// //    .range([height, 0]);

   //// //var colors = ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837']


   //// //var svg = d3.select("#" + chart).append("svg")
   //// //    .attr("width", width + margin.left + margin.right)
   //// //    .attr("height", height + margin.top + margin.bottom)
   //// //  .append("g")
   //// //    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   //// //var bar = svg.selectAll(".bar")
   //// //    .data(bins)
   //// //  .enter().append("g")
   //// //    .attr("class", "bar")
   //// //    .attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

   //// //bar.append("rect")
   //// //    .attr("x", 1)
   //// //    .attr("width", x(bins[0].x1) - x(bins[0].x0) - 1)
   //// //    .attr("height", function (d) { return height - y(d.length); })
   //// ////    .style("fill", "#f46d43");
   //// //.style("fill", function (d) {
   //// //    // if (bins[0].x1 < 27 || bins[0].x0 > 27)
   //// //    if (highlight != null) {
   //// //        if (d.x1 >= highlight && d.x0 < highlight)
   //// //        { return colors[2]; }
   //// //    }
   //// //    //else
   //// //    //{ return colors[7]; }
   //// //});

   //// //if (add_text) {
   //// //    bar.append("text")
   //// //        .attr("dy", ".75em")
   //// //        .attr("y", -12)
   //// //        .attr("x", (x(bins[0].x1) - x(bins[0].x0)) / 2)
   //// //        .attr("text-anchor", "middle")
   //// //        .text(function (d) { return formatCount(d.length); });
   //// //}

   //// //svg.append("g")
   //// //    .attr("class", "axis axis--x")
   //// //    .attr("transform", "translate(0," + height + ")")
   //// //    .call(d3.axisBottom(x));

}

function d3mv_force_new(args) {

    var chart = args.chart;
    var node_att = args.nodes;
    var data = args.links;
    var width = args.width || 500;
    var height = args.height || width / 1.618;
    var radius = args.radius || 4.5;
    var charge = args.charge || -40;
    var labels = args.labels || 0;
    //  var add_text = args.add_text || false;
    // Todo!! missing margins: { top: 15, right: 15, bottom: 15, left: 15 };

    var svg = d3.select("#" + chart).append("svg")
        .attr("width", width)
        .attr("height", height);

    //var k = Math.sqrt(10 / (width * height)); //root.nodes.length

    var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id; }).distance(function (d) { return d.value / 2; }))//
    .force("charge", d3.forceManyBody().strength(charge)) //- 120
    .force("center", d3.forceCenter(width / 2, height / 2));


    // Create links
    var links = [];
    links = data.map(function (d, i) {
        return {
            index: i + 1,
            source: d.from,
            target: d.to,
            value: +d.weight
        };
    });

    
    // console.log(links);
    function nodeByName(name) {
        return nodesByName[name] || (nodesByName[name] = { name: name });
    }

    // Create nodes for each unique source and target.
    var nodesByName = {};
    links.forEach(function (link, i) {
        link.source = nodeByName(link.source);
        link.target = nodeByName(link.target);
    });

    // Extract the array of nodes from the map by name.
    var nodes = d3.values(nodesByName);
    var result;
    nodes.forEach(function (node) {
            result = node_att.filter(function (d) {
                return node.name == d.name;  
            });
            node.color = (result[0] !== undefined) ? result[0].EigenvectorCentrality_10 : null;

    });


   // console.table(nodes);
    var graph = { "nodes": nodes, "links": links };



//    console.log("nodes");
  //  console.table(graph.nodes);
  //  console.log("links");
   // console.table(graph.links);


    var step = d3.scaleLinear()
             .domain([1, 8])
             .range([0, 1]);

    var color3 = d3.scaleLinear()
                    .domain([1, step(2), step(3), step(4), step(5), step(6), step(7), 20])
                    .range(['#1a9850','#66bd63', '#a6d96a','#d9ef8b','#fee08b', '#fdae61','#f46d43', '#d73027'])
                    .interpolate(d3.interpolateHcl); //interpolateHsl interpolateHcl interpolateRgb
   

    //  console.log(graph.nodes);

    var link = svg.append("g")
       .attr("class", "links")
       .selectAll("line")
       .data(graph.links)
       .enter().append("line")
          .attr("stroke-width", 2);;   //function (d) { return Math.sqrt(d.value); }

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("class", "node")
       // .style("fill", "#2166ac")
        .style("fill", function (d) { return color3(d.color); })
        .attr("r", radius)
        .on("mouseover", function (d) {
            //tooltip.transition()
            //    .duration(500)
            //    .style("opacity", .9);
            //tooltip.html("x: " + d[x_ds] + "<br/>y: " + d[y_ds] + "<br/>id: " + d["id"])
            //    .style("left", (d3.event.pageX + 20) + "px")
            //    .style("top", (d3.event.pageY - 20) + "px");
            d3.select("#sensor_id").html(d["name"]);
            $("#sensor_id").val("sensor_id").trigger('change');

            // $("#id").val("-09-9-9 -09").trigger('change');
        })

    .on("mouseout", function (d) {
        //tooltip.transition()
        //       .duration(500)
        //       .style("opacity", 0);
    })
    .on("click", function (d) {
    })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
       

    if (labels !== 0) {

        var label = svg.append("g")
                       .attr("class", "labels")
                       .selectAll("text")
                       .data(graph.nodes)
                       .enter().append("text")
                        .attr("class", "label")
                        .text(function (d) { return d.name; });
    }
    //node.append("text")
    //  .attr("dx", 12)
    //  .attr("dy", ".35em")
    //  .text(function (d) { return d.name });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });
        node
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });
        if (labels !== 0) {
            label
                .attr("x", function (d) { return d.x - labels.x; })
                .attr("y", function (d) { return d.y + labels.y; })
                .style("font-size", labels.size).style("fill", labels.color);
        }
    }


    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        //simulation.fix(d);
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
        //simulation.fix(d, d3.event.x, d3.event.y);
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
        //simulation.unfix(d);
    }
}

function d3mv_force(args) {

    var chart = args.chart;
    var data = args.data;
    var width = args.width || 500;
    var height = args.height || width / 1.618;
    var radius = args.radius || 4.5;
    var charge = args.charge || -40;
    var labels = args.labels || 0;
    //  var add_text = args.add_text || false;
    // Todo!! missing margins: { top: 15, right: 15, bottom: 15, left: 15 };

    var svg = d3.select("#" + chart).append("svg")
        .attr("width", width)
        .attr("height", height);

    //var k = Math.sqrt(10 / (width * height)); //root.nodes.length

    var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id; }).distance(function (d) { return d.value / 2; }))//
    .force("charge", d3.forceManyBody().strength(charge)) //- 120
    .force("center", d3.forceCenter(width / 2, height / 2));


    // Create links
    var links = [];
    links = data.map(function (d, i) {
        return {
            index: i + 1,
            source: d.from,
            target: d.to,
            value: +d.weight
        };
    });

    // console.log(links);
    function nodeByName(name) {
        return nodesByName[name] || (nodesByName[name] = { name: name });
    }

    // Create nodes for each unique source and target.
    var nodesByName = {};
    links.forEach(function (link, i) {
        link.source = nodeByName(link.source);
        link.target = nodeByName(link.target);
    });

    // Extract the array of nodes from the map by name.
    var nodes = d3.values(nodesByName);

    var graph = { "nodes": nodes, "links": links };

    //console.log("nodes");
    //console.table(graph.nodes);
    //console.log("links");
    //console.table(graph.links);

    var link = svg.append("g")
       .attr("class", "links")
       .selectAll("line")
       .data(graph.links)
       .enter().append("line")
          .attr("stroke-width", 2);;   //function (d) { return Math.sqrt(d.value); }

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .style("fill", "#2166ac")
        .attr("r", radius)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));
    
    if (labels !== 0) {

        var label = svg.append("g")
                       .attr("class", "labels")
                       .selectAll("text")
                       .data(graph.nodes)
                       .enter().append("text")
                        .attr("class", "label")
                        .text(function (d) { return d.name; });
    }
    //node.append("text")
    //  .attr("dx", 12)
    //  .attr("dy", ".35em")
    //  .text(function (d) { return d.name });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });
        node
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });
        if (labels !== 0) {
            label
                .attr("x", function (d) { return d.x - labels.x; })
                .attr("y", function (d) { return d.y + labels.y; })
                .style("font-size", labels.size).style("fill", labels.color);
           }
        }
    

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        //simulation.fix(d);
    }

     function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
        //simulation.fix(d, d3.event.x, d3.event.y);
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        //simulation.unfix(d);
    }
}

function d3mv_force_back(args) {

    var chart = args.chart;
    var data = args.data;
    var width = args.width || 500;
    var height = args.height || width / 1.618;
    var radius = args.radius || 4.5;
    var charge = args.charge || -40;
    //  var add_text = args.add_text || false;
    // Todo!! missing margins: { top: 15, right: 15, bottom: 15, left: 15 };

    var svg = d3.select("#" + chart).append("svg")
        .attr("width", width)
        .attr("height", height);

    //var k = Math.sqrt(10 / (width * height)); //root.nodes.length


     

    var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function (d) { return d.id; }).distance(function (d) { return d.value/2; }))//
    .force("charge", d3.forceManyBody().strength(charge)) //- 120
    .force("center", d3.forceCenter(width / 2, height / 2));
    
    //console.log(data);
    //data.map(function (d, i) {
    //    return {
    //        index: i + 1,
    //        source: d.from,
    //        target: d.to,
    //        value: +d.weight
    //    };
    //});
   // console.log(data);
//    var data1 = data.map(function (d, i) {
//    return {
//        index: i + 1,
//        source: d.from,
//        target: d.to,
//        value: +d.weight
//    };
//});
//    data = data1.filter(function (d) { return d.value < 250; });
//    console.log(data1);

    // Create links
    var links = [];      
    links = data.map(function (d, i) {
        return {
            index: i + 1,
            source: d.from,
            target: d.to,
            value: +d.weight
        };
    });

   // console.log(links);
    function nodeByName(name) {
        return nodesByName[name] || (nodesByName[name] = { name: name });
    }

    // Create nodes for each unique source and target.
    var nodesByName = {};
    links.forEach(function (link,i) {
        link.source = nodeByName(link.source);
        link.target = nodeByName(link.target);
    });

    // Extract the array of nodes from the map by name.
    var nodes = d3.values(nodesByName);

    var graph = { "nodes": nodes, "links": links };

    console.log(graph.nodes);

    var link = svg.append("g")
       .attr("class", "links")
       .selectAll("line")
       .data(graph.links)
       .enter().append("line")
          .attr("stroke-width", 2);;   //function (d) { return Math.sqrt(d.value); }

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("class", "node")
        .style("fill", "#2166ac")
        .attr("r", radius)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));



    node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function (d) { return d.name });

    //node.append("text")
    //  .attr("dy", 3)
    //  .attr("x", function (d) { return d.children ? -8 : 8; })
    //  .style("text-anchor", function (d) { return d.children ? "end" : "start"; })
    //  .text(function (d) { return d.name; });

    //// adds the text to the node
    //node.append("text")
    //  .attr("dy", ".35em")
    //  .attr("y", function (d) { return d.children ? -20 : 20; })
    //  .style("text-anchor", "middle")
    //  .text(function (d) { return d.name; });

    //node.text(function (d) {
    //    return d.name;
    //});

    // show node IDs
    //g.append('svg:text')
    //    .attr('x', 0)
    //    .attr('y', 4)
    //    .attr('class', 'id')
    //    .text("S"); //.text(function (d) { return d.id; });


    //text = svg.append("g").selectAll("text")
    //    .data(graph.nodes)
    //    .enter().append("text")
    //  .text("S")         //function(d) { return d.id; }
    //  .attr("x", 8)
    //  .attr("y", ".31em");

    
//    node.append("svg:text")
//.text(function (d) { return d.name; })



  //  text = svg.append("g").selectAll("text")
  //  .data(force.nodes())
  //.enter().append("text")
  //  .attr("x", 8)
  //  .attr("y", ".31em")
  //  .text(function (d) { return d.name; });


 

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);


    function ticked() {
        link
            .attr("x1", function (d) { return d.source.x; })
            .attr("y1", function (d) { return d.source.y; })
            .attr("x2", function (d) { return d.target.x; })
            .attr("y2", function (d) { return d.target.y; });
        node
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; });
    }

    function dragstarted(d) {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    function dragended(d) {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
}

function d3mv_bubbles(args) {

    var chart = args.chart;
    var data = args.data;
    var width = args.width || 500;
    var height = args.height || width / 1.618;
    var margin = args.margin || { top: 20, right: 20, bottom: 30, left: 50 };
   // var radius = args.radius || 4.5;
    var charge = args.charge || 0;
    //  var add_text = args.add_text || false;


    // Todo!!! - missing the margin part

    var padding = 3, // separation between same-color circles
        clusterPadding = 6, // separation between different-color circles
        maxRadius = 12,            //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        color = d3.scaleOrdinal(d3.schemeCategory20),
        m = 3 ; //10;data.length / 5

    //var n = data.length, // total number of circles
    //    m = data.length / 5; // number of distinct clusters


    var svg = d3.select("#" + chart).append("svg")
        .attr("width", width)
        .attr("height", height);

    //var simulation = d3.forceSimulation()
    //.force("link", d3.forceLink().id(function (d) { return d.id; }).distance(function (d) { return d.value; }))//
    //.force("charge", d3.forceManyBody().strength(charge)) //- 120
    //.force("center", d3.forceCenter(width / 2, height / 2));


    // Create clusters.
    var clusters = new Array(m);

    // Create nodes
    var nodes = data.map(function (d, i) {
        var i = d.cluster, //Math.floor(Math.random() * m),
            r = Math.floor(d.radius * 2),//Math.sqrt((i + 1) / m * -Math.log(Math.random())) * maxRadius,
            dd = { cluster: i, r: r };
        if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = dd;
        return dd;
    });

    console.log(nodes);



    let circles = svg.append('g')
  .datum(nodes)
   .selectAll('.circle')
   .data(d => d)
   .enter().append('circle')
  .attr('r', (d) => d.r)
  .attr('fill', (d) => color(d.cluster));      //color(d.cluster)
    //      .attr('stroke', 'black')
    //      .attr('stroke-width', 1);

    let simulation = d3.forceSimulation(nodes)
        .velocityDecay(0.2)
        .force("x", d3.forceX().strength(.0005))
        .force("y", d3.forceY().strength(.0005))
        .force("collide", collide)
        .force("cluster", clustering)
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("charge", d3.forceManyBody().strength(charge))
        .on("tick", ticked);


   //  //- 120
    

    //var force = d3.layout.force()
    //.nodes(nodes)
    //.size([width, height])
    //.gravity(.02)
    //.charge(0)


    function ticked() {
        circles
            .attr('cx', (d) => d.x)
            .attr('cy', (d) => d.y);
    }

    // These are implementations of the custom forces.
    function clustering(alpha) {
        nodes.forEach(function (d) {
            var cluster = clusters[d.cluster];
            if (cluster === d) return;
            var x = d.x - cluster.x,
                y = d.y - cluster.y,
                l = Math.sqrt(x * x + y * y),
                r = d.r + cluster.r;
            if (l !== r) {
                l = (l - r) / l * alpha;
                d.x -= x *= l;
                d.y -= y *= l;
                cluster.x += x;
                cluster.y += y;
            }
        });
    }

    function collide(alpha) {
        var quadtree = d3.quadtree()
            .x((d) => d.x)
            .y((d) => d.y)
            .addAll(nodes);

        nodes.forEach(function (d) {
            var r = d.r + maxRadius + Math.max(padding, clusterPadding),
                nx1 = d.x - r,
                nx2 = d.x + r,
                ny1 = d.y - r,
                ny2 = d.y + r;
            quadtree.visit(function (quad, x1, y1, x2, y2) {

                if (quad.data && (quad.data !== d)) {
                    var x = d.x - quad.data.x,
                        y = d.y - quad.data.y,
                        l = Math.sqrt(x * x + y * y),
                        r = d.r + quad.data.r + (d.cluster === quad.data.cluster ? padding : clusterPadding);
                    if (l < r) {
                        l = (l - r) / l * alpha;
                        d.x -= x *= l;
                        d.y -= y *= l;
                        quad.data.x += x;
                        quad.data.y += y;
                    }
                }
                return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
            });
        });
    }





    //// Create links
    //var links = [];
    //links = data.map(function (d, i) {
    //    return {
    //        index: i + 1,
    //        source: d.from,
    //        target: d.to,
    //        value: +d.weight
    //    };
    //});

    //function nodeByName(name) {
    //    return nodesByName[name] || (nodesByName[name] = { name: name });
    //}

    //// Create nodes for each unique source and target.
    //var nodesByName = {};
    //links.forEach(function (link, i) {
    //    link.source = nodeByName(link.source);
    //    link.target = nodeByName(link.target);
    //});

    //// Extract the array of nodes from the map by name.
    //var nodes = d3.values(nodesByName);

    //var graph = { "nodes": nodes, "links": links };


    //var link = svg.append("g")
    //   .attr("class", "links")
    //   .selectAll("line")
    //   .data(graph.links)
    //   .enter().append("line")
    //      .attr("stroke-width", 2);;   //function (d) { return Math.sqrt(d.value); }

    //var node = svg.append("g")
    //    .attr("class", "nodes")
    //    .selectAll("circle")
    //    .data(graph.nodes)
    //    .enter().append("circle")
    //    .attr("class", "node")
    //    .style("fill", "#2166ac")
    //    .attr("r", radius)
    //    .call(d3.drag()
    //        .on("start", dragstarted)
    //        .on("drag", dragged)
    //        .on("end", dragended));

    //text = svg.append("g").selectAll("text")
    //    .data(graph.nodes)
    //    .enter().append("text")
    //  .text("S")         //function(d) { return d.id; }
    //  .attr("x", 8)
    //  .attr("y", ".31em");


    //simulation
    //    .nodes(graph.nodes)
    //    .on("tick", ticked);

    //simulation.force("link")
    //    .links(graph.links);


    //function ticked() {
    //    link
    //        .attr("x1", function (d) { return d.source.x; })
    //        .attr("y1", function (d) { return d.source.y; })
    //        .attr("x2", function (d) { return d.target.x; })
    //        .attr("y2", function (d) { return d.target.y; });
    //    node
    //        .attr("cx", function (d) { return d.x; })
    //        .attr("cy", function (d) { return d.y; });
    //}

    //function dragstarted(d) {
    //    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    //    d.fx = d.x;
    //    d.fy = d.y;
    //}

    //function dragged(d) {
    //    d.fx = d3.event.x;
    //    d.fy = d3.event.y;
    //}

    //function dragended(d) {
    //    if (!d3.event.active) simulation.alphaTarget(0);
    //    d.fx = null;
    //    d.fy = null;
    //}
}

//====================== Statistical ====================
function d3mv_hist_dist(args) {

    var chart = args.chart;
    var array = args.values;
   // var x_ds = args.x_ds;
  //  var y_ds = args.y_ds;
    var width = args.width || 500;
    var height = args.height || width / 1.618;
    var margin = args.margin || { top: 20, right: 20, bottom: 30, left: 50 };
    var color = args.color || "#1f78b4";

    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    // source: https://bl.ocks.org/mbostock/4341954


    var x = d3.scaleLinear()
    .rangeRound([0, width]);

    var x_min = d3.extent(array)[0] * 0.8;
    var x_max = d3.extent(array)[1] * 1.2;
        
    if (x_max - x_min > 4) {
        x_min = Math.floor(x_min);
        x_max = Math.floor(x_max);
    }
    else {
        x_min = Math.floor(x_min*10)/10;
        x_max = Math.floor(x_max*10)/10 ;
    }

    x.domain([x_min, x_max]);


   // console.log(x.domain);
   // x.domain([-3.2,3.4]);


    var bins = d3.histogram()
             .domain(x.domain())
             .thresholds(x.ticks(30))
             (array);

    //console.log(bins);    

   // console.log(bins[10].length);
   // var sss = [];
   // bins.forEach(function (d, i) {
   //     sss.push({ "id": i, "count": bins[i].length });
   // });
   //// console.log(sss);

    var y1 = d3.scaleLinear()
        .domain([0, d3.max(bins, function (d) { return d.length; })])
        .range([height, 0]);

    var svg = d3.select("#" + chart).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var gX = svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));


    var g = svg.append("g"); //.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    var bar = g.selectAll(".bar")
      .data(bins)
      .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function (d) { return "translate(" + x(d.x0) + "," + y1(d.length) + ")"; });

    bar.append("rect")
        .attr("x", 1)
        .attr("width", x(bins[0].x1) - x(bins[0].x0) - 2)
        //.attr("width", function (d) {
        //    return x(d.dx + d.x) - x(d.x)
        //})
        .attr("height", function (d) { return height - y1(d.length); });

    var line = d3.line()
    .x(function (d) { return x(d[0]); })
    .y(function (d) { return y(d[1]); });

    // Density
    var kde = kernelDensityEstimator(epanechnikovKernel(0.2), x.ticks(100));

    var kde_data = kde(array);

    //console.table(kde_data);
    var y = d3.scaleLinear()
              .domain([0, d3.max(kde_data, function (d) { return d[1]; })])
              .range([height, 0]);

    var gY = svg.append("g")
    .attr("class", "y axis")
    .call(d3.axisLeft(y));

    //console.log(kde_data);

    svg.append("path")
    .datum(kde_data)
    .attr("class", "line")
    .attr("d", line);


    function kernelDensityEstimator(kernel, x) {
        return function(sample) {
            return x.map(function(x) {
                return [x, d3.mean(sample, function(v) { return kernel(x - v); })];
            });
        };
    }

    function epanechnikovKernel(scale) {
        return function(u) {
            return Math.abs(u /= scale) <= 1 ? .75 * (1 - u * u) / scale : 0;
        };
    }
    //console.log(epanechnikovKernel(1));
}



function create_spc_plot(args) {

    var chart = args.chart;
    var data = args.data;
    var x_ds = args.x_ds;
    var y_ds = args.y_ds;
    var width = args.width || 500;
    var height = args.height || width / 1.618;
    var margin = args.margin || { top: 20, right: 20, bottom: 30, left: 50 };
    var cl = args.cl || null;          
    var sd = args.sd || null;
    var bg = args.bg || 'na';
    var robust = args.robust || false;
    var trimmed = args.trimmed || null;
    
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    data.forEach(function (d) {                             //Todo - configurable date field
        Object.keys(data[0]).filter(function (k) { return k != "Date" }).forEach(function (k) {
            d[k] = +d[k];
        });
    });

    // Calculating cl 
    if (cl === null) {
                        if (robust)  { cl = d3.median(data, function (d) { return d[y_ds]; }); }  
                        else         { cl = d3.mean(data, function (d) { return d[y_ds]; });   }
                      }
       
    // Calculating sd 
    if (sd === null) {
                        if (robust) { sd = mad(ds_col_to_array(data, y_ds)); }
                        else { sd = d3.deviation(data, function (d) { return d[y_ds]; });}
                     }

    // Calculating sd 
    if (trimmed != null) {
                            var trimmed_array = [];
                            for (var i = 0; i < data.length; i++) {
                                trimmed_array.push(+data[i][y_ds]);
                            }
                            trimmed_array = trimmed_array.sort(d3.ascending);
                            trimmed_array = trimmed_array.slice(Math.floor(trimmed_array.length * (1 - trimmed) / 2), Math.floor(trimmed_array.length - trimmed_array.length * (1 - trimmed) / 2));
                            cl = d3.mean(trimmed_array);
                            sd = d3.deviation(trimmed_array);  //Todo !!!!!!!!!!!!!  control limits as parameter
                         }

    //if (sd == 0)
    //   { data = data.filter(function (d) { return d[y_ds] > cl*0.9 && d[y_ds] < cl*1.1; }); }
    //else
    //   { data = data.filter(function (d) { return d[y_ds] > cl - 10 * sd && d[y_ds] < cl + 10 * sd; }); }
   
    var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);
    var colors = ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837']
    var color = d3.scaleOrdinal().range(colors);

    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);


    //var xAxis = d3.svg.axis()
    //    .scale(x)
    //    .orient("bottom").ticks(20);

    //var yAxis = d3.svg.axis()
    //    .scale(y)
    //    .orient("left")

    var svg = d3.select("#" + chart).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    //.call(d3.behavior.zoom().on("zoom", function () {
    //    svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
    //}))
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function (d) { return d[x_ds]; })).nice();
    y.domain([d3.min([d3.min(data, function (d) { return d[y_ds]; }), cl - 4.5 * sd]), d3.max([d3.max(data, function (d) { return d[y_ds]; }), cl + 4.5 * sd])]).nice();

  //  console.log("min y");

    //console.log("min");
    //console.log(d3.min([d3.min(data, function (d) { return d[y_ds]; }), cl - 3.5 * sd]));
    //console.log(cl - 3.5 * sd);
    //console.log(cl);
    //console.log(sd);
    //console.log("max");
    //console.log(d3.max([d3.max(data, function (d) { return d[y_ds]; }), cl + 3.5 * sd]));
    //console.log(cl + 3.5 * sd);

    //function precise_round(num, decimals) {
    //    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
    //}

   // console.log("CL - " + precise_round(cl, 2) + " UCL - " + precise_round(cl + 3.5 * sd, 2) + " LCL - " + precise_round(cl - 3.5 * sd, 2));


  //  svg.append("g")
  //  .attr("class", "x axis")
  ////  .attr('id', "Sum Square")
  //  .attr("transform", "translate(0," + height + ")")
  //  .call(xAxis);

  //  svg.append("g")
  //      .attr("class", "y axis")
  // //     .attr('id', "Sum")
  //      .call(yAxis);

    var gX = svg.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
      //  .ticks(d3.time.minutes, 15)
      //.tickFormat(d3.time.format("%H:%M"))
        .call(d3.axisBottom(x));

    var gY = svg.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y));
      //.append("text")
      //  .attr("class", "axis-title")
      //  .attr("transform", "rotate(-90)")
      //  .attr("y", 6)
      //  .attr("dy", ".71em")
      //  .style("text-anchor", "end")
      //  .text("Temp (C)");
    
    if (bg == 'bg1') {

        // Defining zone ranges
        var l3 = cl - 3.5 * sd;
        var l2 = cl - 2 * sd;
        var l1 = cl - sd;
        var c = cl;
        var u3 = cl + 3.5 * sd;
        var u2 = cl + 2 * sd;
        var u1 = cl + sd;
        //zones.push({ id: "l2", y1: cl - 2 * sd, y2: cl - 1 * sd });
        //zones.push({ id: "l1", y1: cl - 1 * sd, y2: cl });
        //zones.push({ id: "u1", y1: cl, y2: cl + sd });
        //zones.push({ id: "u2", y1: cl + sd, y2: cl + 2 * sd });
        //zones.push({ id: "u3", y1: cl + 2 * sd, y2: cl + 3 * sd });
        //zones.push({ id: "u4", y1: cl + 3 * sd, y2: cl + 4 * sd });

        spc_height = y(l2) - y(l1);
        spc_width = x(d3.max(data, function (d) { return d[x_ds]; }));

        //Adding zones
        //l3
        {
        svg.append("rect")
           .attr("x", x(0))
           .attr("y", y(l2))
           .attr("width", spc_width)
           .attr("height", spc_height)
           .style("opacity", 1.0)
           .style("fill", "#F7CFCF"); // #E7D4BD

        //l2
        svg.append("rect")
           .attr("x", x(0))
           .attr("y", y(l1))
           .attr("width", spc_width)
           .attr("height", spc_height)
           .style("opacity", 1.0)
           .style("fill", "#F5F3C7");  //#D3DFB7 

        //l1
        svg.append("rect")
           .attr("x", x(0))
           .attr("y", y(c))
           .attr("width", spc_width)
           .attr("height", spc_height)
           .style("opacity", 1.0)
           .style("fill", "#DBE6C3");

        //u3
        svg.append("rect")
           .attr("x", x(0))
           .attr("y", y(u3))
           .attr("width", spc_width)
           .attr("height", spc_height)
           .style("opacity", 1.0)
           .style("fill", "#F7CFCF"); //#E7D4BD

        //u2
        svg.append("rect")
           .attr("x", x(0))
           .attr("y", y(u2))
           .attr("width", spc_width)
           .attr("height", spc_height)
           .style("opacity", 1.0)
           .style("fill", "#F5F3C7"); //#D3DFB7

        //u1
        svg.append("rect")
           .attr("x", x(0))
           .attr("y", y(u1))
           .attr("width", spc_width)
           .attr("height", spc_height)
           .style("opacity", 1.0)
           .style("fill", "#DBE6C3"); //#BACBA4
        }
    }

    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function (d) { return x(d[x_ds]); })
        .attr("cy", function (d) { return y(d[y_ds]); })
        .attr("opacity", 0.8)
        .style("fill", function (d) {
            if ((d[y_ds] < cl - 3.2 * sd) || (d[y_ds] > cl + 3 * sd))
            { return colors[2]; }   //
            else
            { return "black"; }  //colors[7]
        })
    .on("mouseover", function (d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", .9);

        tooltip.html("x: " + d[x_ds] + "<br/>y: " + d[y_ds])
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
    .on("mouseout", function (d) {
        tooltip.transition()
               .duration(500)
               .style("opacity", 0);
    })
    .on("click", function (d) {
    });

    //Add center line
    var ss = svg.append("line")
     .attr("x1", x(d3.min(data, function (d) { return d[x_ds]; })))
     .attr("y1", y(cl))
     .attr("x2", x(d3.max(data, function (d) { return d[x_ds]; })))
     .attr("y2", y(cl))
      .attr("stroke-width", 2)
  .attr("stroke", "gray");

    //Add UCL
    var ss = svg.append("line")
     .attr("x1", x(d3.min(data, function (d) { return d[x_ds]; })))
     .attr("y1", y(cl + 3* sd))
     .attr("x2", x(d3.max(data, function (d) { return d[x_ds]; })))
     .attr("y2", y(cl + 3 * sd))
      .attr("stroke-width", 2)
  .attr("stroke", "gray");

    //Add LCL
    var ss = svg.append("line")
     .attr("x1", x(d3.min(data, function (d) { return d[x_ds]; })))
     .attr("y1", y(cl - 3 * sd))
     .attr("x2", x(d3.max(data, function (d) { return d[x_ds]; })))
     .attr("y2", y(cl - 3 * sd))
      .attr("stroke-width", 2)
  .attr("stroke", "gray");




}

//==========================================================================
function cl(cl_object, note) {
    console.log(note);
    console.log(cl_object);
}