const firstReq = new XMLHttpRequest();
firstReq.addEventListener('load', function () {
  const data = JSON.parse(this.responseText);
  for (let planet of data.results) {
    console.log(planet.name)
  }
  const nextUrl = data.next;
  const secondReq = new XMLHttpRequest();
  secondReq.addEventListener('load', function () {
    console.log("SUCCESS!");
    const data = JSON.parse(this.responseText);
    for (let planet of data.results) {
      console.log(planet.name)
    }
  });
  secondReq.addEventListener('error', function () {
    console.log("ERROR!")
  });
  secondReq.open('GET', nextUrl);
  secondReq.send();
  console.log("JUST SENT 2nd REQUEST....")


});
firstReq.addEventListener('error', () => {
  console.log('ERROR!!!!!!');
});
firstReq.open('GET', 'https://swapi.dev/api/planets/');
firstReq.send();
console.log("SENDING REQUEST......")
