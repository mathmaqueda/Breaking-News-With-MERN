import PropTypes from 'prop-types';
import { MessageCircle, Heart } from 'lucide-react';
import { CardBody, CardContainer, CardFooter } from './Card.styled';

export default function Card({ news }) {
    return (
        <CardContainer>
            <CardBody>
                <div>
                    <h2>{news.title}</h2>
                    <p>{news.text}</p>
                </div>
                <img src={news.image} alt="Imagem" />
            </CardBody>

            <CardFooter>
                <div>
                    <i><Heart /></i>
                    <span>{news.likes}</span>
                </div>

                <div>
                    <i><MessageCircle /></i>
                    <span>{news.comments}</span>
                </div>
            </CardFooter>
        </CardContainer>
    );
}

Card.propTypes = {
    news: PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      comments: PropTypes.number.isRequired,
    }).isRequired,
  };