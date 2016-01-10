

function Table_From_DS_Wide(data) {
      
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

    html += "</tbody></table></div>";

    return html;
}


function Table_From_DS_Wide1(data,top) {

    var html = '<div class="table-responsive">';
    html += '<table class="table table-striped table-bordered table-hover">';
    html += '                                 <thead>';
    html += '                                      <tr>';

    for (var j = 0; j < Object.keys(data[0]).length; j++) {
        html += "<th>" + Object.keys(data[0])[j] + "</th>";
    }

    html += '                                    </tr>';
    html += '                                </thead>';
    html += '                                <tbody>';

    //TODO - set min of top or data.length
    //data.length
    for (var i = 0; i < top; i++) {
        html += "<tr>";


        for (var j = 0; j < Object.keys(data[0]).length; j++) {
            html += "<td>" + data[i][Object.keys(data[0])[j]] + "</td>";
        }

        html += "</tr>";
    }

    html += "</tbody></table></div>";

    return html;
}


function Table_From_DS_Col(data) {

    var html = '<div class="table-responsive">';
    html += '<table class="table table-striped table-bordered table-hover">';

    for (var j = 0; j < Object.keys(data[0]).length; j++) {
        html += "<th>" + Object.keys(data[0])[j] + "</th>";
    }

    html += '                                <tbody>';

    //TODO - set min of top or data.length
    //data.length
    for (var i = 0; i < top; i++) {
        html += "<tr>";


        for (var j = 0; j < Object.keys(data[0]).length; j++) {

            html += "<td>" + data[i][Object.keys(data[0])[j]] + "</td>";
        }

        html += "</tr>";
    }

    html += "</table></div>";

    return html;
}




function mix_From_DS(data,top) {

    var html = '';

    for (var i = 0; i < data.length; i++) {

      //  html += "<div class='mix category-1'><h4 class='page-head-line'>" + data[i]["sensor_id"] + "</h4></div>";

        html += "<div class='mix ";
        html += "Grade-" + data[i]["Class1"] + " ";
        //if (data[i]["Negative_Days"] > 0)
        //   { html += "Neg-Y "; }
        //else
        //   { html += "Neg-N "; }

        html += "'><div class='panel panel-primary'><div class='panel-heading'> <h3 class='panel-title'>" + data[i]["sensor_id"] + "  " + data[i]["Class1"]  + "</h3>";
        html += "</div> <div class='panel-body'>Project: " + data[i]["project_id"];  //+ "<br/>Logger: " + data[i]["logger_id"]
        //html += "<br/>Negative: " + data[i]["Negative_Days"] + "<br/>>9500: " + data[i]["Days_Above_9500"];
        html += "</div> </div> </div>";
    }

    return html;
}


// Can EOL --------!!!!!!!!!!!!!!!!!!
//for isotope2.html
function isotope1_From_DS(data,top) {

    var html = '';
    html += "<div class='isotope'> ";



    for (var i = 0; i < data.length; i++) {

        html += "<div class='element-item transition metal ";
        html += "Grade-" + data[i]["Class1"];  //data[i]["Class1"]
        html += "' data-category='" + data[i]["Class1"] + "'>";  //data[i]["Class1"] "transition"
        html += "<h3 class='name'>" + data[i]["sensor_id"] + "</h3>";
        html += "<br/><p class='symbol'>" + data[i]["project_id"] + "</p>";
        html += "<p class='number'>" + data[i]["Cnt_Days_10X"] + "</p>";
        html += "<br/><p class='weight'>" + data[i]["Class1"] + "</p>";
        html += "</div>";
    }

        html += "</div>";

    return html;

}


function isotope_projects_From_DS(data, top) {

    var html = '';
    html += "<div class='isotope'> ";



    for (var i = 0; i < data.length; i++) {

        html += "<div class='element-item transition metal ";
        html += "Grade-" + data[i]["Class1"];  //data[i]["Class1"]
        html += "' data-category='" + data[i]["Class1"] + "'>";  //data[i]["Class1"] "transition"
        html += "<h3 class='name'>" + data[i]["sensor_id"] + "</h3>";
        html += "<br/><p class='symbol'>" + data[i]["project_id"] + "</p>";
        html += "<p class='number'>" + data[i]["Cnt_Days_10X"] + "</p>";
        html += "<br/><p class='weight'>" + data[i]["Class1"] + "</p>";
        html += "</div>";
    }

    html += "</div>";

    return html;

}


//for isotope1.html
function isotope_From_DS(data, top) {

    var html = '';
    html += "<div class='isotope'> ";



    for (var i = 0; i < data.length; i++) {

        html += "<div class='element-item transition metal ";
        html += "Grade-" + "transition" + " " + data[i]["Class1"];  //data[i]["Class1"]
        html += "' data-category='" + data[i]["Class1"] + "'>";  //data[i]["Class1"] "transition"
        html += "<h3 class='name'>" + data[i]["sensor_id"] + "</h3>";
        html += "<br/><p class='symbol'>" + data[i]["project_id"] + "</p>";
        html += "<p class='number'>" + data[i]["Cnt_Days_10X"] + "</p>";
        html += "<br/><p class='weight'>" + data[i]["Class1"] + "</p>";
        html += "</div>";
    }

    html += "</div>";

    return html;

}