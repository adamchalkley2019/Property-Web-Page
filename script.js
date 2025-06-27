
/* 
     Date: June 25th 2025
     Author@ Adam Chalkley
*/

document.addEventListener("DOMContentLoaded", function (event) {

    // clicked the logo
    // logo will flip 180 degrees when clicked, a variable inside a closure will keep track of the
    // logos state
    function logoClicked(){

        var logoUpside = true;

        function inner(){

            if(logoUpside){

                document.getElementById("logo").src = "logo2.jpg";
                logoUpside = false;
                console.log("logoUpside");
                return; 
            }else{

                logoUpside = true;
                document.getElementById("logo").src = "logo.jpg";
            }
        }

        return inner;
    }

    var clickedLogo = logoClicked();

    let logo = document.getElementById("logo").addEventListener("click",()=>{

        clickedLogo();
       
    });

     // user clicked project button
     let projectsButton = document.getElementById("port-but").addEventListener("click", ()=>{

        // hide appropriate elements and make needed elements visible
        document.getElementById("nav").style.zindex = "-1";
        document.getElementById("portfolio").style.zindex = "-1";
        document.getElementById("about-us").style.display = "none";
        document.getElementById("footer").style.display = "none";
        document.getElementById("project-list-overlay").style.display = "flex";
        document.getElementById("project-list-content").style.display = "block";
        document.getElementById("project-list-content").style.zindex = "1";
        document.getElementById("project-list-overlay").style.zindex = "2";
      
        // user clicks 'X' button
        document.getElementById("exit-but").addEventListener("click",()=>{

            // close Modal and redisplay main page elements
            document.getElementById("nav").style.zindex = "1";
            document.getElementById("portfolio").style.zindex = "1";
            document.getElementById("about-us").style.display = "flex";
            document.getElementById("footer").style.display = "block";
            document.getElementById("project-list-overlay").style.display = "none";
            document.getElementById("project-list-content").style.display = "none";
            document.getElementById("project-list-content").style.zindex = "0";
            document.getElementById("project-list-overlay").style.zindex = "0";

        });
     });

     // user clicked the nav button
     document.getElementById("nav-but").addEventListener("click",()=>{
        
        // clear the modal data
        document.getElementById("temperature-content").innerHTML = "";

        // hide appropriate elements and make needed modal elements visible
        document.getElementById("nav").style.zindex = "-1";
        document.getElementById("portfolio").style.zindex = "-1";
        document.getElementById("about-us").style.display = "none";
        document.getElementById("footer").style.display = "none";
        document.getElementById("temperature").style.display = "block";
        document.getElementById("project-list-overlay").style.display = "flex";
        document.getElementById("temperature-header").style.display = "flex";
        document.getElementById("temperature").style.zindex = "2";
        document.getElementById("project-list-overlay").style.zindex = "1";
        
        // fetch API data

        // cities long and lat coordinates
        var dubLat = "53.35";
        var dubLong = "-6.26";
        var vieLat = "48.21";
        var vieLong = "16.36";
        var reykLat = "64.12";
        var reykLong = "-21.82";
        document.getElementById("temperature-content").style.display = "block";

        var fetchAPIData = async function(lat,long){

            var apiString = "https://api.open-meteo.com/v1/forecast?latitude=" + lat + "&longitude=" + dubLong + "&current_weather=true";
            var response = await fetch(apiString);
            var jsonData = await response.json();
            let cityTemp = jsonData['current_weather']['temperature'];
       
            return cityTemp;
        }   

        // display Data in HTML temperature div
        async function callAPIFunction(city, lat, long) {

             let cityTemp = await fetchAPIData(lat, long);
             document.getElementById("temperature-content").innerHTML += `<div class="city-entry">  <h4>City: ${city} - Temperature: <span id="temp">${cityTemp}C </span></h4> </div>`;
         }

        callAPIFunction("Dublin",dubLat,dubLong);
        callAPIFunction("Vienna", vieLat, vieLong);
        callAPIFunction("Reykjavik", reykLat, reykLong);

        // user clicks 'X' button
        document.getElementById("exit-but-temp").addEventListener("click", ()=>{

             // close Modal and redisplay main page elements
            document.getElementById("temperature-header").style.display = "none";
            document.getElementById("nav").style.zindex = "1";
            document.getElementById("portfolio").style.zindex = "1";
            document.getElementById("about-us").style.display = "flex";
            document.getElementById("footer").style.display = "block";
            document.getElementById("temperature").style.display = "none";
            document.getElementById("temperature-content").style.display = "none";
            document.getElementById("project-list-overlay").style.display = "none";
            document.getElementById("project-list-overlay").style.zindex = "0";
     });

    });

  });