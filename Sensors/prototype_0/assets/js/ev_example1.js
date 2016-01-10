
var data = [
          { "city": "seattle", "state": "WA", "population": 652405, "land_area": 83.9 },
          { "city": "new york", "state": "NY", "population": 8405837, "land_area": 302.6 },
          { "city": "boston", "state": "MA", "population": 645966, "land_area": 48.3 },
          { "city": "kansas city", "state": "MO", "population": 467007, "land_area": 315 }
];


function e1 () {

    var count = 0;

    data.forEach(function (d) {
        count += 1;
    });

    console.log(count);
    return count;
}


function Table_From_Arrays() {
      
    var html = '<div class="table-responsive">';
    html +=   '<table class="table table-striped table-bordered table-hover">';
    html +=   '                                 <thead>';
    html += '                                      <tr>';

    for (var j = 0; j < Object.keys(data[0]).length; j++) {
        html += "<th>" + Object.keys(data[0])[j] + "</th>";
    }

    html +=   '                                    </tr>';
    html += '                                </thead>';
    html += '                                <tbody>';

    for (var i = 0; i < data.length; i++) {
        html += "<tr>";

        for (var j = 0; j < Object.keys(data[0]).length; j++) {

            html += "<td>" + data[i][Object.keys(data[0])[j]] + "</td>";
        }

        html += "</tr>";
    }

    html += "</table></div>";

    return html;
}


function Table_From_Arrays_old() {

    var html = '<div class="table-responsive">';
    html += '<table class="table table-striped table-bordered table-hover">';
    html += '                                 <thead>';
    html += '                                     <tr>';
    html += '                                         <th>city</th>';
    html += '                                        <th>state</th>';
    html += '                                        <th>population</th>';
    html += '                                        <th>land_area</th>';
    html += '                                    </tr>';
    html += '                                </thead>';
    html += '                                <tbody>';


    for (var i = 0; i < data.length; i++) {
        html += "<tr>";
        html += "<td>" + data[i].city + "</td>";
        html += "<td>" + data[i].state + "</td>";
        html += "<td>" + data[i].population.toString() + "</td>";
        html += "<td>" + data[i].land_area.toString() + "</td>";
        html += "</tr>";
    }

    html += "</table></div>";

    return html;
}


