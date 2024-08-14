import { Heart, MessageCircle, SendHorizontal, X } from "lucide-react";
import { Comments, ModalContainer, ModalContent, NewsBody, NewsStatus } from "./NewsModal.styled";
import { useEffect, useRef, useState } from "react";
import { findUserById } from "../services/user.services";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../Schemas/userSchema.js";
import { ResponseSpan } from "./Navbar.styled.jsx";

export default function NewsModal({ news, isOpen, closeNewsModal, scrollToComments }) {
    const [commentUsers, setCommentUsers] = useState([]);
    const modalRef = useRef();
    const commentsRef = useRef();

    const {
        register: registerComment,
        handleSubmit: handleregisterComment,
        formState: { errors: errorsComment }
    } = useForm({
        resolver: zodResolver(userSchema),
    });

    async function createCommentSubmit() {

    }

    useEffect(() => {
        const fetchCommentsWithUsers = async () => {
            try {
                const comments = await Promise.all(
                    news.comments.map(async (commentItem) => {
                        const { data } = await findUserById(commentItem.userId);
                        return {
                            ...commentItem,
                            username: data.username,
                        };
                    })
                );
                setCommentUsers(comments);
            } catch (error) {
                console.error("Erro ao buscar usuários para comentários:", error);
            }
        };

        fetchCommentsWithUsers();
    }, [news.comments]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeNewsModal();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        console.log(scrollToComments);
        if (isOpen && scrollToComments) {
            commentsRef.current?.scrollIntoView({ behavior: 'smooth' });
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, scrollToComments, closeNewsModal]);

    return (
        <ModalContainer>
            <ModalContent ref={modalRef} >
                <i className="close" onClick={closeNewsModal}><X /></i>
                <NewsBody>
                    <h2>{news.title}</h2>
                    <img src={news.banner} />
                    <p>{news.text}</p>
                </NewsBody>

                <hr />

                <NewsStatus>
                    <section className="like">
                        <i><Heart /></i>
                        <span>{news.likes?.length} {news.likes?.length === 1 ? "Curtida" : "Curtidas"}</span>
                    </section>
                    <section className="comment">
                        <i><MessageCircle /></i>
                        <span>{news.comments?.length} {news.comments?.length === 1 ? "Comentário" : "Comentários"}</span>
                    </section>
                </NewsStatus>

                <hr />

                <Comments>
                    <h3 ref={commentsRef}>Comentários</h3>
                    {commentUsers.length > 0 ?
                        commentUsers.map((commentItem) => (
                            <div key={commentItem.idComment}>
                                <p><strong>{commentItem.username || "Usuário desconhecido"}: </strong>{commentItem.comment}</p>
                            </div>
                        )) : (
                            <p>Nenhum comentário publicado.</p>
                        )
                    }
                    <form onSubmit={handleregisterComment(createCommentSubmit)}>
                        <Input
                            type="text"
                            placeholder="Adicione um comentário"
                            name="comment"
                            register={registerComment}
                        />
                        {errorsComment.comment && (
                            <ResponseSpan>{errorsComment.comment.message}</ResponseSpan>
                        )}
                        <Button
                            type="submit"
                            text={<SendHorizontal></SendHorizontal>}
                        />
                    </form>
                </Comments>
            </ModalContent>
        </ModalContainer>
    );
}