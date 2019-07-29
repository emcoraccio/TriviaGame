// general knowledge category=9 url="https://opentdb.com/api.php?amount=10&category=9&type=multiple"
// entertinment-TV category=14 url="https://opentdb.com/api.php?amount=10&category=14&type=multiple"
// mythology category=20 url="https://opentdb.com/api.php?amount=10&category=20&type=multiple"
// sport category=21  url="https://opentdb.com/api.php?amount=10&category=21&type=multiple"
// geography category=22  url="https://opentdb.com/api.php?amount=10&category=22&type=multiple"
// animals category=27  url="https://opentdb.com/api.php?amount=10&category=27&type=multiple"
// comics category=29  url="https://opentdb.com/api.php?amount=10&category=29&type=multiple"
// science&nature category=17  url="https://opentdb.com/api.php?amount=10&category=17&type=multiple"
// board games category=16 url="https://opentdb.com/api.php?amount=10&category=16&type=multiple"
// random - 9 to 32

$(document).ready(function () {

  // global variables
  let queryURL;
  let triviaData;
  let thisQuestion;
  let timer;
  let correctAnswer;
  let answers = [];
  let userAnswer;
  let questionNumber = 1;
  let triviaQuestion = 0;
  let numberCorrect = 0;
  let numberIncorrect = 0;
  let random;
  let instance = M.FormSelect.getInstance("option");


  // jquery variables
  let $screen1 = $("section.screen1");
  let $screen2 = $("section.screen2");
  let $screen3 = $("section.screen3");

  let $timer = $("p.countdown");
  let $questionNum = $("p.questionNum")

  let $question = $("div.question");
  let $answer = $("div.answer")
  let $answer1 = $("div.answer1");
  let $answer2 = $("div.answer2");
  let $answer3 = $("div.answer3");
  let $answer4 = $("div.answer4");

  let $correctResponses = $("p.numCorrect")
  let $incorrectResponses = $("p.numIncorrect")



  // initializing category choice
  $('select').formSelect();


  // helper function to shuffle answers array
  let shuffle = function (arr) {
    for (var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr;
  };


  // retrieving data from the API
  let getData = function () {
    $.get(queryURL).then(function (response) {

      triviaData = response.results;
      console.log(triviaData);
      let category = triviaData[0].category.toUpperCase();
      $("h1.title").text(`${category} TRIVIA`)

      setQuestion(triviaData);
      setAnswers(triviaData);
    });
  }


  let setQuestion = function (trivia) {

    console.log(triviaQuestion);
    thisQuestion = trivia[triviaQuestion].question
    let $p = $("<p>").html(thisQuestion)
    $($question).append($p);
  }


  let setAnswers = function (trivia) {
    correctAnswer = $("<p>").html(trivia[triviaQuestion].correct_answer)
    correctAnswer = correctAnswer.text();
    console.log(correctAnswer);
    answers.push(correctAnswer);

    trivia[triviaQuestion].incorrect_answers.forEach(el => {
      answers.push(el)
      console.log(answers);
    })

    shuffle(answers);
    let answer1 = $("<p>").text(answers[0]);

    $($answer1).html(answers[0]);
    $($answer2).html(answers[1]);
    $($answer3).html(answers[2]);
    $($answer4).html(answers[3]);

    $answer.mouseover(function () {
      $(this).css({ "background-color": "#689B9F", "color": "#233435" });
    }).mouseout(function () {
      $(this).css({ "background-color": "#C4E1E3", "color": "#689B9F" });
    });
  }


  let checkAnswer = () => {
    if (!userAnswer) {
      userAnswer = event.target.textContent;

      // if user's guess is correct
      if (userAnswer === correctAnswer) {
        $(event.target).css({ "background-color": "#A6D49F", "color": "#2E3A2C" })
        setTimeout(showCorrect, 500);
        numberCorrect++;

      }
      // if user's guess is incorrect
      else {
        $(event.target).css({ "background-color": "#5E0B15", "color": "#1A0306" })
        setTimeout(showCorrect, 500);
        numberIncorrect++;

      }
    }

    triviaQuestion++
    setTimeout(newQuestion, 5000);
  }

  function showCorrect() {
    for (i = 0; i < 4; i++) {

      let answerI = $($answer).get(i);

      if ($(answerI).text() === correctAnswer) {
        let color = 6;

        // blinking the correct color answer
        function colorSwap() {
          color--;

          if (color % 2 === 0) {
            $(answerI).css({ "background-color": "#A6D49F", "color": "#2E3A2C" })
          }
          else {
            $(answerI).css({ "background-color": "#C4E1E3", "color": "#689B9F" })
          }

          // stop the color from blinking
          if (color === 0) {
            clearTimeout(correctColor);
            return false;
          }
          else {
            setTimeout(colorSwap, 250)
          }

        }
        let correctColor = setTimeout(colorSwap, 1000);
      }
      else {
        $(answerI).fadeOut("slow");
      }
    }
  }


  let resetValues = function () {
    answers = [];
    userAnswer = "";
    color = 6;
    seconds = 30;
    $($timer).text(`Time Left: ${seconds}`);
    $($answer).empty().show();
    $($question).empty();
    $($timer).css({ "background-color": "#C4A6A9", "color": "#5E0B15" })

    for (i = 0; i < 4; i++) {

      let answerI = $($answer).get(i);
      $(answerI).css({ "background-color": "#C4E1E3", "color": "#689B9F" })
    }
  }


  let newQuestion = function () {
    if (triviaQuestion < 10) {
      resetValues();
      setQuestion(triviaData);
      setAnswers(triviaData);

      questionNumber++;
      $questionNum.text(`Question ${questionNumber}/10`)

      console.log(questionNumber)
      setTimeout(countdown, 1000);
    }
    else {
      $screen2.hide();
      $answer.hide();
      endGame();
    }
  }

  let endGame = function () {
    $screen1.hide();
    $screen2.hide();
    setTimeout(function () {
      $screen3.fadeIn();
      $("button.play-again").hide();
    }, 250);

    $correctResponses.text(numberCorrect);
    $incorrectResponses.text(numberIncorrect);

    triviaQuestion = 0;
    numberCorrect = 0;
    numberIncorrect = 0;

    questionNumber = 1
    $questionNum.text(`Question ${questionNumber}/10`)

    resetValues();
  }


  let startGame = function () {

    $screen1.fadeOut();
    $screen3.fadeOut();

    setTimeout(function () {
      $screen2.fadeIn()
      timer = setTimeout(countdown, 1000);
    }, 500)

  }

  //Timer code
  let seconds = 30;

  function countdown() {

    seconds--;

    $($timer).text(`Time Left: ${seconds}`);

    if (seconds < 11) {
      $($timer).css({ "background-color": "#5E0B15", "color": "#C4A6A9" })
    }

    if (seconds === 0 || userAnswer) {
      clearTimeout(timer);
      return false;
    }
    else {
      setTimeout(countdown, 1000)
    }
  }

  let randomValue = function () {
    random = Math.floor(Math.random() * 24 + 9)
    $("option.random").val(random);
  }


  var bgImageArray = ["./assets/images/javier-grixo-p1opmw12wvk-unsplash.jpg", "./assets/images/dini_-qlUxJdtCdlU-unsplash.jpg", "./assets/images/fine-photographics-oKQfL5yCgJQ-unsplash.jpg", "./assets/images/nik-shuliahin-rkFIIE9PxH0-unsplash.jpg", "./assets/images/peter-lewicki-Wfh650C1OHU-unsplash.jpg", "./assets/images/michael-haslim-wtLNwq3cnQ8-unsplash.jpg"];
  // var bgImageArray = ["https://unsplash.com/photos/qlUxJdtCdlU", "https://unsplash.com/photos/4iknJXlUCjo"];

  // secs = 4;
  bgImageArray.forEach(function (img) {
    new Image().src = img;
    // caches images, avoiding white flash between background replacements
  });

  function backgroundSwitch() {
    k = 0;

    console.log(event.target.value);

    switch (event.target.value) {
      case "29":
        k = 1;
        break;
      case "20":
        k = 2;
        break;
      case "22":
        k = 3;
        break;
      case "13":
        k = 4;
        break;
      case "14":
        k = 5;
        break;
      default:
        k = 0;
        break;
    }

    $("body").css("background", "url('" + bgImageArray[k] + "') no-repeat center center fixed");
    $("body").css("background-size", "cover");
  }




  // events
  $("select.category-choices").on("change", function (event) {
    resetValues();
    randomValue();
    backgroundSwitch();
    queryURL = `https://opentdb.com/api.php?amount=10&category=${this.value}&type=multiple`
    getData();
    $("button.play").show();
  });

  $("select.category-choices-2").on("change", function (event) {
    resetValues();
    randomValue();
    backgroundSwitch();
    queryURL = `https://opentdb.com/api.php?amount=10&category=${this.value}&type=multiple`
    getData();
    $("button.play-again").show();
  });

  $("button.play, button.play-again").on("click", function () {
    startGame();
  });

  $("div.answer").on("click", function () {
    checkAnswer();

  });

});