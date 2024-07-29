import axios from 'axios';

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

function generateUserName(name) {
    const withoutSpaces = name.replace(/\s/g, "").toLowerCase();
    const randomNumber = Math.floor(Math.random() * 1000);
    return `${withoutSpaces}-${randomNumber}`;
}