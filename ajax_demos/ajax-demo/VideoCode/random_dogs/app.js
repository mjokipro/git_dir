async function getRandomDog() {
  const res = await axios.get('https://dog.ceo/api/breeds/image/random');
  console.log(res.data);
  const img = document.querySelector("#dog");
  img.src = res.data.message;
}

async function getDogByBreed(breed) {
  try {
    const url = `https://dog.ceo/api/breed/${breed}/images/random`;
    const res = await axios.get(url);
    const img = document.querySelector("#dog");
    img.src = res.data.message;
  } catch (e) {
    alert("BREED NOT FOUND!");
    getRandomDog();
  }
}

const form = document.querySelector('#searchform');
form.addEventListener("submit", function (e) {
  const input = document.querySelector('#search');
  e.preventDefault();
  getDogByBreed(input.value);
  input.value = '';
})