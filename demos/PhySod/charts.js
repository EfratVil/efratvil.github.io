//for coloring acoording to grade_auto col
// used in outlier_matrix page
function d3mv_scatter_plot2(args) {

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

    if (typeof (color) == "object") {
        var color_picker = d3.scaleLinear()
                  .domain([0, 1])
                  .range(color.range)
                  .interpolate(d3.interpolateHcl);
    }


    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function (d) { return x(d[x_ds]); })
        .attr("cy", function (d) { return y(d[y_ds]); })
        .attr("fill-opacity", 0.3)
.style("fill", function (d) {
    if (color == "grade_auto") {
        if (d.grade_auto == "Good") { return "#1a9850" } else {
            if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" }
        }
    }

})
.style("stroke-width", 1.5)
        .style("stroke-opacity", 0.7)
.style("stroke", function (d) {
    if (color == "grade_auto") {
        if (d.grade_auto == "Good") { return "#1a9850" } else {
            if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" }
        }
    }
})
         .on("mouseover", function (d) {
             //d3.selectAll(".focus_circle").transition()
             //       .duration(150).remove();
             //svg.append("circle")
             //       .attr("class", "focus_circle")
             //       .attr("cx", x(d[x_ds]))
             //       .attr("cy", y(d[y_ds]))
             //       .attr("r", 6)
             //       .style("opacity", 1.0)
             //       .style("fill", "blue");

             d3.select("#sensor_id").html(d["id"]);
             focus_id = d3.select("#sensor_id").html();


             //Change #o1_svg
             var svg1 = d3.select("#o1_svg");

             svg1.selectAll('circle')
             .transition()
             .duration(750)
             .ease(d3.easeLinear)
             .style("fill", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })
             .style("stroke", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })
             .attr("r", function (d) {
                 if (d.id == focus_id) {
                     return "7"
                 } else {
                     return "4"
                 };
             })
             .attr("opacity", function (d) {
                 if (d.id == focus_id) {
                     return "1"
                 } else {
                     return "0.5"
                 };
             })
             //.style("z-index", function (d) {
             //    if (d.id == focus_id) {
             //        return "1000"
             //    }
             //})

             //Change #o2_svg
             svg1 = d3.select("#o2_svg");

             svg1.selectAll('circle')
             .transition()
             .duration(750)
             .ease(d3.easeLinear)
             .style("fill", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })
             .style("stroke", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })
             .attr("r", function (d) {
                 if (d.id == focus_id) {
                     return "7"
                 } else {
                     return "4"
                 };
             })
             .attr("opacity", function (d) {
                 if (d.id == focus_id) {
                     return "1"
                 } else {
                     return "0.3"
                 };
             })
           .style("z-index", function (d) {
               if (d.id == focus_id) {
                   return "1000"
               }
           })



             //Change #o3_svg
             svg1 = d3.select("#o3_svg");

             svg1.selectAll('circle')
             .transition()
             .duration(750)
             .ease(d3.easeLinear)
             .style("fill", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })
             .style("stroke", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })

             .attr("r", function (d) {
                 if (d.id == focus_id) {
                     return "7"
                 } else {
                     return "4"
                 };
             })
             .attr("opacity", function (d) {
                 if (d.id == focus_id) {
                     return "1"
                 } else {
                     return "0.3"
                 };
             })
           .style("z-index", function (d) {
               if (d.id == focus_id) {
                   return "1000"
               }
           })


             //Change #o4_svg
             svg1 = d3.select("#o4_svg");

             svg1.selectAll('circle')
             .transition()
             .duration(750)
             .ease(d3.easeLinear)
             .style("fill", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })
             .style("stroke", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })

             .attr("r", function (d) {
                 if (d.id == focus_id) {
                     return "7"
                 } else {
                     return "4"
                 };
             })
             .attr("opacity", function (d) {
                 if (d.id == focus_id) {
                     return "1"
                 } else {
                     return "0.3"
                 };
             })
           .style("z-index", function (d) {
               if (d.id == focus_id) {
                   return "1000"
               }
           })



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

//for physod demo
function d3mv_scatter_plot3(args) {

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

    if (typeof (color) == "object") {
        var color_picker = d3.scaleLinear()
                  .domain([0, 1])
                  .range(color.range)
                  .interpolate(d3.interpolateHcl);
    }


    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 5)
        .attr("cx", function (d) { return x(d[x_ds]); })
        .attr("cy", function (d) { return y(d[y_ds]); })
        .attr("fill-opacity", 0.3)
        .style("fill", function (d) {
            if (color == "grade_auto") {
                if (d.grade_auto == "Good") { return "#1a9850" } else {
                    if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" }
                }
            }
        })
        .style("stroke-width", 1.5)
                .style("stroke-opacity", 0.7)
        .style("stroke", function (d) {
            if (color == "grade_auto") {
                if (d.grade_auto == "Good") { return "#1a9850" } else {
                    if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" }
                }
            }
        })

         .on("mouseover", function (d) {
             d3.select("#sensor_id").html(d["id"]);
             focus_id = d3.select("#sensor_id").html();


             //Change #o1_svg
             var svg1 = d3.select("#o1_svg");

             svg1.selectAll('circle')
             .transition()
             .duration(750)
             .ease(d3.easeLinear)
             .style("fill", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })
             .style("stroke", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })
             .attr("r", function (d) {
                 if (d.id == focus_id) {
                     return "7"
                 } else {
                     return "4"
                 };
             })
             .attr("fill-opacity", function (d) {
                 if (d.id == focus_id) {
                     return "1"
                 } else {
                     return "0.5"
                 };
             })
           //Change #o2_svg
             svg1 = d3.select("#o2_svg");

             svg1.selectAll('circle')
             .transition()
             .duration(750)
             .ease(d3.easeLinear)
             .style("fill", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })
             .style("stroke", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })
             .attr("r", function (d) {
                 if (d.id == focus_id) {
                     return "7"
                 } else {
                     return "4"
                 };
             })
             .attr("fill-opacity", function (d) {
                 if (d.id == focus_id) {
                     return "1"
                 } else {
                     return "0.3"
                 };
             })
           .style("z-index", function (d) {
               if (d.id == focus_id) {
                   return "1000"
               }
           })



             //Change #o3_svg
             svg1 = d3.select("#o3_svg");

             svg1.selectAll('circle')
             .transition()
             .duration(750)
             .ease(d3.easeLinear)
             .style("fill", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })
             .style("stroke", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })

             .attr("r", function (d) {
                 if (d.id == focus_id) {
                     return "7"
                 } else {
                     return "4"
                 };
             })
             .attr("fill-opacity", function (d) {
                 if (d.id == focus_id) {
                     return "1"
                 } else {
                     return "0.3"
                 };
             })
           .style("z-index", function (d) {
               if (d.id == focus_id) {
                   return "1000"
               }
           })


             //Change #o4_svg
             svg1 = d3.select("#o4_svg");

             svg1.selectAll('circle')
             .transition()
             .duration(750)
             .ease(d3.easeLinear)
             .style("fill", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })
             .style("stroke", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })

             .attr("r", function (d) {
                 if (d.id == focus_id) {
                     return "7"
                 } else {
                     return "4"
                 };
             })
             .attr("fill-opacity", function (d) {
                 if (d.id == focus_id) {
                     return "1"
                 } else {
                     return "0.3"
                 };
             })
           .style("z-index", function (d) {
               if (d.id == focus_id) {
                   return "1000"
               }
           })



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

function d3mv_scatter_plot4(args) {

    var chart = args.chart;
    var data = args.data;
    var x_ds = args.x_ds;
    var y_ds = args.y_ds;
    var width = args.width || 500;
    var margin = args.margin || { top: 20, right: 20, bottom: 33, left: 52 };
    var height = args.height || width / 1.618;
    var color = args.color || "#1f78b4";  //{col: "col name", colors:[]}
    var Y_Label = args.Y_Label || "";
    var X_Label = args.X_Label || "Sensors ordered by score";




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
    y.domain(d3.extent(data, function (d) { return d[y_ds]; })).nice();

    svg.append("g")
    .attr("class", "x axis ")
    .attr('id', "axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    svg.append("text")
.style("text-anchor", "end")
 .attr("x", width)
 .attr("y", height + 31)
       .style("font-size", "12px")
.text(X_Label);


    svg.append("g")
        .attr("class", "y axis")
        .attr('id', "axis--y")
        .call(yAxis);


    svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", -42)
    .attr("x", 0)
.attr("dy", "1em")
.style("text-anchor", "end")
.style("font-size", "12px")
.text(Y_Label);


    if (typeof (color) == "object") {
        var color_picker = d3.scaleLinear()
                  .domain([0, 1])
                  .range(color.range)
                  .interpolate(d3.interpolateHcl);
    }


    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function (d) { return x(d[x_ds]); })
        .attr("cy", function (d) { return y(d[y_ds]); })
        .attr("fill-opacity", 0.3)
        .style("fill", function (d) {
            if (color == "grade_auto") {
                if (d.grade_auto == "Good") { return "#1a9850" } else {
                    if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" }
                }
            }
        })
        .style("stroke-width", 1.5)
                .style("stroke-opacity", 0.7)
        .style("stroke", function (d) {
            if (color == "grade_auto") {
                if (d.grade_auto == "Good") { return "#1a9850" } else {
                    if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" }
                }
            }
        })
         .on("mouseover", function (d) {

             d3.select("#sensor_id").html(d["id"]);
             focus_id = d3.select("#sensor_id").html();


             //Change #o1_svg
             var svg1 = d3.select("#o1_svg");

             svg1.selectAll('circle')
             .transition()
             .duration(150)
             .ease(d3.easeLinear)
             .style("fill", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })
             .style("stroke", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })
             .attr("r", function (d) {
                 if (d.id == focus_id) {
                     this.parentElement.appendChild(this);
                     return "10"
                 } else {
                     return "4"
                 };
             })
             .attr("fill-opacity", function (d) {
                 if (d.id == focus_id) {
                     return "1"
                 } else {
                     return "0.3"
                 };
             })

             //Change #o2_svg
             svg1 = d3.select("#o2_svg");

             svg1.selectAll('circle')
             .transition()
             .duration(150)
             .ease(d3.easeLinear)
             .style("fill", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })
             .style("stroke", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })
             .attr("r", function (d) {
                 if (d.id == focus_id) {
                     this.parentElement.appendChild(this);
                     return "10"
                 } else {
                     return "4"
                 };
             })
             .attr("fill-opacity", function (d) {
                 if (d.id == focus_id) {
                     return "1"
                 } else {
                     return "0.3"
                 };
             })
           .style("z-index", function (d) {
               if (d.id == focus_id) {
                   return "1000"
               }
           })



             //Change #o3_svg
             svg1 = d3.select("#o3_svg");

             svg1.selectAll('circle')
             .transition()
             .duration(150)
             .ease(d3.easeLinear)
             .style("fill", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })
             .style("stroke", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })
             .attr("r", function (d) {
                 if (d.id == focus_id) {
                     this.parentElement.appendChild(this);
                     return "10"
                 } else {
                     return "4"
                 };
             })
             .attr("fill-opacity", function (d) {
                 if (d.id == focus_id) {
                     return "1"
                 } else {
                     return "0.3"
                 };
             })
             .style("z-index", function (d) {
               if (d.id == focus_id) {
                   return "1000"
               }
           })


             //Change #o4_svg
             svg1 = d3.select("#o4_svg");

             svg1.selectAll('circle')
             .transition()
             .duration(150)
             .ease(d3.easeLinear)
             .style("fill", function (d) {
                 if (d.id == focus_id) {
                     this.parentElement.appendChild(this);
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })
             .style("stroke", function (d) {
                 if (d.id == focus_id) {
                     return "#2166ac"
                 } else {
                     if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
                 };
             })
             .attr("r", function (d) {
                 if (d.id == focus_id) {
                     return "10"
                 } else {
                     return "4"
                 };
             })
             .attr("fill-opacity", function (d) {
                 if (d.id == focus_id) {
                     return "1"
                 } else {
                     return "0.3"
                 };
             })
              .style("position", "absolute")
             .style("z-index", function (d) {
               if (d.id == focus_id) {
                   return "1000"
               }
               else
               {
                   return "1"
               }
           })

             $("#sensor_id").val("sensor_id").trigger('change');
         })

    .on("mouseout", function (d) {
        tooltip.transition()
               .duration(500)
               .style("opacity", 0);
    })
    .on("click", function (d) {
    });

}


function d3mv_scatter_plot5(args) {

    var chart = args.chart;
    var data = args.data;
    var x_ds = args.x_ds;
    var y_ds = args.y_ds;
    var width = args.width || 500;
    var margin = args.margin || { top: 20, right: 20, bottom: 33, left: 52 };
    var height = args.height || width / 1.618;
    var color = args.color || "#1f78b4";  //{col: "col name", colors:[]}
    var Y_Label = args.Y_Label || "";
    var X_Label = args.X_Label || "Sensors ordered by score";




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
    y.domain(d3.extent(data, function (d) { return d[y_ds]; })).nice();

    svg.append("g")
    .attr("class", "x axis ")
    .attr('id', "axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    svg.append("text")
.style("text-anchor", "end")
 .attr("x", width)
 .attr("y", height + 31)
       .style("font-size", "12px")
.text(X_Label);


    svg.append("g")
        .attr("class", "y axis")
        .attr('id', "axis--y")
        .call(yAxis);


    svg.append("text")
.attr("transform", "rotate(-90)")
.attr("y", -42)
    .attr("x", 0)
.attr("dy", "1em")
.style("text-anchor", "end")
.style("font-size", "12px")
.text(Y_Label);


    if (typeof (color) == "object") {
        var color_picker = d3.scaleLinear()
                  .domain([0, 1])
                  .range(color.range)
                  .interpolate(d3.interpolateHcl);
    }


    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function (d) { return x(d[x_ds]); })
        .attr("cy", function (d) { return y(d[y_ds]); })
        .attr("fill-opacity", 0.3)
        .style("fill", function (d) {
            if (color == "grade_auto") {
                if (d.grade_auto == "Good") { return "#1a9850" } else {
                    if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" }
                }
            }
        })
        .style("stroke-width", 1.5)
                .style("stroke-opacity", 0.7)
        .style("stroke", function (d) {
            if (color == "grade_auto") {
                if (d.grade_auto == "Good") { return "#1a9850" } else {
                    if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" }
                }
            }
        })
         .on("mouseover", function (d) {

             d3.select("#sensor_id").html(d["id"]);
             focus_id = d3.select("#sensor_id").html();


         //    //Change #o1_svg
         //    var svg1 = d3.select("#o1_svg");

        //     svg1.selectAll('circle')
        //     .transition()
        //     .duration(150)
          //   .ease(d3.easeLinear)
         //    .style("fill", function (d) {
         //        if (d.id == focus_id) {
         //            return "#2166ac"
         //        } else {
         //            if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
         //        };
         //    })
         //    .style("stroke", function (d) {
         //        if (d.id == focus_id) {
         //            return "#2166ac"
         //        } else {
         //            if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
         //        };
         //    })
         //    .attr("r", function (d) {
         //        if (d.id == focus_id) {
         //            this.parentElement.appendChild(this);
         //            return "10"
         //        } else {
         //            return "4"
         //        };
         //    })
         //    .attr("fill-opacity", function (d) {
         //        if (d.id == focus_id) {
         //            return "1"
         //        } else {
         //            return "0.3"
         //        };
         //    })

         //    //Change #o2_svg
         //    svg1 = d3.select("#o2_svg");

         //    svg1.selectAll('circle')
         //    .transition()
         //    .duration(150)
         //    .ease(d3.easeLinear)
         //    .style("fill", function (d) {
         //        if (d.id == focus_id) {
         //            return "#2166ac"
         //        } else {
         //            if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
         //        };
         //    })
         //    .style("stroke", function (d) {
         //        if (d.id == focus_id) {
         //            return "#2166ac"
         //        } else {
         //            if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
         //        };
         //    })
         //    .attr("r", function (d) {
         //        if (d.id == focus_id) {
         //            this.parentElement.appendChild(this);
         //            return "10"
         //        } else {
         //            return "4"
         //        };
         //    })
         //    .attr("fill-opacity", function (d) {
         //        if (d.id == focus_id) {
         //            return "1"
         //        } else {
         //            return "0.3"
         //        };
         //    })
         //  .style("z-index", function (d) {
         //      if (d.id == focus_id) {
         //          return "1000"
         //      }
         //  })



         //    //Change #o3_svg
         //    svg1 = d3.select("#o3_svg");

         //    svg1.selectAll('circle')
         //    .transition()
         //    .duration(150)
         //    .ease(d3.easeLinear)
         //    .style("fill", function (d) {
         //        if (d.id == focus_id) {
         //            return "#2166ac"
         //        } else {
         //            if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
         //        };
         //    })
         //    .style("stroke", function (d) {
         //        if (d.id == focus_id) {
         //            return "#2166ac"
         //        } else {
         //            if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
         //        };
         //    })
         //    .attr("r", function (d) {
         //        if (d.id == focus_id) {
         //            this.parentElement.appendChild(this);
         //            return "10"
         //        } else {
         //            return "4"
         //        };
         //    })
         //    .attr("fill-opacity", function (d) {
         //        if (d.id == focus_id) {
         //            return "1"
         //        } else {
         //            return "0.3"
         //        };
         //    })
         //    .style("z-index", function (d) {
         //        if (d.id == focus_id) {
         //            return "1000"
         //        }
         //    })


         //    //Change #o4_svg
         //    svg1 = d3.select("#o4_svg");

         //    svg1.selectAll('circle')
         //    .transition()
         //    .duration(150)
         //    .ease(d3.easeLinear)
         //    .style("fill", function (d) {
         //        if (d.id == focus_id) {
         //            this.parentElement.appendChild(this);
         //            return "#2166ac"
         //        } else {
         //            if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
         //        };
         //    })
         //    .style("stroke", function (d) {
         //        if (d.id == focus_id) {
         //            return "#2166ac"
         //        } else {
         //            if (d.grade_auto == "Good") { return "#1a9850" } else { if (d.grade_auto == "tbd") { return "#fdae61" } else { return "#d73027" } }
         //        };
         //    })
         //    .attr("r", function (d) {
         //        if (d.id == focus_id) {
         //            return "10"
         //        } else {
         //            return "4"
         //        };
         //    })
         //    .attr("fill-opacity", function (d) {
         //        if (d.id == focus_id) {
         //            return "1"
         //        } else {
         //            return "0.3"
         //        };
         //    })
         //     .style("position", "absolute")
         //    .style("z-index", function (d) {
         //        if (d.id == focus_id) {
         //            return "1000"
         //        }
         //        else {
         //            return "1"
         //        }
         //    })

         //    $("#sensor_id").val("sensor_id").trigger('change');
         })

    //.on("mouseout", function (d) {
    //    tooltip.transition()
    //           .duration(500)
    //           .style("opacity", 0);
    //})
    .on("click", function (d) {
    });

}

