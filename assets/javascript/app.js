$(document).ready(function() {

  // global variables
  let queryURL;
  let triviaData;
  let answers;



  // initializing category choice
  $('select').formSelect();
  let instance = M.FormSelect.getInstance("option");
  console.log(instance);


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

  // retrieving data from the API


  $("select.category-choices").on("change", function(event) {
    console.log(this.value);
    let setURL = () => {
      queryURL = `https://opentdb.com/api.php?amount=10&category=${this.value}&type=multiple`
    }
    setURL();
    console.log(queryURL);
  })
  

  let getData = function() {
    $.get(queryURL).then(function(response){
      triviaData = response.results;
    });
  }



  // setting question data
  let setQuestion = function() {
    for (i = 0; i < triviaData.length; i++){

    }
  }

  



  // $("h1.title").text(`${category} TRIVIA`)



  //Timer code
  let seconds = 30;
  
  function countdown() {
  
    seconds--;
    // console.log(seconds);
  
    $("p.countdown").text(`Time Left: ${seconds}`);
  
    if (seconds === 0) {
      clearTimeout(timer);
      return false;
    }
    else {
      setTimeout(countdown, 1000)
    }
  
  
  }
  const timer = setTimeout(countdown, 1000);


})




