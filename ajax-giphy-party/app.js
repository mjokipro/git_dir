const form = document.querySelector('#form');
const input = document.getElementById('textIn');
const container = document.querySelector('#container');

form.addEventListener('submit', (e) => { 
    e.preventDefault();
    getData(input)
});

async function getData(input) {

        const res = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=IpRkUyJTt0q4cP7LIvCXPHHDVHVSliSW&q="${input.value}"`);
        console.log(res.data.data[0].images['480w_still'].url);

        const newImg = document.createElement('img');
        newImg.src = res.data.data[0].images['480w_still'].url;
    
        newImg.classList.add('new-img');

        container.appendChild(newImg);
}

function handleEvent(e) {
    e.preventDefault();
    if (e.target.classList.contains('new-img')) e.target.remove();
}

container.addEventListener('click', handleEvent);

const btn = document.getElementById('button');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    const arr = document.querySelectorAll('img');
    for (let img of arr) {
        if (img.classList.contains('new-img')) {
            img.remove();
        }
    }
});



// async function getData(token) {
//     const res = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=IpRkUyJTt0q4cP7LIvCXPHHDVHVSliSW&q=${token}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`,
//         { params: {token}});
//     console.log(res);
// }
    
// "https://giphy.com/gifs/1hqb8LwPS2xCNCpWH8"

// &q=${input}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips