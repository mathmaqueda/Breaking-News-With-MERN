import { useState, useEffect } from 'react';
import Card from "../../components/Card";
import { getAllNews, getTopNews, likeOrDislike } from "../../services/news.services";
import { HomeBody, HomeHeader } from "./Home.styled";
import NewsModal from '../../components/NewsModal';
import Cookies from "js-cookie";

export default function Home() {
    const [news, setNews] = useState([]);
    const [topNews, setTopNews] = useState([]);
    const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [scrollToComments, setScrollToComments] = useState(false);
    const userLogged = Cookies.get("userId");

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

    async function handleLikeOrDislike(newsId) {
        try {
            if (!Cookies.get("token")) {
                window.alert("Faça login para curtir ou comentar.");
                return
            }
            await likeOrDislike(newsId);
            findNews();
        } catch (error) {
            if (error.response && error.response.status === 401) {
                window.alert(error.response.data);
            } else {
                console.error("Erro ao curtir:", error);
            }
        }
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
                    onLikeClick={() => handleLikeOrDislike(topNews.id)}
                    liked={
                        Array.isArray(topNews.likes) &&
                        topNews.likes.find(like => like.userId === userLogged) 
                            ? true 
                            : false
                    }
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
                        onLikeClick={() => handleLikeOrDislike(item.id)}
                        liked={
                            Array.isArray(item.likes) &&
                            item.likes.find(like => like.userId === userLogged) 
                                ? true 
                                : false
                        }
                        onCommentClick={() => openNewsModal(item, true)}
                    />
                ))}
            </HomeBody>

            {isNewsModalOpen && (
                <NewsModal updateNews={findNews} news={selectedNews} isOpen={isNewsModalOpen} scrollToComments={scrollToComments} closeNewsModal={closeNewsModal} />
            )}
        </>
    );
}