import { MessageCircle, Heart, Edit, Trash2 } from 'lucide-react';
import { CardBody, CardContainer, CardFooter, CardHeader } from './Card.styled.jsx';
import TextLimit from './TextLimit';
import { Link } from 'react-router-dom';

export default function Card({ id, title, text, banner, likes, comments, top, actions=false }) {
    return (
        <CardContainer>
            <CardBody>
                <div>
                    <CardHeader $top={top}>
                        <h2>{title}</h2>
                        <TextLimit text={text} limit={top ? 300 : 150} />
                    </CardHeader>
                    <CardFooter>
                        <section>
                            <i><Heart /></i>
                            <span>{likes?.length}</span>
                        </section>
                        <section>
                            <i><MessageCircle /></i>
                            <span>{comments?.length}</span>
                        </section>
                        {actions && (
                            <>
                                <i className='edit'><Link to={`/manage-news/edit/${id}`}><Edit/></Link></i>
                                <i className='edit'><Link to={`/manage-news/delete/${id}`}><Trash2/></Link></i>
                            </>
                        )}
                    </CardFooter>
                </div>
                <img src={banner} alt="Imagem" />
            </CardBody>
        </CardContainer>
    );
}