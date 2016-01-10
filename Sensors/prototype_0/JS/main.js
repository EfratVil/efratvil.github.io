
// Original head section
//<head>
//    <meta charset="utf-8" />
//    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
//    <!--[if IE]> <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> <![endif]-->
//    <title>JS snippets</title>
//    <link href="assets/css/bootstrap.css" rel="stylesheet" />
//    <link href="assets/css/font-awesome.css" rel="stylesheet" />
//    <link href="assets/css/style.css" rel="stylesheet" />
//     <!-- HTML5 Shiv and Respond.js for IE8 support of HTML5 elements and media queries -->
//    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
//    <!--[if lt IE 9]>
//        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
//        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
//    <![endif]-->
//</head>



function init_settings() {
                 // $("head").html(Sethead());
                 $("header").html(Setheader());
                 $("nav").html(Setnav());
                 $("footer").html(Setfooter());
                
} 



//function Sethead() {

//    var headHTML = "<title>JS snippets</title>" +
//                   "<link href='assets/css/bootstrap.css' rel='stylesheet' />" +
//                   "<link href='assets/css/font-awesome.css' rel='stylesheet' />" +
//                   "<link href='assets/css/style.css' rel='stylesheet' />";
//    return headHTML;

//}



function Setheader() {

    var headerHTML = "<div class='container'>" +
                          "<div class='navbar-header'>" +
                               "<h1>Sensors Demo</h1>" +
                          "</div>" +
                     "</div>";
    return headerHTML;

}


    function Setnav() {

        var navHTML = "<section class='menu-section'>" +
            "<div class='container'>" +
              "<div class='row'>" +
                "<div class='col-md-12'>" +
                   "<div class='navbar-collapse collapse '>" +
                      "<ul id='menu-top' class='nav navbar-nav navbar-right'>" +
                      "<li><a id='index' href='index.html'>Index</a></li>" +
                      "<li><a id='sensors' href='sensors.html'>Sensors</a></li>" +
                      "<li><a id='Projects' href='Projects.html'>Projects</a></li>" +
                      "<li><a id='Project_view' href='Project_view.html'>Project view</a></li>" +
                      "<li><a id='sensor_Summary' href='sensor_Summary.html'>sensor Summary</a></li>" +
                      "<li><a id='sensor_details' href='sensor_details.html'>sensor details</a></li>" +                      
                      "<li><a id='Daily_Scatterplot' href='Daily_Scatterplot.html'>Scatter</a></li>" +

                   //   "<li><a id='Exp_bootstrap' href='exp_bootstrap.html'>Bootstrap</a></li>" +
                  //    "<li><a id='Exp_loadash' href='exp_loadash.html'>loadash</a></li>" +

                      "<li><a href='blank.html'>Blank</a></li>" +
                      "</ul>" +
                   "</div>" +
                 "</div>" +
              "</div>" +
            "</div>" +
        "</section>";
        return navHTML;

    }


    function Setfooter() {

        var footerHTML = "<div class='container'>"+
                              "<div class='row'>" +
                                   "<div class='col-md-12'>" +
                                        "&copy; 2015 MultiDash | By : <a href='#' target='_blank'>Efrat Vilenski</a>"+
                                    "</div>" +
                               "</div>" +
                         "</div>";
        return footerHTML;
    }







        
            
               
                    
                     
 
    