const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";


async function getReq() {
    const req = await axios.get('https://reqres.in/api/users');
    console.log(req);
}

async function createReq() {
    const req = await axios.post('https://reqres.in/api/users',
        { username: 'trent reznor', email: 'g@g.com', age: 78 });
    getReq();
    console.log(req);
}

createReq();