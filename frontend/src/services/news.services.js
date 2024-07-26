import axios from 'axios';
  
const baseURL = "http://localhost:3000";
  
export function getAllNews() {
    const res = axios.get(`${baseURL}/news`);
    return res;
} 
  
export function getTopNews() {
    const res = axios.get(`${baseURL}/news/top`);
    return res;
} 