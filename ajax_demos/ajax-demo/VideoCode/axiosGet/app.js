async function getJoke(firstName, lastName) {
  let res = await axios.get(`http://api.icndb.com/jokes/random`, { params: { firstName, lastName } });
  console.log(res.data.value.joke);
}

getJoke("Butters", "Steele")