
import axios from 'axios';

const registerNewUser = (email, phone, username, password) => {
    return axios.post('http://localhost:8888/api/v1/create', {
        email, phone, username, password
    })
        .then((res) => res.data)
        .catch()
}

const userLogin = (keyLogin, password) => {
    return axios.post('http://localhost:8888/api/v1/login', {
        keyLogin,
        password
    })
        .then((res) => res.data)
        .catch()
}

export { registerNewUser, userLogin }