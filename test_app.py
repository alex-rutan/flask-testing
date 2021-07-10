from unittest import TestCase

from flask import json

from app import app, games

from boggle import BoggleGame

# Make Flask errors be real errors, not HTML pages with error info
app.config['TESTING'] = True

# This is a bit of hack, but don't use Flask DebugToolbar
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']


class BoggleAppTestCase(TestCase):
    """Test flask app of Boggle."""

    def setUp(self):
        """Stuff to do before every test."""

        self.client = app.test_client()
        app.config['TESTING'] = True

    def test_homepage(self):
        """Make sure information is in the session and HTML is displayed"""

        with self.client as client:
            response = client.get('/')
            html = response.get_data(as_text=True)

            # test that you're getting a template
            self.assertIn('<button class="word-input-btn">Go</button>', html)

    def test_api_new_game(self):
        """Test starting a new game."""

        with self.client as client:
            response = client.get('/api/new-game')
            data = response.get_data(as_text=True)
            response_json_parsed = json.loads(data)

            self.assertTrue(response_json_parsed["gameId"])
            self.assertTrue(response_json_parsed["board"][0][0])
            self.assertTrue(games[response_json_parsed["gameId"]])

    def test_score_word(self):
        """"""

        game = BoggleGame()
        game.board[0] = ["C", "A", "T", "A", "B"]
        games["test_game_id"] = game
        word = "CAT"

        with self.client as client:
            response = client.post(
                "/api/score-word", json={'game_id': "test_game_id", 'word': word})

            self.assertTrue(game.check_word_on_board(word))
