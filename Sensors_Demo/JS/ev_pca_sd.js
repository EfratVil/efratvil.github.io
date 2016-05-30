//sensor_id,C1,PC1,PC2,PC3,PC4,PC5,PC6,PC7,PC8,PC9,PC10,PC_dist_2,PC_dist_3,PC_dist_5,PC_dist_7,PC_dist_10,CM_Sum,CM_Sum_Square,CM_Sum_sd,CM_Sum_Square_sd,T2_Hourly,T2_Hourly_Flag,T2_MDS,T2_Hourly_MDS,T2_Growth,T2_Hourly_Growth
//PC1, PC2, dist, sensor_id

// ============ initinating ============
var margin = { top: 20, right: 20, bottom: 30, left: 55 },
   width = 660 - margin.left - margin.right,
   height = 400 - margin.top - margin.bottom;

//tooltip
var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

//var PCX = d3.select('#PCX').node().value;
//var PCY = d3.select('#PCX').node().value;
var PCX = "PC1";
var PCY = "PC2";

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


var svg = d3.select("#chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .call(d3.behavior.zoom().on("zoom", function () {
     svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
     }))
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


function colorPicker(v) {
    if (v == 9) { return "#d73027"; }
    else if (v == 1) { return "#4575b4"; }
    else if (v == 2) { return "#66bd63"; }
    else if (v == 3) { return "#8073ac"; }
    else if (v == 4) { return "#35978f"; }
    else if (v == 5) { return "#bf812d"; }
    else if (v == 6) { return "#b2182b"; }
    else if (v == 7) { return "#66c2a5"; }
    else if (v == 8) { return "#5e4fa2"; }
    else { return "#1a9850"; }
}

//"raw_corr_sum " && sel
//"raw_corr_sum_square " && sel
//================= Read file & create SVG =====================
    d3.csv("data/outliers_Week9_pca.csv", function (error, data) {
    if (error) throw error;

    //d3.select("#pcx").html(PCX);
    //d3.select("#pcy").html(PCY);



    var sel = ""; //d3.select('#week').node().value;

    var corr_y = PCX //"gap_corr_sum " + sel;
    var corr_x = PCY //"gap_corr_sum_square " + sel;

   
    data.forEach(function (d) {
        //raw_corr_sum Week1,raw_corr_sum Week10,raw_corr_sum Week11,raw_corr_sum Week12,raw_corr_sum Week13,raw_corr_sum Week14,raw_corr_sum Week15,raw_corr_sum Week2,raw_corr_sum Week3,raw_corr_sum Week4,raw_corr_sum Week5,raw_corr_sum Week6,raw_corr_sum Week7,raw_corr_sum Week8,raw_corr_sum Week9,raw_corr_sum_square Week1,raw_corr_sum_square Week10,raw_corr_sum_square Week11,raw_corr_sum_square Week12,raw_corr_sum_square Week13,raw_corr_sum_square Week14,raw_corr_sum_square Week15,raw_corr_sum_square Week2,raw_corr_sum_square Week3,raw_corr_sum_square Week4,raw_corr_sum_square Week5,raw_corr_sum_square Week6,raw_corr_sum_square Week7,raw_corr_sum_square Week8,raw_corr_sum_square Week9
        d["sensor_id"] = +d["sensor_id"];
        d["PC1"] = +d["PC1"];
        d["PC2"] = +d["PC2"];
        d["PC3"] = +d["PC3"];
        d["PC4"] = +d["PC4"];
        d["PC5"] = +d["PC5"];
        d["PC6"] = +d["PC6"];
        d["PC7"] = +d["PC7"];
        d["PC8"] = +d["PC8"];
        d["PC9"] = +d["PC9"];
        d["PC10"] = +d["PC10"];
        d["C1"] = +d["C1"];

        

    });


        
    //var data1 = data.filter(function (d) { return isNaN(d.corr_sum) === false });

  //  x.domain(d3.extent(data, function (d) { return d["PC1"]; })).nice();
  //  y.domain([d3.min(data, function (d) { return d["PC2"]; }), d3.max(data, function (d) { return d["PC2"]; })]).nice();
    

//    x.domain([-500,500]);
 //   y.domain([-500,500]);

    x.domain(d3.extent(data, function (d) { return d[PCX]; })).nice();
    y.domain([d3.min(data, function (d) { return d[PCY]; }), d3.max(data, function (d) { return d[PCY]; })]).nice();



    svg.append("g")
        .attr("class", "x axis")
        .attr('id', "Sum Square")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .attr('id', "Sum")
        .call(yAxis);


   // console.log(" x(0) - " + x(5));
   // console.log(" y(0) - " + y(5));


    svg.append("svg:ellipse")
    .attr("cx", x(0))
    .attr("cy", y(0))
  //  .attr("rx", 100)
  //  .attr("ry", 50)
    .attr("rx", 0.3*width)
    .attr("ry", 0.3*height)
    .attr("opacity", 0.15)
    .style("fill", 'rgba(255,128,255,0.4)')
    .style("stroke", "#777")
    .style("stroke-width", '1px');

    svg.selectAll(".dot")
        .data(data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 4)
        .attr("cx", function (d) { return x(d[PCX]); })
        .attr("cy", function (d) { return y(d[PCY]); })
        .attr("opacity", 0.75)
       // .style("fill", function (d) { return colorPicker(2); })   //d["C1"]
        //.style("stroke", function (d) { return colorPicker(2); })  //d["C1"]
        .style("stroke", function (d) {
            if (d.grade_auto == "Good") { return "green"; }
            if (d.grade_auto == "Outlier") { return "red"; }
            else { return "orange"; }
        })
              .style("fill", function (d) {
                  if (d.grade_auto == "Good") { return "green"; }
                  if (d.grade_auto == "Outlier") { return "red"; }
                  else { return "orange"; }
              })
        //.style("fill", function (d) { return color(d["C1"]); })
    .on("mouseover", function (d) {

        d3.select("#sensor_name").html("<h4 style='display: inline'>Sensor ID: </h4>");
        d3.select("#sensor_id").html( d["sensor_id"] );
        $("#sensor_id").val("sensor_id").trigger('change');

         })
    .on("mouseout", function (d) {
         })
    .on("click", function (d) {
          });

    
   
    //================= Change asset event =====================
    function Change_dd() {

        var PCX = d3.select('#pcx').node().value;
        var PCY = d3.select('#pcy').node().value;

 //       console.log(PCX);
 //       console.log(PCY);

      x.domain(d3.extent(data, function (d) { return d[PCX]; })).nice();
        y.domain([d3.min(data, function (d) { return d[PCY]; }), d3.max(data, function (d) { return d[PCY]; })]).nice();


        svg.selectAll("ellipse")
        .transition()
        .ease('linear')
        .duration(1000)
    .attr("cx", x(0))
    .attr("cy", y(0))
    .attr("rx", 0.3 * width)
    .attr("ry", 0.3 * height);


        // Update Y Axis
        svg.select(".y.axis")
            .transition()
            .ease('linear')
            .duration(1000)
            .call(yAxis);   


        // Update x Axis
        svg.select(".x.axis")
            .transition()
            .ease('linear')
            .duration(1000)
            .call(xAxis);


        // update the scatter plot
        svg.selectAll(".dot")
       .data(data)
        svg.selectAll('circle')
          .transition()
          .ease('linear')
          .duration(1000)
.attr("cx", function (d) { return x(d[PCX]); })
            .attr("cy", function (d) { return y(d[PCY]); });
   
    }


    //================= Change asset event =====================
    d3.select("#week").on("change", function () {
        Change_dd();
    });


    d3.select("#pcx").on("change", function () {
        Change_dd();
    });

    d3.select("#pcy").on("change", function () {
        Change_dd();
    });

});


