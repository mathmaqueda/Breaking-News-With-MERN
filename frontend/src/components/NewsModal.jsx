import { Heart, HeartOff, MessageCircle, SendHorizontal, Trash2, X } from "lucide-react";
import { Comments, ModalContainer, ModalContent, NewsBody, NewsStatus } from "./NewsModal.styled";
import { useEffect, useRef, useState } from "react";
import { findUserById } from "../services/user.services";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commentSchema } from "../Schemas/userSchema.js";
import { ResponseSpan } from "./Navbar.styled.jsx";
import { addComment, deleteComment, getNewsById, likeOrDislike } from "../services/news.services.js";
import Cookies from "js-cookie";

export default function NewsModal({ updateNews, news, isOpen, closeNewsModal, scrollToComments, profile = false }) {
    const [commentUsers, setCommentUsers] = useState([]);
    const modalRef = useRef();
    const commentsRef = useRef();
    const userLogged = Cookies.get("userId");
    const [localNews, setLocalNews] = useState(news);
    const [liked, setLiked] = useState(Array.isArray(localNews.likes) &&
        localNews.likes.find(like => like.userId === userLogged)
        ? true
        : false);

    const {
        register: registerComment,
        handleSubmit: handleregisterComment,
        reset,
        setValue,
        formState: { errors: errorsComment }
    } = useForm({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            comment: "",
        }
    });

    async function handleLikeOrDislike() {
        if (!profile) {
            try {
                if (!Cookies.get("token")) {
                    window.alert("Faça login para curtir ou comentar.");
                    return
                }

                const response = await likeOrDislike(localNews.id);
                fetchAndUpdateNewsData();

                if (response.data.message === "Liked") {
                    setLiked(true);
                } else if (response.data.message === "Disliked") {
                    setLiked(false);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    window.alert(error.response.data.message);
                } else {
                    console.error("Erro ao curtir:", error);
                }
            }
        }
    }

    async function addCommentSubmit(body) {
        try {
            if (!Cookies.get("token")) {
                window.alert("Faça login para curtir ou comentar.")
                return;
            }
            reset();
            await addComment(body, localNews.id);
            await fetchAndUpdateNewsData();
        } catch (e) {
            console.error("Erro ao salvar comentário:", e);
        }
    }

    async function deleteCommentSubmit(commentId) {
        if (window.confirm("Excluir comentário?")) {
            try {
                await deleteComment(localNews.id, commentId);
                await fetchAndUpdateNewsData();
            } catch (e) {
                console.error("Erro ao deletar comentário:", e);
            }
        }
    }

    const fetchAndUpdateNewsData = async () => {
        try {
            const { data } = await getNewsById(localNews.id);
            const updatedNews = data.news;
            updateNews();
            setLocalNews(updatedNews);

            const comments = await Promise.all(
                updatedNews.comments.map(async (commentItem) => {
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

    // get comments with users
    useEffect(() => {
        fetchAndUpdateNewsData();
    }, []);

    // do scroll and closing
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeNewsModal();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
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
                    <h2>{localNews.title}</h2>
                    <img src={localNews.banner} />
                    <p>{localNews.text}</p>
                </NewsBody>

                <hr />

                <NewsStatus>
                    <section onClick={handleLikeOrDislike} className="like">
                        <i>{liked ? (<HeartOff />) : (<Heart />)}</i>
                        <span>{localNews.likes?.length} {localNews.likes?.length === 1 ? "Curtida" : "Curtidas"}</span>
                    </section>
                    <section className="comment">
                        <i><MessageCircle /></i>
                        <span>{localNews.comments?.length} {localNews.comments?.length === 1 ? "Comentário" : "Comentários"}</span>
                    </section>
                </NewsStatus>

                <hr />

                <Comments>
                    <h3 ref={commentsRef}>Comentários</h3>
                    {commentUsers.length > 0 ?
                        commentUsers.map((commentItem) => (
                            <div key={commentItem.idComment}>
                                <p><strong>{commentItem.username || "Usuário desconhecido"}: </strong>{commentItem.comment}</p>
                                {commentItem.userId === Cookies.get("userId") && (<Trash2 onClick={() => deleteCommentSubmit(commentItem.idComment)} />)}
                            </div>
                        )) : (
                            <p>Nenhum comentário publicado.</p>
                        )
                    }
                    {errorsComment.comment && (
                        <ResponseSpan>{errorsComment.comment.message}</ResponseSpan>
                    )}
                    {!profile && (
                        <form onSubmit={handleregisterComment(addCommentSubmit)}>
                            <Input
                                type="text"
                                placeholder="Adicione um comentário"
                                name="comment"
                                setValue={setValue}
                                register={registerComment}
                            />
                            <Button
                                type="submit"
                                text={<SendHorizontal></SendHorizontal>}
                            />
                        </form>
                    )}
                </Comments>
            </ModalContent>
        </ModalContainer>
    );
}