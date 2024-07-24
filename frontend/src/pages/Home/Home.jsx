import Card from "../../components/Card";
import Navbar from "../../components/Navbar";
import { news } from '../../Datas';
import { getAllNews } from "../../services/news.services";
import { HomeBody } from "./Home.styled";

export default function Home() {

    function findAllNews() {
        const res = getAllNews();
        console.log(res);
    }

    findAllNews();

    return (
        <>
            <Navbar />
            <HomeBody>
                {news.map((item, index) => {
                    return <Card key={index} news={item} />
                })}
            </HomeBody>
        </>
    );
}