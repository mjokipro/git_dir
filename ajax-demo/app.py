"""Demonstration backend for AJAX."""

import random
from flask import Flask, request, render_template
from flask import jsonify

SUITS = ["Hearts", "Spades", "Diamonds", "Clubs"]
RANKS = ["Ace", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
         "Eight", "Nine", "Ten", "Jack", "Queen", "King"]

app = Flask(__name__)


@app.route("/ajax")
def index():
    """Homepage."""

    return render_template("index.html")


@app.route("/api/card")
def get_random_card():
    """Return a single random card as a string."""

    rank = random.choice(RANKS)
    suit = random.choice(SUITS)
    return f"<b>{rank}</b> of <b>{suit}</b>" 


@app.route("/api/hand")
def get_random_hand():
    """Return a random hand as json."""

    ncards = int(request.args.get("ncards", 5))
    hand = []

    while len(hand) < ncards:
        card = {"rank": random.choice(RANKS), 
                "suit": random.choice(SUITS)}  
        if card not in hand:
            hand.append(card)

    return jsonify(hand=hand)


@app.route("/api/borrow", methods=["POST"])
def borrow_money():
    """Borrow money (pretend POST request)"""

    amt = request.json.get("amount")
    print(f"\n\n*** BORROWED {amt}\n\n")

    return f"{amt} Borrowed"

# TRADITIONAL (NON-AJAX) VERSIONS


@app.route("/trad")
def trad_index():
    """Homepage."""

    return render_template("trad.html")

@app.route("/card")
def trad_get_random_card():
    """Return a single random card as page."""

    rank = random.choice(RANKS)
    suit = random.choice(SUITS)
    return render_template("card.html", rank=rank, suit=suit)


@app.route("/borrow", methods=["POST"])
def trad_borrow_money():
    """Borrow money (pretend POST request)"""

    amt = request.form.get("amount")
    return render_template("borrowed.html", amount=amt)

app.run(debug=True)
