// A reusable scatter plot module.
// Curran Kelleher March 2015
define(["d3", "model"], function (d3, Model) {

  // A representation for an optional Model property that is not specified.
  // This allows the "when" approach to support optional properties.
  // Inspired by Scala's Option type.
  // See http://alvinalexander.com/scala/using-scala-option-some-none-idiom-function-java-null
  var None = "__none__";

  // The constructor function, accepting default values.
  return function ScatterPlot(defaults) {

    // Create a Model instance for the visualization.
    // This will serve as its public API.
    var model = Model();

    // Create an SVG element from the container DOM element.
    model.when("container", function (container) {
      model.svg = d3.select(container).append("svg")

        // Use CSS `position: absolute;`
        // so setting `left` and `top` later will
        // position the SVG relative to the container div.
        .style("position", "absolute");
    });

    // Adjust the size of the SVG based on the `box` property.
    model.when(["svg", "box"], function (svg, box) {

      // Set the CSS `left` and `top` properties
      // to move the SVG to `(box.x, box.y)`
      // relative to the container div.
      svg
        .style("left", box.x + "px")
        .style("top", box.y + "px")
        .attr("width", box.width)
        .attr("height", box.height);
    });

    // Create an SVG group that will contain the visualization.
    model.when("svg", function (svg) {
      model.g = svg.append("g");
    });

    model.when("g", function (g) {

      // Add an SVG group to contain the marks.
      model.circlesG = g.append("g");

      // Create a group for the brush.
      model.brushG = g.append("g").attr("class", "brush");

      // The circles group is added first, before the brush group,
      // so that mouse events go to the brush rather than to the 
      // circles, even when the mouse is on top of a circle.
    });

    // Disable brushing by default.
    model.brushEnabled = false;

    // Set up brushing interactions to define `brushedIntervals` on the model.
    model.when(["brushEnabled", "xColumn", "yColumn", "xScale", "yScale"],
        function (brushEnabled, xColumn, yColumn, xScale, yScale) {
      if(brushEnabled){
        var brush = d3.svg.brush();
        brush.on("brush", function () {
          model.brushedIntervals = brushToIntervals(brush, xColumn, yColumn, xScale, yScale);
        });
        model.brush = brush;
      }
    });


    function brushToIntervals(brush, xColumn, yColumn, xScale, yScale){
      var brushedIntervals = {};
      if(!brush.empty() 
      && brush.extent() !== null){
        var e = brush.extent(),
            xMin = e[0][0],
            yMin = e[0][1],
            xMax = e[1][0],
            yMax = e[1][1],
            epsilon = 0.01;

        // Account for the edge case where the brush is at the 
        // X or Y min or max. Adding a small value ensures that all 
        // points are included when crossfilter's filterRange is used,
        // because filterRange provides an exclusive range, not inclusive.
        // See https://github.com/square/crossfilter/wiki/API-Reference#dimension_filterRange
        if(xMax === xScale.domain()[1]){ xMax += epsilon; }
        if(yMax === yScale.domain()[1]){ yMax += epsilon; }
        if(xMin === xScale.domain()[0]){ xMin -= epsilon; }
        if(yMin === yScale.domain()[0]){ yMin -= epsilon; }

        brushedIntervals[xColumn] = [xMin, xMax];
        brushedIntervals[yColumn] = [yMin, yMax];
      } else {
        brushedIntervals[xColumn] = [None, None];
        brushedIntervals[yColumn] = [None, None];
      }
      return brushedIntervals;
    }

    function intervalsToBrush(brushedIntervals, xColumn, yColumn){
      return [
        [brushedIntervals[xColumn][0], brushedIntervals[yColumn][0]],
        [brushedIntervals[xColumn][1], brushedIntervals[yColumn][1]]
      ];
    }

    // Update the rendered brush.
    model.when(["brushedIntervals", "brush", "brushG", "xColumn", "yColumn", "xScale", "yScale"],
        function (brushedIntervals, brush, brushG, xColumn, yColumn, xScale, yScale) {

      // Update the scales within the brush.
      brush.x(xScale);
      brush.y(yScale);

      // Update the extent of the brush.
      brush.extent(intervalsToBrush(brushedIntervals, xColumn, yColumn));

      // Render the brush onto the brush group.
      brushG.call(brush);
    });

    // Adjust the SVG group translation based on the margin.
    model.when(["g", "margin"], function (g, margin) {
      g.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    });

    // Create the title text element.
    model.when("g", function (g){
      model.titleText = g.append("text").attr("class", "title-text");
    });

    // Center the title text when width changes.
    model.when(["titleText", "width"], function (titleText, width) {
      titleText.attr("x", width / 2);
    });

    // Update the title text based on the `title` property.
    model.when(["titleText", "title"], function (titleText, title){
      titleText.text(title);
    });

    // Update the title text offset.
    model.when(["titleText", "titleOffset"], function (titleText, titleOffset){
      titleText.attr("dy", titleOffset + "em");
    });

    // Compute the inner box from the outer box and margin.
    // See Margin Convention http://bl.ocks.org/mbostock/3019563
    model.when(["box", "margin"], function (box, margin) {
      model.width = box.width - margin.left - margin.right;
      model.height = box.height - margin.top - margin.bottom;
    });

    // Generate a function for getting the X value.
    model.when(["data", "xColumn"], function (data, xColumn) {
      model.getX = function (d) { return d[xColumn]; };
    });

    // Compute the domain of the X attribute.

    // Allow the API client to optionally specify fixed min and max values.
    model.xDomainMin = None;
    model.xDomainMax = None;
    model.when(["data", "getX", "xDomainMin", "xDomainMax"],
        function (data, getX, xDomainMin, xDomainMax) {

      if(xDomainMin === None && xDomainMax === None){
        model.xDomain = d3.extent(data, getX);
      } else {
        if(xDomainMin === None){
          xDomainMin = d3.min(data, getX);
        }
        if(xDomainMax === None){
          xDomainMax = d3.max(data, getX);
        }
        model.xDomain = [xDomainMin, xDomainMax]
      }
    });

    // Compute the X scale.
    model.when(["xDomain", "width"], function (xDomain, width) {
      model.xScale = d3.scale.linear().domain(xDomain).range([0, width]);
    });

    // Generate a function for getting the scaled X value.
    model.when(["data", "xScale", "getX"], function (data, xScale, getX) {
      model.getXScaled = function (d) { return xScale(getX(d)); };
    });

    // Set up the X axis.
    model.when("g", function (g) {
      model.xAxisG = g.append("g").attr("class", "x axis");
      model.xAxisText = model.xAxisG.append("text").style("text-anchor", "middle");
    });

    // Move the X axis label based on its specified offset.
    model.when(["xAxisText", "xAxisLabelOffset"], function (xAxisText, xAxisLabelOffset){
      xAxisText.attr("dy", xAxisLabelOffset + "em");
    });

    // Update the X axis transform when height changes.
    model.when(["xAxisG", "height"], function (xAxisG, height) {
      xAxisG.attr("transform", "translate(0," + height + ")");
    });

    // Center the X axis label when width changes.
    model.when(["xAxisText", "width"], function (xAxisText, width) {
      xAxisText.attr("x", width / 2);
    });

    // Update the X axis based on the X scale.
    model.when(["xAxisG", "xScale"], function (xAxisG, xScale) {
      xAxisG.call(d3.svg.axis().orient("bottom").scale(xScale));
    });

    // Update X axis label.
    model.when(["xAxisText", "xAxisLabel"], function (xAxisText, xAxisLabel) {
      xAxisText.text(xAxisLabel);
    });

    // Generate a function for getting the Y value.
    model.when(["data", "yColumn"], function (data, yColumn) {
      model.getY = function (d) { return d[yColumn]; };
    });

    // Compute the domain of the Y attribute.

    // Allow the API client to optionally specify fixed min and max values.
    model.yDomainMin = None;
    model.yDomainMax = None;
    model.when(["data", "getY", "yDomainMin", "yDomainMax"],
        function (data, getY, yDomainMin, yDomainMax) {

      if(yDomainMin === None && yDomainMax === None){
        model.yDomain = d3.extent(data, getY);
      } else {
        if(yDomainMin === None){
          yDomainMin = d3.min(data, getY);
        }
        if(yDomainMax === None){
          yDomainMax = d3.max(data, getY);
        }
        model.yDomain = [yDomainMin, yDomainMax]
      }
    });

    // Compute the Y scale.
    model.when(["data", "yDomain", "height"], function (data, yDomain, height) {
      model.yScale = d3.scale.linear().domain(yDomain).range([height, 0]);
    });

    // Generate a function for getting the scaled Y value.
    model.when(["data", "yScale", "getY"], function (data, yScale, getY) {
      model.getYScaled = function (d) { return yScale(getY(d)); };
    });

    // Set up the Y axis.
    model.when("g", function (g) {
      model.yAxisG = g.append("g").attr("class", "y axis");
      model.yAxisText = model.yAxisG.append("text")
        .style("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .attr("y", 0);
    });
    
    // Move the Y axis label based on its specified offset.
    model.when(["yAxisText", "yAxisLabelOffset"], function (yAxisText, yAxisLabelOffset){
      yAxisText.attr("dy", "-" + yAxisLabelOffset + "em")
    });

    // Center the Y axis label when height changes.
    model.when(["yAxisText", "height"], function (yAxisText, height) {
      yAxisText.attr("x", -height / 2);
    });

    // Update Y axis label.
    model.when(["yAxisText", "yAxisLabel"], function (yAxisText, yAxisLabel) {
      yAxisText.text(yAxisLabel);
    });

    // Update the Y axis based on the Y scale.
    model.when(["yAxisG", "yScale"], function (yAxisG, yScale) {
      yAxisG.call(d3.svg.axis().orient("left").scale(yScale));
    });

    // Allow the API client to optionally specify a size column.
    model.sizeColumn = None;
    
    // The default radius of circles in pixels.
    model.sizeDefault = 2;

    // The min and max circle radius in pixels.
    model.sizeMin = 0.5;
    model.sizeMax = 6;

    // Set up the size scale.
    model.when(["sizeColumn", "data", "sizeDefault", "sizeMin", "sizeMax"],
        function (sizeColumn, data, sizeDefault, sizeMin, sizeMax){
      if(sizeColumn !== None){
        var getSize = function (d){ return d[sizeColumn] },
            sizeScale = d3.scale.linear()
              .domain(d3.extent(data, getSize))
              .range([sizeMin, sizeMax]);
        model.getSizeScaled = function (d){ return sizeScale(getSize(d)); };
      } else {
        model.getSizeScaled = function (d){ return sizeDefault; };
      }
    });

    // Allow the API client to optionally specify a color column.
    model.colorColumn = None;
    model.colorRange = None;
    
    // The default color of circles (CSS color string).
    model.colorDefault = "black";

    // Set up the size scale.
    model.when(["colorColumn", "data", "colorDefault", "colorRange"],
        function (colorColumn, data, colorDefault, colorRange){
      if(colorColumn !== None && colorRange !== None){
        var getColor = function (d){ return d[colorColumn] },
            colorScale = d3.scale.ordinal()
              .domain(data.map(getColor))
              .range(colorRange);
        model.getColorScaled = function (d){ return colorScale(getColor(d)); };
      } else {
        model.getColorScaled = function (d){ return colorDefault; };
      }
    });

    // Filter out points that go beyond the edges of the plot
    // for the case that the domain is set explicitly and is 
    // smaller than the extent of the data.
    model.when(["data", "getX", "getY", "xScale", "yScale"],
        function(data, getX, getY, xScale, yScale){
      var xMin = xScale.domain()[0], xMax = xScale.domain()[1],
          yMin = yScale.domain()[0], yMax = yScale.domain()[1];
      model.visibleData = data.filter(function(d){
        var x = getX(d), y = getY(d);
        return x > xMin && x < xMax && y > yMin && y < yMax;
      });
    });

    // Draw the circles of the scatter plot.
    model.when(["visibleData", "circlesG", "getXScaled", "getYScaled", "getSizeScaled", "getColorScaled"],
        function (visibleData, circlesG, getXScaled, getYScaled, getSizeScaled, getColorScaled){

      var circles = circlesG.selectAll("circle").data(visibleData);
      circles.enter().append("circle");
      circles
        .attr("cx", getXScaled)
        .attr("cy", getYScaled)
        .attr("r", getSizeScaled)
        .attr("fill", getColorScaled);
      circles.exit().remove();

    });

    // Set defaults at the end so they override optional properties set to None.
    model.set(defaults);

    return model;
  };
});
