async function getRandomDog() {
    const res = await axios.get('https://dog.ceo/api/breeds/image/random');
    console.log(res.data);
    const img = document.querySelector('img');
    img.src = res.data.message;
}

async function getDogBreed(breed) {
    try {
        const url = `https://dog.ceo/api/breed/${breed}/images/random`;
        const res = await axios.get(url);
        const img = document.querySelector('#dog');
        img.src = res.data.message;
    } catch (e) {
        console.log(e);
        alert('Breed not found');
    }
}

const form = document.querySelector('#form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getDogBreed(document.querySelector('#textIn').value);
    console.log('this code runs first');
    document.querySelector('#textIn').value = '';
})
 