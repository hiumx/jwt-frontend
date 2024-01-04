
import axios from 'axios';

const registerNewUser = (email, phone, username, password) => {
    return axios.post('http://localhost:8888/api/v1/register', {
        email, phone, username, password
    })
        .then(res => res.data)
        .catch()
}

const userLogin = (keyLogin, password) => {
    return axios.post('http://localhost:8888/api/v1/login', {
        keyLogin,
        password
    })
        .then(res => res.data)
        .catch()
}

const getAllUsers = async (page, limit) => {
    const res = await axios.get(`http://localhost:8888/api/v1/users/get-all?page=${page}&limit=${limit}`)
    return res.data.responseData;
}

export { registerNewUser, userLogin, getAllUsers}