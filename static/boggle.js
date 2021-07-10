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




/** Prevents form from reloading, so we can use AJAX to send post request.
 * Sends back response.data to the server.
 */

async function checkWord(evt) {
  evt.preventDefault();

  let word = $wordInput.val()
  let response = await axios.post("/api/score-word", {"game_id": gameId, "word": word});
  return response.data;
}

/** Click handler for the add-word button*/

$(".word-input-btn").on("click", checkWord)


start();