/* show ajax result directly in card box */

async function getCard() {
  let response = await axios.get(
    "/api/card");

  console.log("getCard resp=", response);
  $("#card").html(response.data);
}

$("#card-btn").on("click", getCard);