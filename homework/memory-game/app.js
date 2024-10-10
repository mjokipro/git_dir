// code by Colt Steele, Springboard teacher
// code explained by Colt Steele; code in handleCardClick 
// explained by Matthew Joki

const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// for each click on card
function handleCardClick(e) {
  // prevent re-clicking on same card
  if (noClicking) return;
  if (e.target.classList.contains("flipped")) return;

  // assign clicked card to var
  let currentCard = e.target;
  // assign current color to currentCard
  currentCard.style.backgroundColor = currentCard.classList[0];

  // check for not null
  if (!card1 || !card2) {
    // currentCard.classList.add("flipped");

    // if card1 null, use currentCard
    card1 = card1 || currentCard;
    // check second card (currentCard2) same as card1, use currCard, else null
    card2 = currentCard === card1 ? null : currentCard;
  }
  // if 2 cards clicked
  if (card1 && card2) {
    noClicking = true;
    // debugger
    let gif1 = card1.className;
    let gif2 = card2.className;

    // if both classnames match
    if (gif1 === gif2) {
      // add 2 to count
      cardsFlipped += 2;
      // remove click listeners and divs
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      // reset card vars back to null for next round
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      // if cards not match, after 1 second, reset background color back to empty
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        // card1.classList.remove("flipped");
        // card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    }
  }
// when all cards flipped, game over
  if (cardsFlipped === COLORS.length) alert("game over!");
}

createDivsForColors(shuffledColors);
