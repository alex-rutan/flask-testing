"use strict";

const $playedWords = $("#words");
const $form = $("#newWordForm");
const $wordInput = $("#wordInput");
const $message = $(".msg");
const $table = $("table");

let gameId;


/** Start */

async function start() {
  let response = await axios.get("/api/new-game");
  gameId = response.data.gameId;
  let board = response.data.board;

  displayBoard(board);
}

/** Display board */

function displayBoard(board) {
  // $table.empty();
  // loop over board and create the DOM tr/td structure
}

start();



$(".word-input-btn").on("click", checkWord)

async function checkWord(evt) {
  evt.preventDefault();

  let word = $wordInput.val()
  let response = await axios.post("/api/score-word", {"game_id": gameId, "word": word});
  console.log(response);
  return response;
  

}