

$("#sidebar-toggle").click(function () {

    if ($("left-bar").css("display") != "none") {
        $("left-bar").css("display", "none");
        $("right-bar").css('margin-left', '0px');
    }
    else {
        $("left-bar").css("display", "block");
        $("right-bar").css('margin-left', '300px');
    }
});



//function Set_header() {

//        var leftbarHTML = "<a href='index.html' class='logo'></a>"+
//                              "<a href='#'><span id='sidebar-toggle' class='glyphicon glyphicon-align-justify'></span></a>" +
//                                   "<nav >" +
//                                        "<div class='container-fluid'>"+
//                                            "<ul class='nav navbar-nav navbar-right'>" +
//                                                 "<li><a href='index.html'><span class='glyphicon glyphicon-log-in'></span> Home</a></li>" +
//                                        "</ul>"+
//                                    "</div>" +
//                                   "</nav>";
//        return leftbarHTML;
//    }


    function Set_leftbar() {

        var leftbarHTML = "<br /><br /><br /><br /><h2 style='color:#eee; padding-left: 35px;'>Efrat<br/>Vilenski</h2><br /><br />" +


            "<br/><div class= 'left_bar_text'><b>About</b><br/>" +
            "Ph.D. student at Dept. of Industrial Eng. at Ben Gurion University, <br/>Supervised by <br /><a href='http://www.john-ros.com/'>Dr Jonathan Rosenblatt</a>.</div> " +
            "<br/>" +

           "<div class= 'left_bar_text'>I am interested in visual analytics for solving real-world, complex data problems. " +
           "Specifically looking for collaborations on industrial IoT challenges requiring unsupervised methods / process monitoring. </div> " +

        "<br/><div class= 'left_bar_text'>" +
        // "<i class='fa fa-linkedin' style='font-size:30px'></i>&nbsp;" +
            "<i class='fa fa-linkedin-square' style='font-size:30px'></i> &nbsp;&nbsp;&nbsp;" +

        // "<i class='fa fa-twitter'  style='font-size:30px'></i>&nbsp;" +
            "<i class='fa fa-twitter-square'  style='font-size:30px'></i>&nbsp;&nbsp;&nbsp;" +
            "<i class='fa fa-instagram'  style='font-size:30px'></i>&nbsp;&nbsp;&nbsp;" +
            "<i class='fa fa-flickr' style='font-size:30px'></i>&nbsp;&nbsp;&nbsp;" +
            "<i class='fa fa-envelope-o' style='font-size:32px'></i></div>";

                         //          "<ul class='sidebar-menu'>" +
                         //          "<li class='active'>" +
                         //               "<a href='Home.html'>Home</a>" +
                         //           "</li>" +
                         //          "<li class='active'>" +
                         //               "<a href='Projects.html'>Projects</a>" +
                         //           "</li>" +
                         //          "<li class='active'>" +
                         //               "<a href='Photograpy.html'>Photograpy</a>" +
                         //           "</li>" +
                         //          "<li class='active'>" +
                         //               "<a href='About.html'>About</a>" +
                         //           "</li>" +

                         //"</ul><br /><br />";
        

        return leftbarHTML;
    }

    
 
    

    function Setfooter() {

        var footerHTML = "<div class='container'>"+
                              "<div class='row'>" +
                                   "<div class='col-md-12'>" +
                                        "&copy; 2016 | By : <a href='#' target='_blank'>Efrat Vilenski</a>"+
                                    "</div>" +
                               "</div>" +
                         "</div>";
        return footerHTML;
    }



    function init_settings() {
                    
    } 



        
            
               
                    
                     
 
    