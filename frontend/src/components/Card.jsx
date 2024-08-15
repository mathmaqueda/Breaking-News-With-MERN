import { MessageCircle, Heart, Edit, Trash2, HeartOff } from 'lucide-react';
import { CardBody, CardContainer, CardFooter, CardHeader } from './Card.styled.jsx';
import TextLimit from './TextLimit';
import { Link } from 'react-router-dom';
import Cookies from "js-cookie"
import { likeOrDislike } from '../services/news.services.js';

export default function Card({ id, title, text, banner, likes, comments, top, onCardClick, onCommentClick, fetchFunction, profile = false, liked = false }) {
    async function handleLikeOrDislike() {
        if (!profile) {
            try {
                if (!Cookies.get("token")) {
                    window.alert("Faça login para curtir ou comentar.");
                    return
                }

                await likeOrDislike(id);
                fetchFunction();
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    window.alert(error.response.data.message);
                } else {
                    console.error("Erro ao curtir:", error);
                }
            }
        }
    }

    return (
        <CardContainer >
            <CardBody>
                <div>
                    <CardHeader $top={top}>
                        <h2>{title}</h2>
                        <TextLimit text={text} limit={top ? 300 : 150} />
                    </CardHeader>
                    <CardFooter>
                        <section onClick={handleLikeOrDislike} className="like">
                            <i>{liked ? (<HeartOff/>) : (<Heart />)}</i>
                            <span>{likes?.length} {!profile && (likes?.length === 1 ? "Curtida" : "Curtidas")}</span>
                        </section>
                        <section className='comment' onClick={onCommentClick}>
                            <i><MessageCircle /></i>
                            <span>{comments?.length} {!profile && (comments?.length === 1 ? "Comentário" : "Comentários")}</span>
                        </section>
                        {profile && (
                            <>
                                <i className='edit'><Link to={`/manage-news/edit/${id}`}><Edit /></Link></i>
                                <i className='edit'><Link to={`/manage-news/delete/${id}`}><Trash2 /></Link></i>
                            </>
                        )}
                    </CardFooter>
                </div>
                <img src={banner} alt="Imagem" onClick={onCardClick} />
            </CardBody>
        </CardContainer>
    );
}