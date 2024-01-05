
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

// User

const getAllUsers = async (page, limit) => {
    const res = await axios.get(`http://localhost:8888/api/v1/users/get-all?page=${page}&limit=${limit}`)
    return res.data.responseData;
}

const getUserById = async (id) => {
    const res = await axios.get(`http://localhost:8888/api/v1/users/${id}`)
    return res.data.responseData;
}

const createUser = async (userData) => {
    return await axios.post('http://localhost:8888/api/v1/users', userData)
}

const updateUser = async (id, userData) => {
    return await axios.patch(`http://localhost:8888/api/v1/users/${id}`, userData)
}

const deleteUser = async (id) => {
    return await axios.delete(`http://localhost:8888/api/v1/users/${id}`)

}

// Group user
const getAllGroupUser = async () => {
    const res = await axios.get('http://localhost:8888/api/v1/group-user/all');
    return res.data.responseData;
}


export { registerNewUser, userLogin, getAllUsers, getUserById, createUser, updateUser, deleteUser }
export { getAllGroupUser }