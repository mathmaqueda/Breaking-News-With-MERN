import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { AddNewsContainer } from "./ManageNews.styled";
import { useForm } from "react-hook-form";
import { createNews, getNewsById } from "../../services/news.services";
import Input from "../../components/Input";
import { ErrorSpan } from "../../components/Navbar.styled";
import Button from "../../components/Button";
import { newsSchema } from "../../Schemas/newsSchema";
import { useEffect } from "react";

export default function ManageNews() {
    const { action, id } = useParams();
    const navigate = useNavigate();

    const {
        register: registerNews,
        handleSubmit: handleRegisterNews,
        formState: { errors: errorsRegisterNews },
    } = useForm({ resolver: zodResolver(newsSchema) });

    async function registerNewsSubmit(data) {
        try {
            await createNews(data);
            navigate("/profile");
        } catch (error) {
            console.log(error);
        }
    }

    async function editNewsSubmit() {
        // try {
        //     await editNews(data);
        //     Navigate("/profile");
        // } catch (error) {
        //     console.log(error);
        // }
    }

    async function findNewsById(id) {
        try {
            console.log(id)
            const {data} = await getNewsById(id);
            console.log(data.news);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (action === "edit") {
            findNewsById(id);
        }
    }, [])

    return (
        <AddNewsContainer>
            <h2>{action == "add" ? "Adicionar" : "Atualizar"} Notícia</h2>
            <form onSubmit={
                action == "add"
                    ? handleRegisterNews(registerNewsSubmit)
                    : handleRegisterNews(editNewsSubmit)
            }>
                <Input
                    type="text"
                    placeholder="Título"
                    name="title"
                    register={registerNews}
                    value={action !== "add" ? "title" : ""}
                />
                {errorsRegisterNews.title && (
                    <ErrorSpan>{errorsRegisterNews.title.message}</ErrorSpan>
                )}
                <Input
                    type="text"
                    placeholder="Link da imagem"
                    name="banner"
                    register={registerNews}
                    value={action !== "add" ? "banner" : ""}
                />
                {errorsRegisterNews.banner && (
                    <ErrorSpan>{errorsRegisterNews.banner.message}</ErrorSpan>
                )}
                <Input
                    type="text"
                    placeholder="Texto"
                    name="text"
                    register={registerNews}
                    isInput={false}
                    value={action !== "add" ? "text" : ""}
                />
                {errorsRegisterNews.text && (
                    <ErrorSpan>{errorsRegisterNews.text.message}</ErrorSpan>
                )}

                <Button type="submit" text={action === "add" ? "Adicionar" : "Atualizar"} />
            </form>
        </AddNewsContainer>
    );
}