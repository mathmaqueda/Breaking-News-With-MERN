import { MessageCircle, Heart } from 'lucide-react';
import { CardBody, CardContainer, CardFooter, CardHeader } from './Card.styled';
import TextLimit from './TextLimit';

export default function Card({ title, text, banner, likes, comments, top }) {
    return (
        <CardContainer>
            <CardBody top={top}>
                <div>
                    <CardHeader>
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
                    </CardFooter>
                </div>
                <img src={banner} alt="Imagem" />
            </CardBody>
        </CardContainer>
    );
}