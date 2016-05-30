function ds_col_to_array(ds, col) {
    var col_arr = [];

    for (var i = 0; i < ds.length; i++) {
        col_arr.push(+ds[i][col]);
    }

    return col_arr;
}

function arrays_diff(array1, array2) {
    var arrays_diff = [];

    console.log(array1);

    for (var i = 0; i < array1.length; i++) {
        arrays_diff.push(array1[i] - array2[i]);
    }

    return arrays_diff;
}

function arrays_distance(array1, array2) {
    var arrays_dist = 0;



    for (var i = 0; i < array1.length; i++) {
        arrays_dist += (array1[i] - array2[i]) * (array1[i] - array2[i]);
    }
    // console.log(arrays_dist);
    return Math.sqrt(arrays_dist).toFixed(1);
}


function create_spc_plot(chart, data, x_ds, y_ds, width, height, cl, sd) {
    //cl: Center Line. Should be Mean or Median
    //sd: Standard deviation

    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    //tooltip
    var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);
    //colorbrewer2 10-class RdYlGn
    var colors = ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837']
    var color = d3.scale.ordinal()
        .range(colors);

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom").ticks(20);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")

    var svg = d3.select("#" + chart).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .call(d3.behavior.zoom().on("zoom", function () {
        svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
    }))
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function (d) { return d[x_ds]; })).nice();
    y.domain([d3.min(data, function (d) { return d[y_ds]; }), d3.max(data, function (d) { return d[y_ds]; })]).nice();

    // console.log(d3.median(data, function (d) { return d[y_ds]; }));

    svg.append("g")
    .attr("class", "x axis")
    .attr('id', "Sum Square")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr('id', "Sum")
        .call(yAxis);

    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function (d) { return x(d[x_ds]); })
        .attr("cy", function (d) { return y(d[y_ds]); })
        .attr("opacity", 0.5)
        .style("fill", function (d) {
            if ((d[y_ds] < cl - 3 * sd) || (d[y_ds] > cl + 3 * sd))
            { return colors[2]; }
            else
            { return colors[7]; }
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
     .attr("y1", y(cl + 3 * sd))
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


function Simple_bar_chart(chart, data, x_ds, y_ds, width, height) {

    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "%");

    var svg = d3.select("#" + chart).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function (d) { return d[x_ds]; }));
    y.domain([0, d3.max(data, function (d) { return d[y_ds]; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d[x_ds]); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) { return y(d[y_ds]); })
        .attr("height", function (d) { return height - y(d[y_ds]); });
}

function Simple_bar_weekly_chart(chart, data, x_ds, y_ds, width, height) {

    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .tickValues([24, 48, 72, 96, 120, 144, 168]);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10, "%");

    //tooltip
    var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

    var svg = d3.select("#" + chart).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function (d) { return d[x_ds]; }));
    y.domain([d3.min(data, function (d) { return d[y_ds]; }), d3.max(data, function (d) { return d[y_ds]; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Loadings");

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d[x_ds]); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) {
            if (d[y_ds] > 0)
            { return y(d[y_ds]); }
            else
            { return y(0); }
        })
        .attr("height", function (d) {
            if (d[y_ds] > 0)
            { return y(0) - y(d[y_ds]); }
            else
            { return y(d[y_ds]) - y(0); }

        })
    .on("mouseover", function (d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", .9);
        tooltip.html("Value: " + Math.round(d[y_ds] * 100, 1) + "<br/>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
        .on("mouseout", function (d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });


}

function Simple_bar_chart1(chart, data, x_ds, y_ds, width, height) {

    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    var colorRange = ['#d73027', '#fee090', '#e0e0e0','#abd9e9', '#4575b4'];
    var color = d3.scale.linear().range(colorRange).domain([-1,-0.35, 0, 0.35, 1]);

    var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    //.tickValues([24, 48, 72, 96, 120, 144, 168]);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");
      //  .ticks(10, "%");

    //tooltip
    var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

    var svg = d3.select("#" + chart).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(data.map(function (d) { return d[x_ds]; }));
    y.domain([d3.min(data, function (d) { return d[y_ds]; }), d3.max(data, function (d) { return d[y_ds]; })]);
   
    //svg.append("g")
    //    .attr("class", "x axis")
    //    .attr("transform", "translate(0," + height + ")")
    //    .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Loadings");

    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        //  .attr("class", "bar")
                        .style('fill', function (d, i) {
                            return color(d[y_ds]);
                        })
      
                //.style("fill", function (d) {
                //    return color(d[y]);
                //})
        .attr("x", function (d) { return x(d[x_ds]); })
        .attr("width", x.rangeBand())
        .attr("y", function (d) {
            if (d[y_ds] > 0)
            { return y(d[y_ds]); }
            else
            { return y(0); }
        })  
        .attr("height", function (d) {
            if (d[y_ds] > 0)
            { return y(0) - y(d[y_ds]); }
            else
            { return y(d[y_ds]) - y(0); }
        })

    .on("mouseover", function (d) {
        tooltip.transition()
            .duration(500)
            .style("opacity", .9);
        tooltip.html("Value: " + Math.round(d[y_ds] * 100, 1) + "<br/>")
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
    })
        .on("mouseout", function (d) {
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });


}

function d3mv_MultiLine_chart(args) {

    var chart = args.chart;
    var data = args.data;
    var x_ds = args.x_ds;
    var width = args.width || 500;
    var height = args.height || width / 1.618;
    var dots = args.add_dots || false;
    var y_axis_lbl = args.y_axis_lbl || "";


    var margin = { top: 20, right: 20, bottom: 70, left: 50 };
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    // var parseDate = d3.time.format("%Y%m%d").parse;
    //  var parseDate = d3.time.format("%Y-%m-%d hh:mm:ss").parse;

    //var x = d3.time.scale()
    //.range([0, width]);

   // console.log(data);

    var x = d3.scale.linear()//d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .innerTickSize(-height)
        .outerTickSize(0)
        .tickValues([24, 48, 72, 96, 120, 144, 168])
        .tickPadding(10);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
         .innerTickSize(-width)
        .outerTickSize(0)
        .tickPadding(10);


    var line = d3.svg.line()
        .interpolate("basis")
        .x(function (d) { return x(d[x_ds]); })
        .y(function (d) { return y(d.key); });

    var svg = d3.select("#" + chart).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)

      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    color.domain(d3.keys(data[0]).filter(function (key) { return key !== x_ds; }));

    //data.forEach(function(d) {
    //    d.date = parseDate(d.date);
    //});

    var lines = color.domain().map(function (name, i) {
        return {
            name: name,
            id: i +1,
            values: data.map(function (d) {
                return { id: d[x_ds], key: +d[name] };
            })
        };
    });
  // console.log(lines.length);

    x.domain(d3.extent(data, function (d) { return d.id; }));

    y.domain([
      d3.min(lines, function (c) { return d3.min(c.values, function (v) { return v.key; }); }),
      d3.max(lines, function (c) { return d3.max(c.values, function (v) { return v.key; }); })
    ]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    if (y_axis_lbl != "") {
        svg.append("text")
           .attr("transform", "rotate(-90)")
           .attr("y", 6)
           .attr("dy", ".71em")
           .style("text-anchor", "end")
           .text("y axis");
    }

  

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
     //   .attr("dy", ".35em")
        .text(function (d) { return d.name; });


}


function Line_chart_time_ID(chart, data, x_ds, y_ds, width, height) {

    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

  
  //  var parseDate = d3.time.format("%Y-%m-%d hh:mm:ss").parse;
   
    var x = d3.scale.linear()//d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
       .tickValues([24, 48, 72, 96, 120, 144, 168]);;

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
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
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   // console.log(data[y_ds]);

    x.domain(d3.extent(data, function (d) { return d[x_ds]; }));
    y.domain(d3.extent(data, function (d) { return d[y_ds]; }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line);


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




    function create_Line_chart_2_vars(args) {


        
        var chart = args.chart;
        var data = args.data;
        var x_ds = args.x_ds;
        var y1_ds = args.y1_ds;
        var y2_ds = args.y2_ds;
        var width = args.width || 500;
        var height = args.height || width / 1.618;
        var dots = args.add_dots || false;


        var margin = { top: 20, right: 20, bottom: 30, left: 50 };
        width = width - margin.left - margin.right,
        height = height - margin.top - margin.bottom;
        
    //   var parseDate = d3.time.format("%Y").parse;

    var x = d3.scale.linear().range([0, width]);

    var y1 = d3.scale.linear().range([height, 0]);
    var y2 = d3.scale.linear().range([height, 0]);

    function make_x_axis() {
        return d3.svg.axis()
            .scale(x)
             .orient("bottom")
        //.ticks(7)
        .tickValues([24, 48, 72, 96, 120, 144, 168]);
    }

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickValues([24, 48, 72, 96, 120, 144, 168]);

    var yAxis = d3.svg.axis()
        .scale(y2)
        .orient("left");


    var line1 = d3.svg.line()
        .x(function (d) { return x(d[x_ds]); })
        .y(function (d) { return y1(d[y1_ds]); })

    var line2 = d3.svg.line()
        .x(function (d) { return x(d[x_ds]); })
        .y(function (d) { return y2(d[y2_ds]); })

    var svg = d3.select("#" + chart).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function (d) { return d[x_ds]; }));
    //   y1.domain(d3.extent(data, function (d) { return d[y1_ds]; }));
    //  y2.domain(d3.extent(data, function (d) { return d[y2_ds]; }));

    y1.domain([d3.min([d3.min(data, function (d) { return d[y1_ds]; }), d3.min(data, function (d) { return d[y2_ds]; })]), d3.max([d3.max(data, function (d) { return d[y1_ds]; }), d3.max(data, function (d) { return d[y2_ds]; })])]);
    y2.domain([d3.min([d3.min(data, function (d) { return d[y1_ds]; }), d3.min(data, function (d) { return d[y2_ds]; })]), d3.max([d3.max(data, function (d) { return d[y1_ds]; }), d3.max(data, function (d) { return d[y2_ds]; })])]);

    svg.append("path")        // Add line1 path.
    .attr("class", "line")
    .attr("d", line1(data));

    svg.append("path")        // Add line2 path.
        .attr("class", "line")
        .style("stroke", "red")
        .attr("d", line2(data));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);


    // for reach data point select all the residual lines
    residual_lines = svg.selectAll(".residual-line");


    // bind the data array
    residual_lines_bound = residual_lines
      .data(data);


    residual_lines__enter = residual_lines_bound
 .enter().append("line")
   .attr("transform", "translate(0, -50)")
           .attr("x1", function (d) { return x(d[x_ds]) })
            .attr("y1", function (d) { return y1(d[y1_ds]) + 50 })
            .attr("x2", function (d) { return x(d[x_ds]) })
            .attr("y2", function (d) { return y2(d[y2_ds]) + 50 })
    .transition()
     .duration(1000)
     .ease("linear")
 .attr("stroke-width", 2)
 .attr("stroke", "gray")
 .attr("class", "residual-line");


    svg.append("g")
            .attr("class", "grid")
            .attr("transform", "translate(0," + height + ")")
            .call(make_x_axis()
                .tickSize(-height, 0, 0)
                .tickFormat("")
            )

    //svg.append("g")
    //    .attr("class", "grid")
    //    .call(make_y_axis()
    //        .tickSize(-width, 0, 0)
    //        .tickFormat("")
    //    )

}




function create_Linr_chart_2_vars_bak(chart, data, x_ds, y1_ds, y2_ds) {

    var margin = { top: 20, right: 20, bottom: 30, left: 50 },
        width = 650 - margin.left - margin.right,
        height = 260 - margin.top - margin.bottom;


    //   var parseDate = d3.time.format("%Y").parse;

    var x = d3.scale.linear().range([0, width]);

    var y1 = d3.scale.linear().range([height, 0]);
    var y2 = d3.scale.linear().range([height, 0]);

    function make_x_axis() {
        return d3.svg.axis()
            .scale(x)
             .orient("bottom")
        //.ticks(7)
        .tickValues([24, 48, 72, 96, 120, 144, 168]);
    }


    //function make_y_axis() {
    //    return d3.svg.axis()
    //        .scale(y)
    //        .orient("left")
    //        .ticks(5)
    //}




    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickValues([24, 48, 72, 96, 120, 144, 168]);

    var yAxis = d3.svg.axis()
        .scale(y2)
        .orient("left");


    var line1 = d3.svg.line()
        .x(function (d) { return x(d[x_ds]); })
        .y(function (d) { return y1(d[y1_ds]); })

    var line2 = d3.svg.line()
        .x(function (d) { return x(d[x_ds]); })
        .y(function (d) { return y2(d[y2_ds]); })

    var svg = d3.select("#" + chart).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function (d) { return d[x_ds]; }));
    //   y1.domain(d3.extent(data, function (d) { return d[y1_ds]; }));
    //  y2.domain(d3.extent(data, function (d) { return d[y2_ds]; }));

    y1.domain([d3.min([d3.min(data, function (d) { return d[y1_ds]; }), d3.min(data, function (d) { return d[y2_ds]; })]), d3.max([d3.max(data, function (d) { return d[y1_ds]; }), d3.max(data, function (d) { return d[y2_ds]; })])]);
    y2.domain([d3.min([d3.min(data, function (d) { return d[y1_ds]; }), d3.min(data, function (d) { return d[y2_ds]; })]), d3.max([d3.max(data, function (d) { return d[y1_ds]; }), d3.max(data, function (d) { return d[y2_ds]; })])]);
    //   y2.domain([d3.min(data, function (d) { return d[y1_ds]; }), d3.max(data, function (d) { return d[y2_ds]; })]);

    //    console.log(d3.min([d3.min(data, function (d) { return d[y1_ds]; }), d3.min(data, function (d) { return d[y2_ds]; })]));



    // console.log(d3.max(data, function (d) { return d[y1_ds]; }));
    // console.log(d3.max(data, function (d) { return d[y2_ds]; }));
    // console.log("max");
    // console.log(d3.max([d3.max(data, function (d) { return d[y1_ds]; }), d3.max(data, function (d) { return d[y2_ds]; })]));

    svg.append("path")        // Add line1 path.
    .attr("class", "line")
    .attr("d", line1(data));

    svg.append("path")        // Add line2 path.
        .attr("class", "line")
        .style("stroke", "red")
        .attr("d", line2(data));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);



    // Working!!!!!!!!!!!!!

    // svg.selectAll(".dot")
    //  .data(data)
    //.enter().append("circle")
    //  .attr("class", "dot")
    //  .attr("r", 3)
    // // .attr("cx", function (d) { function (d, i) { return i * (width/24.5) + 24 })}; })
    //  .attr("cx", function (d) { return x(d[x_ds])  })
    //  .attr("cy", function (d) { return y1(d[y1_ds]); })
    //  .style("fill", function (d) { return "#fdae61"; });  //colorPicker(d.zone_id);


    // for reach data point select all the residual lines
    residual_lines = svg.selectAll(".residual-line");


    // bind the data array
    residual_lines_bound = residual_lines
      .data(data);


    residual_lines__enter = residual_lines_bound
 .enter().append("line")
   .attr("transform", "translate(0, -50)")
           .attr("x1", function (d) { return x(d[x_ds]) })
            .attr("y1", function (d) { return y1(d[y1_ds]) + 50 })
            .attr("x2", function (d) { return x(d[x_ds]) })
            .attr("y2", function (d) { return y2(d[y2_ds]) + 50 })
    .transition()
     .duration(1000)
     .ease("linear")
 .attr("stroke-width", 2)
 .attr("stroke", "gray")
 .attr("class", "residual-line");


    svg.append("g")
            .attr("class", "grid")
            .attr("transform", "translate(0," + height + ")")
            .call(make_x_axis()
                .tickSize(-height, 0, 0)
                .tickFormat("")
            )

    //svg.append("g")
    //    .attr("class", "grid")
    //    .call(make_y_axis()
    //        .tickSize(-width, 0, 0)
    //        .tickFormat("")
    //    )

}

function create_Linr_chart_2_vars_eol(chart, data, x_ds, y1_ds, y2_ds, width, height) {

    var margin = { top: 20, right: 20, bottom: 30, left: 50 },
        width = width - margin.left - margin.right,
        height = height - margin.top - margin.bottom;


    //   var parseDate = d3.time.format("%Y").parse;

    var x = d3.scale.linear().range([0, width]);

    var y1 = d3.scale.linear().range([height, 0]);
    var y2 = d3.scale.linear().range([height, 0]);

    function make_x_axis() {
        return d3.svg.axis()
            .scale(x)
             .orient("bottom")
        //.ticks(7)
        .tickValues([24, 48, 72, 96, 120, 144, 168]);
    }

  

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickValues([24, 48, 72, 96, 120, 144, 168]);;

    var yAxis = d3.svg.axis()
        .scale(y2)
        .orient("left");


    var line1 = d3.svg.line()
        .x(function (d) { return x(d[x_ds]); })
        .y(function (d) { return y1(d[y1_ds]); })

    var line2 = d3.svg.line()
        .x(function (d) { return x(d[x_ds]); })
        .y(function (d) { return y2(0); })

    var svg = d3.select("#" + chart).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function (d) { return d[x_ds]; }));

    y1.domain([d3.min([d3.min(data, function (d) { return d[y1_ds]; }), d3.min(data, function (d) { return d[y2_ds]; })]), d3.max([d3.max(data, function (d) { return d[y1_ds]; }), d3.max(data, function (d) { return d[y2_ds]; })])]);
    y2.domain([d3.min([d3.min(data, function (d) { return d[y1_ds]; }), d3.min(data, function (d) { return d[y2_ds]; })]), d3.max([d3.max(data, function (d) { return d[y1_ds]; }), d3.max(data, function (d) { return d[y2_ds]; })])]);

    svg.append("path")        // Add line1 path.
    .attr("class", "line")
    .attr("d", line1(data));

    svg.append("path")        // Add line2 path.
        .attr("class", "line")
        .style("stroke", "gray")
        .attr("d", line2(data));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // for reach data point select all the residual lines
    residual_lines = svg.selectAll(".residual-line");

 //   // bind the data array
 //   residual_lines_bound = residual_lines
 //     .data(data);

 //   residual_lines__enter = residual_lines_bound
 //.enter().append("line")
 //  .attr("transform", "translate(0, -50)")
 //          .attr("x1", function (d) { return x(d[x_ds]) })
 //           .attr("y1", function (d) { return y1(d[y1_ds]) + 50 })
 //           .attr("x2", function (d) { return x(d[x_ds]) })
 //           .attr("y2", function (d) { return y2(d[y2_ds]) + 50 })
 //   .transition()
 //    .duration(1000)
 //    .ease("linear")
 //.attr("stroke-width", 2)
 //.attr("stroke", "gray")
 //.attr("class", "residual-line");


    // Draw the x Grid lines
    svg.append("g")
            .attr("class", "grid")
            .attr("transform", "translate(0," + height + ")")
            .call(make_x_axis()
                .tickSize(-height, 0, 0)
                .tickFormat("")
            )
}


function create_scatter_plot(chart, data, x_ds, y_ds, width, height) {

    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    //tooltip
    var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

    var colors = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c', '#fb9a99', '#e31a1c', '#fdbf6f', '#ff7f00', '#cab2d6', '#6a3d9a']
    var color = d3.scale.ordinal()
        .range(colors);

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom").ticks(20);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")

    var svg = d3.select("#" + chart).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .call(d3.behavior.zoom().on("zoom", function () {
        svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
    }))
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function (d) { return d[x_ds]; })).nice();
    y.domain([d3.min(data, function (d) { return d[y_ds]; }), d3.max(data, function (d) { return d[y_ds]; })]).nice();

    svg.append("g")
    .attr("class", "x axis")
    .attr('id', "Sum Square")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr('id', "Sum")
        .call(yAxis);

    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function (d) { return x(d[x_ds]); })
        .attr("cy", function (d) { return y(d[y_ds]); })
        .attr("opacity", 0.5)
        .style("fill", function (d) { return colors[1]; })
    .on("mouseover", function (d) {
    //    d3.select("#sensor_id").html(d[x_ds]);
    //    $("#sensor_id").val("sensor_id").trigger('change');
    })
    .on("mouseout", function (d) {
    })
    .on("click", function (d) {
    });

}

function create_spc_plot(chart, data, x_ds, y_ds, width, height, cl, sd) {
    //cl: Center Line. Should be Mean or Median
    //sd: Standard deviation

    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;

    //tooltip
    var tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);
    //colorbrewer2 10-class RdYlGn
    var colors = ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837']
    var color = d3.scale.ordinal()
        .range(colors);

    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom").ticks(20);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")

    var svg = d3.select("#" + chart).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .call(d3.behavior.zoom().on("zoom", function () {
        svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
    }))
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    x.domain(d3.extent(data, function (d) { return d[x_ds]; })).nice();
    y.domain([d3.min(data, function (d) { return d[y_ds]; }), d3.max(data, function (d) { return d[y_ds]; })]).nice();

   // console.log(d3.median(data, function (d) { return d[y_ds]; }));

    svg.append("g")
    .attr("class", "x axis")
    .attr('id', "Sum Square")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr('id', "Sum")
        .call(yAxis);

    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function (d) { return x(d[x_ds]); })
        .attr("cy", function (d) { return y(d[y_ds]); })
        .attr("opacity", 0.5)
        .style("fill", function (d) {
            if ((d[y_ds] < cl - 3 * sd) || (d[y_ds] > cl + 3 * sd))
               {return colors[2];}
            else
               { return colors[7]; }
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
     .attr("y1", y(cl+3*sd))
     .attr("x2", x(d3.max(data, function (d) { return d[x_ds]; })))
     .attr("y2", y(cl + 3*sd))
      .attr("stroke-width", 2)
  .attr("stroke", "gray");

//Add LCL
    var ss = svg.append("line")
     .attr("x1", x(d3.min(data, function (d) { return d[x_ds]; })))
     .attr("y1", y(cl - 3*sd))
     .attr("x2", x(d3.max(data, function (d) { return d[x_ds]; })))
     .attr("y2", y(cl - 3*sd))
      .attr("stroke-width", 2)
  .attr("stroke", "gray");

}




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
