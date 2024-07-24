import { MessageCircle, Heart } from 'lucide-react';
import { CardBody, CardContainer, CardFooter } from './Card.styled';
import TextLimit from './TextLimit';

export default function Card({ title, text, banner, likes, comments }) {
    return (
        <CardContainer>
            <CardBody>
                <div>
                    <h2>{title}</h2>
                    <img src={banner} alt="Imagem" />
                </div>
                <TextLimit text={text} limit={150}/>
            </CardBody>

            <CardFooter>
                <div>
                    <i><Heart /></i>
                    <span>{likes}</span>
                </div>

                <div>
                    <i><MessageCircle /></i>
                    <span>{comments}</span>
                </div>
            </CardFooter>
        </CardContainer>
    );
}