import { useParams } from 'react-router-dom';
import { likeOrDislike, searchNews } from '../../services/news.services';
import { useEffect, useState } from 'react';
import { ContainerResults, SearchNews, TextResults } from './Search.styled';
import Card from "../../components/Card";
import Cookies from "js-cookie";
import NewsModal from '../../components/NewsModal';

export default function Search() {
    const { title } = useParams();
    const [news, setNews] = useState([]);
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

    async function search() {
        try {
            const newsApi = await searchNews(title);
            setNews(newsApi.data.results);
        } catch (err) {
            console.log(err);
            setNews([]);
        }
    }

    async function handleLikeOrDislike(newsId) {
        try {
            if (!Cookies.get("token")) {
                window.alert("Faça login para curtir ou comentar.");
                return
            }
            await likeOrDislike(newsId);
            search();
        } catch (error) {
            if (error.response && error.response.status === 401) {
                window.alert(error.response.data);
            } else {
                console.error("Erro ao curtir:", error);
            }
        }
    }

    useEffect(() => {
        search();
    }, [title]);

    return (
        <ContainerResults>
            <TextResults>
                <span>
                    {news.length 
                    ? `Encontramos ${news.length} ${news.length > 1 ? 'resultados' : 'resultado'} para:` 
                    : "Não encontramos resultados para:"}
                </span>
                <h2>{title}</h2>
            </TextResults>

            <SearchNews>
                {news.map((item) => {
                    return <Card
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
                })}
            </SearchNews>

            {isNewsModalOpen && (
                <NewsModal updateNews={search} news={selectedNews} isOpen={isNewsModalOpen} scrollToComments={scrollToComments} closeNewsModal={closeNewsModal} />
            )}
        </ContainerResults>
    );
}