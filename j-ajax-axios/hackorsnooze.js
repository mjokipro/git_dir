async function getData(token) {
    const res = await axios.get('https://hack-or-snooze-v3.herokuapp.com/',
        { params: {token}});
    console.log(res);
}

async function newUser(name, username, password) {
    const res = await axios.post('https://hack-or-snooze.herokuapp.com/users',
    {user: {name, username, password}});
        console.log(res);
}

async function login(username, password) {
    const res = await axios.post('https://hack-or-snooze.herokuapp.com/auth',
        { user: { username, password } });
    console.log(res);
    return res.data.token;
}

async function getUsersAuth() {
    const token = await login('mjoki111', 'bla123!33');
    console.log(token);
    getData(token);
}

async function createStory() {
    const token = await login('mjoki111', 'bla123!33');
    const newStory = {
        token,
        story: {
            author: 'bla',
            title: 'bla',
            url: 'http://www.bla.com'
        }
    }
    const res = await axios.post('https://hack-or-snooze.herokuapp.com/stories?skip=0&limit=10',
        newStory);
    console.log(res);
}

async function getUserTest() {
    const res = await axios.post('https://hack-or-snooze.herokuapp.com/test',)

}
// newUser('matthew', 'mjoki111', 'bla123!33');

getUsersAuth();
createStory();