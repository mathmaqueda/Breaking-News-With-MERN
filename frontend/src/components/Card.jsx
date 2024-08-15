import { MessageCircle, Heart, Edit, Trash2, HeartOff } from 'lucide-react';
import { CardBody, CardContainer, CardFooter, CardHeader } from './Card.styled.jsx';
import TextLimit from './TextLimit';
import { Link } from 'react-router-dom';

export default function Card({ id, title, text, banner, likes, comments, top, onCardClick, onLikeClick, onCommentClick, profile = false, liked = false }) {
    return (
        <CardContainer >
            <CardBody>
                <div>
                    <CardHeader $top={top}>
                        <h2>{title}</h2>
                        <TextLimit text={text} limit={top ? 300 : 150} />
                    </CardHeader>
                    <CardFooter>
                        <section onClick={onLikeClick} className="like">
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