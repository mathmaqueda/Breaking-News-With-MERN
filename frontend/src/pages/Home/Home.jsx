import { useState, useEffect } from 'react';
import Card from "../../components/Card";
import { getAllNews, getTopNews } from "../../services/news.services";
import { HomeBody, HomeHeader } from "./Home.styled";

export default function Home() {

    const [news, setNews] = useState([]);
    const [topNews, setTopNews] = useState([]);

    async function findNews() {
        const newsResponse = await getAllNews();
        setNews(newsResponse.data.results);

        const topNewsResponse = await getTopNews();
        setTopNews(topNewsResponse.data.news);
    }

    useEffect(() => {
        findNews();
    }, []);

    return (
        <>
            <HomeHeader>
                <Card
                    top={true}
                    title={topNews.title}
                    text={topNews.text}
                    banner={topNews.banner}
                    likes={topNews.likes}
                    comments={topNews.comments}
                />
            </HomeHeader>
            <HomeBody>
                {news.slice(1).map((item) => (
                    <Card
                        key={item.id}
                        title={item.title}
                        text={item.text}
                        banner={item.banner}
                        likes={item.likes}
                        comments={item.comments}
                    />
                ))}
            </HomeBody>
        </>
    );
}