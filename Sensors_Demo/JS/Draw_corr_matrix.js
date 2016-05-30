var margin = 0,
    width = 1000 - margin,
    height = 1000 - margin,
    colorRange = ['#d73027', '#e0e0e0', '#4575b4'],  //blue  red white
    x = d3.scale.ordinal().rangeBands([0, width]).domain(d3.range(397));

var color = d3.scale.linear().range(colorRange).domain([-1,0, 1]);

var svg = d3.select('#charts')
    .append('svg')
    .attr("width", width + (margin * 2))
    .attr("height", height + (margin * 2))
        .call(d3.behavior.zoom().on("zoom", function () {
            svg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")
        }))

    .append("g")
    .attr("transform", "translate(" + (margin) + "," + (margin) + ")");

d3.csv('data/cor/cor_bicovm_week9.csv', function (error, data) {
    if (error) return console.log(error);

    //console.log(data);
    var row = svg.selectAll(".row")
        .data(data)
        .enter()
        .append("g")
        .attr("class", "row")
        .attr("transform", function(d, i) { return "translate(0," + x(i) + ")"; })
        .each(row);

    var column = svg.selectAll(".column")
        .data(data)
        .enter().append("g")
        .attr("class", "column")
        .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });


    function row(row) {

        var array = Object.keys(row).map(function(k) { return row[k]; });
        array.shift();

        var cell = d3.select(this).selectAll(".cell")
            .data(array)
            .enter()
            .append("rect")
            .attr("class", "cell")
            .attr("x", function(d, i) { return x(i); })
            .attr("width", x.rangeBand())
            .attr("height", x.rangeBand())
            .style("fill", function(d) { return color(d); });

    }

})
