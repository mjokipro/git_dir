/* show result of hand in box */

function showHand(hand) {
  let $box = $("#hand");
  $box.empty();

  for (let {rank, suit} of hand) {
    let t = `<p>${rank} of ${suit}</p>`;
    $box.append($(t));
  }
}

async function getHand() {
  let ncards = Number($("#ncards").val());

  let response = await axios.get(
    "/api/hand", { params: { ncards } });

  console.log("getHand resp=", response);
  showHand(response.data.hand);
}

$("#hand-btn").on("click", getHand);