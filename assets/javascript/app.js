// Display the Start Button in the `#start` div of `index.html`.
$(document).ready(function () {

  //displayStart();
  //$("#start").on("click", $(this).timer.start);

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
      $(".time-left").text("00:15");
      // DONE: Use setInterval to start the count here and set the clock to running.
      if (!clockRunning) {
        intervalId = setInterval(timer.count, 1000);
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

  $("#gifSearchBtn").click(function () {
    //timer.stop;
    displayGIF();
  });

  $("#start").click(function () {

    timer.start();

    // defines the question number
    var questionNum = 1;

    // sends the question to the question DIV
    console.log(trivia.triv1.q);
    $("#questionDiv").text(trivia.triv1.q);


    var ansCt = "trivia.triv" + questionNum + ".answers.items";
    console.log(ansCt);


    // counts the number of question/answer combos in the object // console.log(trivLength)
    var trivLength = Object.keys(trivia).length;

    // loop through questions
    for (var i = 0; i < trivLength; i++) {

      // populates the answers to the answer DIV
      for (var j = 0; j < 4; j++) {

        //console.log(trivia.triv1.a[j]);
        //$(".answer-option").append(trivia.triv1.a[j]);

        var a = $("<button><p>");
        // Adding a class
        a.addClass("correct");
        // Provided the initial button text
        a.text(trivia.triv1.a[j]);
        // Added the button to the HTML
        $(".answer-option").append(a);


      }
      console.log(trivia.triv1.correct);
    };
  });
});

