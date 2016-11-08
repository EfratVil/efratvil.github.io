// This is the main program that sets up a scatter plot to visualize the Iris data set.
// Curran Kelleher March 2015
require(["scatterPlot"], function (ScatterPlot) {

  // Initialize the scatter plot.
  var options = {
        
        // Tell the visualization which DOM element to insert itself into.
        container: d3.select("#container").node(),

        // Specify the margin and text label offsets.
        margin: {
          top: 10,
          right: 10,
          bottom: 45,
          left: 55
        },
        yAxisLabelOffset: 1.8, // Unit is CSS "em"s
        xAxisLabelOffset: 1.9,
        titleOffset: 0.3
      },
      scatterPlot1 = ScatterPlot(options),
      scatterPlot2 = ScatterPlot(options);

  // Fetch the column metadata.
  d3.json("iris-metadata.json", function (metadata) {

    var xColumn = "sepal_length",
        yColumn = "petal_length",
        sizeColumn = "petal_width",
        colorColumn = "class",
        xyOptions = {
          xColumn: xColumn,
          xAxisLabel: metadata[xColumn].label,
          yColumn: yColumn,
          yAxisLabel: metadata[yColumn].label
        };

    // Use the same X and Y for all plots.
    scatterPlot1.set(xyOptions);
    scatterPlot2.set(xyOptions);

    // Load the data from a CSV file.
    d3.csv("iris.csv", function (data){

      // Parse quantitative values from strings to numbers.
      var quantitativeColumns = Object.keys(metadata).filter(function (column){
        return metadata[column].type === "Q";
      });
      data.forEach(function (d){
        quantitativeColumns.forEach(function (column){
          d[column] = parseFloat(d[column]);
        });
      });

      // Pass the data into the plots.
      scatterPlot1.data = data;
      scatterPlot2.data = data;
    });

    // Use the first plot to zoom in the second plot.
    scatterPlot1.brushEnabled = true;
    scatterPlot1.when("brushedIntervals", function (brushedIntervals){
      scatterPlot2.xDomainMin = brushedIntervals[xColumn][0];
      scatterPlot2.xDomainMax = brushedIntervals[xColumn][1];
      scatterPlot2.yDomainMin = brushedIntervals[yColumn][0];
      scatterPlot2.yDomainMax = brushedIntervals[yColumn][1];
    });

    // Initialize the default brush.
    scatterPlot1.brushedIntervals = {
      "sepal_length": [ 4.82, 7.77 ],
      "petal_length": [ 2.84, 6.80 ]
    };
  });

  // Sets the `box` model property
  // based on the size of the container,
  function computeBoxes(){
    var width = container.clientWidth,
        height = container.clientHeight,
        padding = 10,
        plotWidth = (width - padding * 2) / 2,
        plotHeight = height - padding * 2;
    scatterPlot1.box = {
      x: padding,
      y: padding,
      width: plotWidth,
      height: plotHeight
    };
    scatterPlot2.box = {
      x: plotWidth + padding * 2,
      y: padding,
      width: plotWidth,
      height: plotHeight
    };
  }

  // once to initialize `model.box`, and
  computeBoxes();

  // whenever the browser window resizes in the future.
  window.addEventListener("resize", computeBoxes);
});
