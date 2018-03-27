// This code will run as soon as the page loads
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

  // This function handles events where the add GIF button is clicked
  $("#add-GIF").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var GIFsearch = $("#GIF-input").val().trim();

    // The term from the textbox is then added to our array
    sports.push(GIFsearch);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
  });

  $(".sport").on("click", function () {
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
        gifImage.attr("src", results[i].images.fixed_width_still.url);
        gifImage.attr("data-still", results[i].images.fixed_width_still.url);
        gifImage.attr("data-animate", results[i].images.fixed_width.url);
        gifImage.attr("data-state", "still");
        gifImage.attr("id", "gif" + i);
        gifDiv.prepend(p);
        gifDiv.prepend(gifImage);

        $("#gif-holder").prepend(gifDiv);
      };
    });
  });

  $(".gif").on("click", function() {
    console.log("GIF button hit!");
  });

  // defines game playing and clock running variables as false and displays 00:00 clock
  var gamePlaying = false;
  var clockRunning = false;

  // Variable that will hold our setInterval that runs the stopwatch
  var intervalId;

  // prevents the clock from being sped up unnecessarily
  var clockRunning = false;

  // Timer Object
  var timer = {

    time: 15,
    lap: 1,

    reset: function () {

      stopwatch.time = 0;
      stopwatch.lap = 1;

      // DONE: Change the "display" div to "00:00."
      $(".time-left").text("00:00");

      // DONE: Empty the "laps" div.
      //$("#laps").text("");
    },
    start: function () {
      // DONE: Use setInterval to start the count here and set the clock to running.
      if (!clockRunning) {
        intervalId = setInterval(timer.count, 1000);
        $(".time-left").text(timer.count);
        clockRunning = true;
        $("#start").text("Stop Trivia");
      }
    },
    stop: function () {

      // DONE: Use clearInterval to stop the count here and set the clock to not be running.
      clearInterval(intervalId);
      clockRunning = false;
    },
    recordLap: function () {

      // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
      //       and save the result in a variable.
      var converted = stopwatch.timeConverter(timer.time);

      // DONE: Add the current lap and time to the "laps" div.
      $("#laps").append("<p>Lap " + timer.lap + " : " + converted + "</p>");

      // DONE: Increment lap by 1. Remember, we can't use "this" here.
      timer.lap++;
    },
    count: function () {

      // DONE: increment time by 1, remember we cant use "this" here.
      timer.time--;

      // DONE: Get the current time, pass that into the stopwatch.timeConverter function,
      //       and save the result in a variable.
      var converted = timer.timeConverter(timer.time);
      console.log(converted);

      // DONE: Use the variable we just created to show the converted time in the "display" div.
      $(".time-left").text(converted);
    },
    timeConverter: function (t) {

      var minutes = Math.floor(t / 60);
      var seconds = t - (minutes * 60);

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      if (minutes === 0) {
        minutes = "00";
      }
      else if (minutes < 10) {
        minutes = "0" + minutes;
      }

      return minutes + ":" + seconds;
    },
  };

  // here is the question/answers object
  var trivia = {
    triv1: {
      q: "What is the tallest mountain on Planet Earth?",
      a: ["Mt. Everest", "Mauna Kea, Hawaii", "Pico Cristóbal Colón, Colómbia", "Mt. Whitney"],
      correct: "Mauna Kea, Hawaii"
    },
    triv2: {
      q: "What is the tallest mountain on Planet Earth?",
      a: "nope",
      wrong: ["Mt. Everest", "Mauna Kea, Hawaii", "Pico Cristóbal Colón, Colómbia", "Mt. Whitney"],
    },
    triv3: {
      q: "What is the tallest mountain on Planet Earth?",
      a: {
        wrong: ["Mt. Everest", "Mauna Kea, Hawaii", "Pico Cristóbal Colón, Colómbia", "Mt. Whitney"]
      }
    }
  };

  // app response to user click on Start Trivia button
  $("#start").click(function () {
    // checks if clock is already running and runs if clock is not running
    if (!clockRunning) {
      timer.start();

      //$("#answer-box").empty();

      // defines the question number
      var questionNum = 1;

      // sends the question to the question DIV
      //console.log(trivia.triv1.q);
      $("#questionDiv").text(trivia.triv1.q);

      //var ansCt = "trivia.triv" + questionNum + ".answers.items";
      //console.log(ansCt);

      // counts the number of question/answer combos in the object // console.log(trivLength)
      var trivLength = Object.keys(trivia).length;

      // finds the question number
      console.log();


      // loop through questions
      // for (var i = 0; i < trivLength; i++) {
        // populates the answers to the answer DIV
        for (var j = 0; j < 4; j++) {
          var a = $("<br><button>");
          a.addClass("correct");
          a.text(trivia.triv1.a[j]);
          $(".answer-option").append(a);
        }
        console.log(trivia.triv1.correct);
      //};
    } else {
      timer.stop();
      $("#start").text("Resume Trivia");
    };
  });
});

