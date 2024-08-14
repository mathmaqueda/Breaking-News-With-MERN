import { useState, useEffect } from 'react';
import Card from "../../components/Card";
import { getAllNews, getTopNews } from "../../services/news.services";
import { HomeBody, HomeHeader } from "./Home.styled";
import NewsModal from '../../components/NewsModal';

export default function Home() {
    const [news, setNews] = useState([]);
    const [topNews, setTopNews] = useState([]);
    const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [scrollToComments, setScrollToComments] = useState(false);

    function openNewsModal(news, shouldScrollToComments = false) {
        setScrollToComments(shouldScrollToComments);
        setSelectedNews(news);
        setIsNewsModalOpen(true);
    }

    function closeNewsModal() {
        setIsNewsModalOpen(false);
    }

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
                    onCardClick={() => openNewsModal(topNews, false)}
                    onCommentClick={() => openNewsModal(topNews, true)}
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
                        onCardClick={() => openNewsModal(item, false)}
                        onCommentClick={() => openNewsModal(item, true)}
                    />
                ))}
            </HomeBody>

            {isNewsModalOpen && (
                <NewsModal news={selectedNews} isOpen={isNewsModalOpen} scrollToComments={scrollToComments} closeNewsModal={closeNewsModal} />
            )}
        </>
    );
}