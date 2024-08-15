import { useParams } from 'react-router-dom';
import { searchNews } from '../../services/news.services';
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
                        id={item.id}
                        title={item.title}
                        text={item.text}
                        banner={item.banner}
                        likes={item.likes}
                        comments={item.comments}
                        onCardClick={() => openNewsModal(item, false)}
                        liked={
                            Array.isArray(item.likes) &&
                            item.likes.find(like => like.userId === userLogged) 
                                ? true 
                                : false
                        }
                        fetchFunction={search}
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