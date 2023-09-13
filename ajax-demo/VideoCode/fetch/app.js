async function getDogByBreed(breed) {
  try {
    const url = `https://dog.ceo/api/breed/${breed}/images/random`;
    const res = await fetch(url);
    if (res.status !== 200) throw new Error(res.status)
    const data = await res.json();
    console.log(data);
  } catch (e) {
    alert("BREED NOT FOUND!");
  }
}
