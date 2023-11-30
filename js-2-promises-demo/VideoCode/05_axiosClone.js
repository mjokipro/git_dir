function get(url) {
  const request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.onload = function () {
      if (request.readyState !== 4) return;

      // Check status code
      if (request.status >= 200 && request.status < 300) {
        resolve({
          data: JSON.parse(request.response),
          status: request.status,
          request: request,
        })
      } else {
        reject({
          msg: 'Server Error',
          status: request.status,
          request: request
        })
      }
    }
    request.onerror = function handleError() {
      reject({
        msg: 'NETWORK ERROR!'
      })
    };
    request.open('GET', url);
    request.send();
  })
}

get('https://pokeapi.co/api/v2/pokemon/3')
  .then(res => {
    console.log(res)
    return get('https://swapi.dev/api/planets/2/')
  })
  .then(res => console.log(res))
  .catch(err => console.log(err))
