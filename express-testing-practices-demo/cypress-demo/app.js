document.addEventListener("DOMContentLoaded", function() {
  var form = document.querySelector("#meme-form");
  var container = document.querySelector(".container");

  form.addEventListener("submit", handleSubmit);
  container.addEventListener("click", handleRemove);

  function handleSubmit(e) {
    e.preventDefault();

    // grab values from form
    var imageUrl = e.target.image.value;
    var textAbove = e.target.text_above.value;
    var textBelow = e.target.text_below.value;

    // add card for meme
    addMeme(imageUrl, textAbove, textBelow);

    // reset form
    e.target.reset();
  }

  function addMeme(imageUrl, textAbove, textBelow) {
    var memeRow = document.querySelector(".container > .row");

    // build HTML structure for new meme
    var memeWrapper = document.createElement("div");
    memeWrapper.classList.add("col-md-6", "col-12");

    var newMeme = document.createElement("div");
    newMeme.classList.add("meme");
    memeWrapper.appendChild(newMeme);

    var overlay = document.createElement("div");
    overlay.classList.add("overlay");
    newMeme.appendChild(overlay);

    var x = document.createElement("span");
    x.classList.add("oi", "oi-x");
    overlay.appendChild(x);

    var pAbove = document.createElement("p");
    pAbove.innerText = textAbove;
    newMeme.appendChild(pAbove);

    var img = document.createElement("img");
    img.src = imageUrl;
    newMeme.appendChild(img);

    var pBelow = document.createElement("p");
    pBelow.innerText = textBelow;
    newMeme.appendChild(pBelow);

    // append new meme to DOM
    memeRow.appendChild(memeWrapper);
  }

  function handleRemove(e) {
    if (e.target.classList.contains("overlay")) {
      e.target.parentElement.parentElement.remove();
    }
  }
});
