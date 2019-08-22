# TriviaGame

## Game Play
* Users are given an option to choose which category of trivia they would like to play with
* A random category is also an option if users would rather have it be picked for them
 ** Random categories are chosen from the full list of available categories on the opentdb website
* Some categories have their own special background which eases in when they are chosen
* 20 seconds are given for each question to be answered, if incorrect or time runs out, the correct answer will be displayed

## Design

* This game pulls data from the opentdb API to generate its questions and answers
* It uses jquery for all dom manipulation and events
* Answers are shuffled each question

## Functions

#### Functions Include but are not limited to:

* getData
* shuffle
* setQuestion
* setAnswers
* checkAnswer
* showCorrect
* resetValues
* endGame

## Where to Play

https://emcoraccio.github.io/TriviaGame/