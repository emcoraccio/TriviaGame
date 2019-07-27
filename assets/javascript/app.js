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
  let triviaQuestion = 0;
  let userAnswer;
  let instance = M.FormSelect.getInstance("option");


  // jquery variables
  let $screen1 = $("section.screen1");
  let $screen2 = $("section.screen2");
  let $screen3 = $("section.screen3");

  let $timer = $("p.countdown");

  let $question = $("div.question");
  let $answer = $("div.answer")
  let $answer1 = $("div.answer1");
  let $answer2 = $("div.answer2");
  let $answer3 = $("div.answer3");
  let $answer4 = $("div.answer4");



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

      setQuestion();
      setAnswers();
    });
  }


  let setQuestion = function () {
    thisQuestion = triviaData[triviaQuestion].question
    let $p = $("<p>").html(thisQuestion)
    $($question).append($p);
  }


  let setAnswers = function () {
    correctAnswer = decodeURI(triviaData[triviaQuestion].correct_answer);
    console.log(correctAnswer);
    answers.push(correctAnswer);

    triviaData[triviaQuestion].incorrect_answers.forEach(el => {
      answers.push(el)
      console.log(answers);
    })

    shuffle(answers);
    let answer1 = $("<p>").text(answers[0]);

    $($answer1).html(answers[0]);
    $($answer2).html(answers[1]);
    $($answer3).html(answers[2]);
    $($answer4).html(answers[3]);

  }


  let checkAnswer = () => {
    if (!userAnswer) {
      userAnswer = event.target.textContent;

      if (userAnswer === correctAnswer) {
        $(event.target).css({ "background-color": "#A6D49F", "color": "#2E3A2C" })

      }
      else {
        $(event.target).css({ "background-color": "#5E0B15", "color": "#1A0306" })

        setTimeout(showCorrect, 500);

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
    if(triviaQuestion < 9) {
      resetValues();
      setQuestion();
      setAnswers();
      setTimeout(countdown, 1000);
    }
  }


  let startGame = function () {
    $($screen1, $screen3).fadeOut();

    setTimeout(function () {
      $($screen2).fadeIn()
      timer = setTimeout(countdown, 1000);
    }, 1000)

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

  // events
  $("select.category-choices").on("change", function (event) {
    resetValues();
    queryURL = `https://opentdb.com/api.php?amount=10&category=${this.value}&type=multiple`
    getData();
    $("button.play").show();
  });

  $("button.play").on("click", function () {
    startGame();
  });

  $("div.answer").on("click", function () {
    checkAnswer();

  });

});