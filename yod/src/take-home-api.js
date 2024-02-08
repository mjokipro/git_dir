import axios from 'axios'

class Api {
    static async register(data){
        const userData = {...data,['state']: 'active'}
        const newUser = await axios.post('http://localhost:4000/users/',data)
        console.log(newUser.data)
    }

    static async getAllUsers(){
        const users = await axios.get('http://localhost:4000/users/')
        console.log(users)
        console.log("call")
        return users.data
    }

    static async getUser(id){
        const user = await axios.get(`http://localhost:4000/users/${id}`)
        return user.data
    }
}

export default Api;