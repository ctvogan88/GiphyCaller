// Display the Start Button in the `#start` div of `index.html`.
$(document).ready(function () {


    // Initial array of sports
    var sports = ["Baseball", "Football", "Hockey", "Basketball", "planking", "freestyle walking", "parkour", "quidditch"];

    // Function for displaying SPORT buttons
    function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#gif-buttons").empty();

        // Loops through the array of sports
        for (var i = 0; i < sports.length; i++) {

            // Then dynamicaly generates buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            var a = $("<div class=button>");
            // Adds a class of movie to our button
            a.addClass("btn btn-warning sport");
            // Added a data-attribute
            a.attr("data-name", sports[i]);
            // Provided the initial button text
            a.text(sports[i]);
            // Added the button to the buttons-view div
            $("#gif-buttons").append(a);
        };
    };

    // call out the RENDER BUTTONS function and get those SPORT buttons on the page
    renderButtons();

    $("#clear-box").on("click", function () {
        console.log("clear gifs!");
        $("#gif-holder").empty();
      });

    // adds buttons to options
    $("#add-GIF").on("click", function (event) {
        event.preventDefault();
        // This line of code will grab the input from the textbox
        var GIFsearch = $("#GIF-input").val().trim();

        // The term from the textbox is then added to our array
        sports.push(GIFsearch);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
    });


    // here's the GIF display object
    var displayGIF = function () {

        var gifSearch = $("#gifSearchBar").text();
        var queryURL = "https://www.omdbapi.com/?t=" + gifSearch + "1uCJw86559MzW2c5oRwA7y70wqFXjWej";

        console.log(gifSearch);
        console.log(queryURL);

        //javascript, jQuery

        //var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
        //xhr.done(function(data) { console.log("success got data", data); });
    };


    $("#gifSearchBtn").click(function () {
        //timer.stop;
        displayGIF();
    });

    $("body").on("click", ".sport", function () {
        var sport = $(this).attr("data-name");
        console.log(sport);
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=1uCJw86559MzW2c5oRwA7y70wqFXjWej&q=" + sport + "&limit=10&offset=0&rating=R&lang=en"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;

            console.log(response);

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='gif'>");

                var rating = results[i].rating;

                var p = $("<p>").text("Rating: " + rating);

                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_still.url);
                gifImage.attr("data-still", results[i].images.fixed_height_still.url);
                gifImage.attr("data-animate", results[i].images.fixed_height.url);
                gifImage.attr("data-state", "still");
                gifImage.attr("id", "gif" + i);
                gifDiv.prepend(p);
                gifDiv.prepend(gifImage);

                $("#gif-holder").prepend(gifDiv);
            };
        });
    });
    
  $("body").on("click", "img", function () {
    console.log("GIF button hit!");

    var state = $(this).attr("data-state");

    console.log(state);

    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });

});

