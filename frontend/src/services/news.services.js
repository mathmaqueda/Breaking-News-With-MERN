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

export function editNews(body, id) {
    const res = axios.patch(`${baseURL}/news/${id}`, body, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    });
    return res;
}

export function deleteNews(id) {
    const res = axios.delete(`${baseURL}/news/${id}`, {
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



export function addComment(body, id) {
    const res = axios.patch(`${baseURL}/news/comment/${id}`, body, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    });
    return res;
}

export function deleteComment(newsId, commentId) {
    const res = axios.patch(`${baseURL}/news/comment/${newsId}/${commentId}`, null, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    });
    return res;
}

export function likeOrDislike(id) {
    const res = axios.patch(`${baseURL}/news/like/${id}`, null, {
        headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
        }
    });
    return res;
}