import { useState, useEffect } from 'react';
import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { getAllNews } from "../../services/news.services";
import { HomeBody } from "./Home.styled";

export default function Home() {

    const [news, setNews] = useState([]);

    async function findAllNews() {
        const res = await getAllNews();
        setNews(res.data.results);
    }
    
    useEffect(() => {
        findAllNews();
        console.log(news);
    }, []);

    return (
        <>
            <Navbar />
            <HomeBody>
                {news.map((item) => {
                    return <Card key={item.id} title={item.title} text={item.text} banner={item.banner} likes={item.likes.length} comments={item.comments.length}  />
                })}
            </HomeBody>
        </>
    );
}