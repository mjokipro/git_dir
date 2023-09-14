const form = document.querySelector('#form');
const input = document.querySelector('#textIn').value;
const container = document.querySelector('#container');

form.addEventListener('submit', (e) => { 
    e.preventDefault();
    getData(input)
});

async function getData(input) {
        const res = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=IpRkUyJTt0q4cP7LIvCXPHHDVHVSliSW&q=${input}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`);
        console.log(res);

        const newImg = document.createElement('img');
        newImg.src = res.data[0].url;

        container.appendChild(newImg);
}
    
"https://giphy.com/gifs/1hqb8LwPS2xCNCpWH8"