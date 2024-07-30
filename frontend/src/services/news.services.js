import axios from 'axios';
import Cookies from 'js-cookie';
  
const baseURL = "http://localhost:3000";
  
export function getAllNews() {
    const res = axios.get(`${baseURL}/news`);
    return res;
} 
  
export function getTopNews() {
    const res = axios.get(`${baseURL}/news/top`);
    return res;
}

export function searchNews(title) {
    const res = axios.get(`${baseURL}/news/search?title=${title}`);
    return res;
} 

export function getAllNewsByUser() {
    const res = axios.get(`${baseURL}/news/byUser`, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    });
    console.log(res);
    return res;
}

export function createNews(body) {
    const res = axios.post(`${baseURL}/news`, body, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    });
    return res;
}

export function getNewsById(id) {
    const res = axios.get(`${baseURL}/news/${id}`, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    });
    return res;
}