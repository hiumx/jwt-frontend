
import axios from '../config/axios';

const registerNewUser = async (email, phone, username, password) => {
    return await axios.post('/api/v1/register', {
        email, phone, username, password
    })
}

const userLogin = async (keyLogin, password) => {
    return await axios.post('/api/v1/login', {
        keyLogin,
        password
    })
}

// User

const getAllUsers = async (page, limit) => {
    return await axios.get(`/api/v1/users?page=${page}&limit=${limit}`)
}

const getUserById = async (id) => {
    return await axios.get(`/api/v1/users/${id}`)
}

const createUser = async (userData) => {
    return await axios.post('/api/v1/users', userData)
}

const updateUser = async (id, userData) => {
    return await axios.patch(`/api/v1/users/${id}`, userData)
}

const deleteUser = async (id) => {
    return await axios.delete(`/api/v1/users/${id}`)
}

// Group user
const getAllGroupUser = async () => {
    return await axios.get('/api/v1/group-user/all')
}

export { registerNewUser, userLogin, getAllUsers, getUserById, createUser, updateUser, deleteUser }
export { getAllGroupUser }