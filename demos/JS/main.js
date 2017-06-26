

$("#sidebar-toggle").click(function () {

    if ($("left-bar").css("display") != "none") {
        $("left-bar").css("display", "none");
        $("right-bar").css('margin-left', '0px');
    }
    else {
        $("left-bar").css("display", "block");
        $("right-bar").css('margin-left', '200px');
    }

});







//function Sethead() {
//    var headHTML = "<a href='index.html' class='logo'>MultiDash</a>" +
//                   "<a href='#'>" +
//                   "<span id='sidebar-toggle' class='glyphicon glyphicon-align-justify'></span>" +
//                   "<nav >" +
//                   "</a>" +
//                   "<div class='container-fluid'>" +
//                   " <ul class='nav navbar-nav navbar-right'>" +
//                   "     <li><a href='#'><span class='glyphicon glyphicon-user'></span> Sign Up</a></li>" +
//                   "     <li><a href='#'><span class='glyphicon glyphicon-log-in'></span> Login</a></li>" +
//                   "</ul>" +
//                   "</div>" +
//                   "</nav>";
//    return headHTML;
//}




//function Sethead() {
//    var headHTML = "<meta charset='UTF-8'>" +
//                   "<meta name='viewport' content='width=device-width'>" +
//                   "<title>MultiDash Admin</title>" +
//                   "<link href='CSS/bootstrap.min.css' rel='stylesheet' />" +
//                   "<link rel='stylesheet' href='CSS/main.css' />" +
//                   "<link href='CSS/charts2.css' rel='stylesheet'/>";
//    return headHTML;
//}




function Set_header() {

        var leftbarHTML = "<a href='index.html' class='logo'>MultiDash</a>"+
                              "<a href='#'><span id='sidebar-toggle' class='glyphicon glyphicon-align-justify'></span></a>" +
                                   "<nav >" +
                                        "<div class='container-fluid'>"+
                                            "<ul class='nav navbar-nav navbar-right'>" +
                                                 "<li><a href='index.html'><span class='glyphicon glyphicon-log-in'></span> Home</a></li>" +
                                        "</ul>"+
                                    "</div>" +
                                   "</nav>";
        return leftbarHTML;
    }

//function Setheader() {

//    var headerHTML = "<div class='container'>" +
//                          "<div class='navbar-header'>" +
//                               "<h1>Sensors Demo</h1>" +
//                          "</div>" +
//                     "</div>";
//    return headerHTML;

//}


//    function Setnav() {

//        var navHTML = "<section class='menu-section'>" +
//            "<div class='container'>" +
//              "<div class='row'>" +
//                "<div class='col-md-12'>" +
//                   "<div class='navbar-collapse collapse '>" +
//                      "<ul id='menu-top' class='nav navbar-nav navbar-right'>" +
//                      "<li><a id='index' href='index.html'>Index</a></li>" +
//                      "<li><a id='Outliers' href='outliers.html' target='_blank'>Outliers</a></li>" +
//                    //  "<li><a id='Projects' href='Projects.html'>Projects</a></li>" +
//                    //  "<li><a id='Project_view' href='Project_view.html'>Project view</a></li>" +
//                      "<li><a id='sensor_Summary' href='sensor_Summary.html'>sensor Summary</a></li>" +
//                      "<li><a id='sensor_details' href='sensor_details.html'>sensor details</a></li>" +                      
//                      //"<li><a id='Daily_Scatterplot' href='Daily_Scatterplot.html'>Scatter</a></li>" +
//                       "<li><a id='Corr_Matrix' href='Corr_Matrix.html'>Corr Matrix</a></li>" +
//                       "<li><a id='pca' href='PCA.html'>PCA</a></li>" +
//                       "<li><a id='pca_sd' href='PCA_sd.html'>PCA sd</a></li>" +
//                       "<li><a id='Hotelling' href='Hotelling.html'>Hotelling</a></li>" +
//                       "<li><a id='Trend' href='Trend_Outliers.html' target='_blank'>Trend</a></li>" +

                       
//                   //   "<li><a id='Exp_bootstrap' href='exp_bootstrap.html'>Bootstrap</a></li>" +
//                  //    "<li><a id='Exp_loadash' href='exp_loadash.html'>loadash</a></li>" +

                     
//                      "</ul>" +
//                   "</div>" +
//                 "</div>" +
//              "</div>" +
//            "</div>" +
//        "</section>";
//        return navHTML;

//    }


    function Set_leftbar() {

        var leftbarHTML = "<br /><br />"+
                              "<ul class='sidebar-menu'>" +
                                   "<li class='active'>" +
                                        "<a href='line_chart.html'>Line Chart</a>" +
                                    "</li>" +
                                   "<li class='active'>" +
                                        "<a href='ts_chart.html'>Time Series Chart</a>" +
                                    "</li>" +
                                   "<li class='active'>" +
                                        "<a href='multiline_chart.html'>Multi Line Chart</a>" +
                                    "</li>" +

                                    
                                   "<li class='active'>" +
                                        "<a href='bar_chart.html'>Bar Chart</a>" +
                                    "</li>" +
                                   "<li class='active'>" +
                                        "<a href='scatter_plot.html'>Scatter Plot</a>" +
                                    "</li>" +
                         "</ul><br /><br />" +

                              "<ul class='sidebar-menu'>" +


                              
                                   "<li class='active'>" +
                                      "<a href='heatmap.html'>Heatmap</a>" +
                                   "</li>" +
                                   "<li class='active'>" +
                                        "<a href='force.html'>Force</a>" +
                                    "</li>" +
                                   "<li class='active'>" +
                                        "<a href='bubbles.html'>Bubbles</a>" +
                                    "</li>" +
                         "</ul><br /><br />" +

                         
                         "<ul class='sidebar-menu'>" +
                                   "<li class='active'>" +
                                        "<a href='histogram.html'>Histogram</a>" +
                                    "</li>" +
                                    "<li class='active'>" +
                                        "<a href='box_plot.html'>box plot</a>" +
                                    "</li>" +
                                   "<li class='active'>" +
                                        "<a href='SPC_charts.html'>Simple SPC</a>" +
                                    "</li>" +
                         "</ul>" +
        "</ul><br /><br />" +
        "<ul class='sidebar-menu'>" +
                  "<li class='active'>" +
                       "<a href='tables.html'>Tables</a>" +
                   "</li>" +
                  "<li class='active'>" +
                       "<a href='data_js.html'>Data functions</a>" +
                   "</li>" +
                  "<li class='active'>" +
                       "<a href='more_charts.html'>More Charts</a>" +
                   "</li>" +        
        "</ul>";
        

        return leftbarHTML;
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

    function init_settings() {
        // $("head").html(Sethead());
      //  $("header").html(Sethead());
      //  $("left-bar").html(Set_leftbar());
        
        //               $("nav").html(Setnav());
        //             $("footer").html(Setfooter());
                
    } 



//==================================================================================================================
//                                examples
//==================================================================================================================

    function Set_leftbar1() {

        var leftbarHTML = "<br /><br />" +

            //"<div class='dropdown' style='margin-left: 20px;'>" +
            //    "<button class='btn btn-primary dropdown-toggle' type='button' data-toggle='dropdown'>Select data" +
            //    "<span class='caret'></span></button>" +
            //    "<ul class='dropdown-menu'>" +
            //        "<li><a href='#'>HTML</a></li>" +
            //        "<li><a href='#'>CSS</a></li>" +
            //        "<li><a href='#'>JavaScript</a></li>" +
            //    "</ul>" +
            //"</div> " +
            "<select id='file_id'>" + 
                "<option value='Example_1'>Example 1</option>" +
                "<option selected value='Example_2'>Example 2</option>" +
                "<option value='Example_3'>Example 3</option>" +
                "<option value='Example_5'>Example 5</option>" +
            "</select>" +


            "<br /><br />" +
                              "<ul class='sidebar-menu'>" +
                                   "<li class='active'>" +
                                        "<a href='#'>tbd</a>" +
                                    "</li>" +
                                   "<li class='active'>" +
                                        "<a href='#'>tbd</a>" +
                                    "</li>" +
                         "</ul><br /><br />";
        return leftbarHTML;
    }
            
               
                    
                     
 
    