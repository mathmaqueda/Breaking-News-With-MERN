import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = "http://localhost:3000";

export function signup(data) {
    delete data.confirmPassword;
    const body = {
        ...data, 
        username: generateUserName(data.name), 
        avatar: "https://i.imgur.com/xmI2QAo.jpg", 
        background: "https://i.imgur.com/XbRg9D7.png"
    }
    const res = axios.post(`${baseURL}/user`, body);
    return res;
}

export function signin(data) {
    const res = axios.post(`${baseURL}/auth`, data);
    return res;
}

export function userLogged() {
    const response = axios.get(`${baseURL}/user/${Cookies.get('userId')}`, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    });
    return response;
}

function generateUserName(name) {
    const withoutSpaces = name.replace(/\s/g, "").toLowerCase();
    const randomNumber = Math.floor(Math.random() * 1000);
    return `@${withoutSpaces}${randomNumber}`;
}

export function editUser(body, id) {
    const res = axios.patch(`${baseURL}/user/${id}`, body, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    });
    return res;
}

export function deleteUser(id) {
    const res = axios.delete(`${baseURL}/user/erase/${id}`, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    });
    return res;
}

export function editPassword(body, id) {
    const res = axios.patch(`${baseURL}/user/updatePassword/${id}`, body, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    });
    return res;
}

export function findUserById(id) {
    const response = axios.get(`${baseURL}/user/${id}`);
    return response;
}