// ============ initinating ============
var margin = { top: 20, right: 20, bottom: 120, left: 65 },
   width = 960 - margin.left - margin.right,
   height = 360 - margin.top - margin.bottom;

//tooltip
var tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

//var x = d3.scale.linear().range([0, width]);
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    .ticks(36)
    .tickFormat(function (d, i) {
       return ['Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'Chile', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Israel', 'Italy', 'Japan', 'Korea', 'Luxembourg', 'Mexico', 'Netherlands', 'New Zealand', 'Norway', 'Poland', 'Portugal', 'Russia', 'Slovak Republic', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Turkey', 'United Kingdom', 'United States'][i];
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

    data.forEach(function (d) {
        d.ID = +d.ID;
        d.Value = +d.Value;
    });

    //Setting the scale function
    var dsfy = data.filter(function (d) { return d.Indicator == "A1" });
    y.domain([d3.min(dsfy, function (d) { return d.Value; }), d3.max(dsfy, function (d) { return d.Value; })]);

    var dsf = data.filter(function (d) { return d.Indicator == "A1" && d.year == 2015; });
    x.domain(data.map(function (d) { return d.Country; }));

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function (d) {
                return "rotate(-65)"
            });


    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);
      //  .selectAll("text")
       //     .style("font-size", "12px");
      
    svg.selectAll(".dot")
        .data(dsf)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 7)
       // .attr("cx", function (d) { function (d, i) { return i * (width/24.5) + 24 })}; })
        .attr("cx", function (d, i) { return i * (width/36.5) + 20 })  
        .attr("cy", function (d) { return y(d.Value); })
        .style("fill", function (d) { return colorPicker(d.zone_id); })
     .on("mouseover", function (d) {
         tooltip.transition()
           .duration(500)
           .style("opacity", .9)
         tooltip.html("<strong>" + d.Country + "</strong></br>" + d.Value)
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px");
          })
      .on("mouseout", function (d) {
         tooltip.transition()
           .duration(500)
           .style("opacity", 0);
          });


    //================= Change Indicator event =====================
    d3.select("#xaxis").on("change", function () {

        var sel = d3.select('#xaxis').node().value; 
        var year = d3.select('#year').node().value;


        dsf = data.filter(function (d) { return d.Indicator == sel && d.year == year; });

        switch (sel) {
            case "A1":
                d3.select("#Indicator_explain").html("% of the population living in a dwelling without indoor flushing toilet for the sole use of the household. Flushing toilets outside the dwelling are not to be considered in this item. Flushing toilets in a room where there is also a shower unit or a bath are also counted. <br/><br /><b>Unit:</b> Percentage");
                break;
            case "A2":
                d3.select("#Indicator_explain").html("Expenditure of housing and maintenance: Housing, water, electricity, gas, Furnishings, households&#39; equipment and routine maintenance of the house <br/><br /><b>Unit:</b> Percentage");
                break;
            case "A3":
                d3.select("#Indicator_explain").html("Number of rooms (excluding kitchenette, scullery/utility room, bathroom, toilet, garage, consulting rooms, office, shop) in a dwelling divided by the number of persons living in the dwelling. <br/> <br /><b>Unit:</b> Rate ");
                break;
            case "B1":
                d3.select("#Indicator_explain").html("Maximum amount that a household can afford to consume without having to reduce its assets or to increase its liabilities. <br/><br /><b>Unit:</b> US dollars ");
                break;
            case "B2":
                d3.select("#Indicator_explain").html("Net financial wealth consists of: currency and deposits, securities other than share, loans, shares and other equity <br/> <br /><b>Unit:</b> US dollars");
                break;
            case "C1":
                d3.select("#Indicator_explain").html("Number of employed persons aged 15 to 64 over the population of the same age. Employed people are those aged 15 or more who report that they have worked in gainful employment for at least one hour in the previous week. <br/> <br /><b>Unit:</b> Percentage");
                break;
            case "C2":
                d3.select("#Indicator_explain").html("Probability to become unemployed. It is calculated as the number of people who were unemployed in 2013, but were employed in 2012 over the total number of employed in 2012. <br/> <br /><b>Unit:</b> Percentage of employed");
                break;
            case "C3":
                d3.select("#Indicator_explain").html("Number of persons who have been unemployed for one year or more as a percentage of the labour force. Unemployed persons are defined as those who are currently not working but are willing to do so and actively searching for work. <br/> <br /><b>Unit:</b> Percentage of the labour force");
                break;
            case "C4":
                d3.select("#Indicator_explain").html("Average annual wages per full-time equivalent dependent employee. Obtained by dividing the national-accounts-based total wage, by the average number of employees in the total economy. <br/> <br /><b>Unit:</b> US dollars");
                break;
            case "D1":
                d3.select("#Indicator_explain").html("Measure of perceived social network support. The indicator is based on the question: &#39;If you were in trouble, do you have relatives or friends you can count on to help you whenever you need them, or not?&#39; and it considers the respondents who respond positively. <br/> <br /><b>Unit:</b> Percentage");
                break;
            case "E1":
                d3.select("#Indicator_explain").html("Educational attainment considers the number of adults aged 25 to 64 holding at least an upper secondary degree over the population of the same age. <br/> <br /><b>Unit:</b> Percentage");
                break;
            case "E2":
                d3.select("#Indicator_explain").html("Students&#39; average score in reading, mathematics and science as assessed by the OECD&#39;s Programme for International Student Assessment (PISA). <br/><br /><b>Unit:</b> Average PISA scores");
                break;
            case "E3":
                d3.select("#Indicator_explain").html("Average duration of education in which a 5 year old child can expect to enrol during his/her lifetime until the age of 39. <br/> <br /><b>Unit:</b> Number of years");
                break;
            case "F1":
                d3.select("#Indicator_explain").html("Urban-population weighted average of annual concentrations of particulate matters less than 10 microns in diameter (PM10) in the air in residential areas of cities with more than 100,000 residents. <br/><br /><b>Unit:</b> Micrograms per cubic meter");
                break;
            case "F2":
                d3.select("#Indicator_explain").html("Captures people's subjective appreciation of the environment where they live, in particular the quality of the water. It is based on the question: In the city or area where you live, are you satisfied or dissatisfied with the quality of water?<br/><br /><b>Unit:</b> Percentage");
                break;
            case "G1":
                d3.select("#Indicator_explain").html("Weighted average of &#39;yes/no&#39; answers to various questions on the existence of law consultation by citizens, of formal procedures enabling general public to impact regulation and governmental actions. <br/> <br /><b>Unit:</b> Percentage");
                break;
            case "G2":
                d3.select("#Indicator_explain").html("Voter turnout is defined as the ratio between the number of individuals that cast a ballot during an election (whether this vote is valid or not) to the population registered to vote.<br/> <br /><b>Unit:</b> Percentage");
                break;
            case "H1":
                d3.select("#Indicator_explain").html("Life expectancy measures how long on average people could expect to live based on the age-specific death rates currently prevailing. This measure refers to people born today and is computed as a weighted average of life expectancy for men and women. <br/><br /><b>Unit:</b> Number of years");
                break;
            case "H2":
                d3.select("#Indicator_explain").html("Refers to the percentage of the population aged 15 years old and over who report &#39;good&#39; or better health. <br/><br /><b>Unit:</b> Percentage of population");
                break;
            case "I1":
                d3.select("#Indicator_explain").html("People&#39;s evaluation of their life as a whole. It is a weighted-sum of different response categories based on people's rates of their current life relative to the best and worst possible lives for them on a scale from 0 to 10<br/><br /><b>Unit:</b> Mean value");
                break;
            case "J1":
                d3.select("#Indicator_explain").html("Based on the question: 'Within the past 12 months: have you been assaulted or mugged?&#39; and it considers people declaring having been assaulted or mugged.<br/><br /><b>Unit:</b> Percentage of people aged 15+");
                break;
            case "J2":
                d3.select("#Indicator_explain").html("Deaths due to assault. <br/><br /><b>Unit:</b> Age-standardised rate per 100,000 population");
                break;
            case "K1":
                d3.select("#Indicator_explain").html("Measures the proportion of dependent employed whose usual hours of work per week are 50 hours or more.<br/><br /><b>Unit:</b> Percentage");
                break;
            case "K2":
                d3.select("#Indicator_explain").html("Measures the amount of hours (minutes) per day that, on average, full-time employed people spend on leisure and on personal care activities. <br/><br /><b>Unit:</b> Number of minutes per day");
                break;
        }

        // y.domain([d3.min(dsfy, function (d) { return d.Value; }), d3.max(dsfy, function (d) { return d.Value; })]);
        //Setting the scale function
       // dsfy = data.filter(function (d) { return d.Indicator == "sel" });
        // y.domain([d3.min(dsfy, function (d) { return d.Value; }), d3.max(dsfy, function (d) { return d.Value; })]);
        y.domain([d3.min(dsf, function (d) { return d.Value; }), d3.max(dsf, function (d) { return d.Value; })]);

      //  console.log("min - " + d3.min(dsfy, function (d) { return d.Value; }));
      //  console.log("max - " + d3.max(dsfy, function (d) { return d.Value; }));

        // Update Y Axis
        svg.select(".y.axis")
            .transition()
            .ease('linear')
            .duration(1000)
            .call(yAxis);
       

        svg.selectAll(".dot")
       .data(dsf)
        svg.selectAll('circle')
          .transition()
          .duration(1000)
         // .attr("cx", function (d) { return x(d.ID); })
          .attr("cx", function (d, i) { return i * (width / 36.5) + 20 })
          .attr("cy", function (d) { return y(d.Value); })
          .style("fill", function (d) { return colorPicker(d.zone_id); });

    });  // on change



    d3.select("#year").on("change", function () {

        var sel = d3.select('#xaxis').node().value; // .value;
        var year = d3.select('#year').node().value; // .value;
        dsf = data.filter(function (d) { return d.Indicator == sel && d.year == year; });

        y.domain([d3.min(dsf, function (d) { return d.Value; }), d3.max(dsf, function (d) { return d.Value; })]);

        //  console.log("min - " + d3.min(dsfy, function (d) { return d.Value; }));
        //  console.log("max - " + d3.max(dsfy, function (d) { return d.Value; }));

        // Update Y Axis
        svg.select(".y.axis")
            .transition()
            .ease('linear')
            .duration(1000)
            .call(yAxis);

        svg.selectAll(".dot")
       .data(dsf)
        svg.selectAll('circle')
          .transition()
          .ease('linear')
          .duration(1000)
          .attr("cx", function (d, i) { return i * (width / 36.5) + 20 })
          .attr("cy", function (d) { return y(d.Value); })
          .style("fill", function (d) { return colorPicker(d.zone_id); });

    });  // on change

}); // read csv


