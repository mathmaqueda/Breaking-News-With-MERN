import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import { ProfileActions, ProfileAvatar, ProfileBackground, ProfileContainer, ProfileHeader, ProfileIconAdd, ProfileIconEdit, ProfilePosts, ProfileUser } from "./Profile.styled";
import { Edit, PlusCircle } from "lucide-react";
import { getAllNewsByUser } from "../../services/news.services";
import Card from "../../components/Card";

export default function Profile() {
    const { user } = useContext(UserContext);
    const [news, setNews] = useState([]);

    async function findAllNewsByUser() {
        try {
            const newsResponse = await getAllNewsByUser();
            setNews(newsResponse.data.results);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        findAllNewsByUser();
    }, []);

    return (
        <ProfileContainer>
            <ProfileHeader>
                <ProfileIconEdit>
                    <Edit />
                </ProfileIconEdit>

                <ProfileBackground src={user.background} alt="" />

                <ProfileUser>
                    <ProfileAvatar src={user.avatar} alt="Foto do Usuário" />
                    <h2>{user.name}</h2>
                    <h3>{user.username}</h3>
                </ProfileUser>

                <ProfileActions>
                    <ProfileIconAdd>
                        <PlusCircle />
                    </ProfileIconAdd>
                </ProfileActions>
            </ProfileHeader>

            <ProfilePosts>
                {news.length === 0 && (
                    <h3>Você ainda não criou nenhuma notícia...</h3>
                )}
                {news.map((item) => {
                    return (
                        <Card
                            key={item.id}
                            title={item.title}
                            text={item.text}
                            banner={item.banner}
                            background={item.background}
                            likes={item.likes}
                            comments={item.comments}
                        />
                    );
                })}
            </ProfilePosts>
        </ProfileContainer>
    );
}