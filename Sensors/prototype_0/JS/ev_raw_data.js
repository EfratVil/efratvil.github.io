
//---------------------------------------
//         Sensors data
//---------------------------------------

var raw_ww = [];

function get_raw_ww(ww) {
    
    d3.csv("data/raw/raw_" + ww + ".csv", function (error, data) {
        if (error) throw error;

        var parseDate = d3.time.format("%m/%d/%Y hh:mm").parse;

        data.forEach(function (d) {
            // d.date = parseDate(d.datetime);
            d["sensor_id"] = +d["sensor_id"];
            d["value"] = +d["value"];
            d["gap"] = +d["gap"];
        });

        raw_ww = data;

    });
}

get_raw_ww("Week4");




