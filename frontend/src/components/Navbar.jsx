import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import logo from '../assets/img/LogoBN.png';
import { Button, ErrorSpan, ImageLogo, InputSpace, Nav } from './Navbar.styled.jsx';

const searchSchema = z.object({
    title: z.string().min(1, { message: "A pesquisa não pode ser vazia" }).refine(value=> !/^\s*$/.test(value), {message: "A pesquisa não pode conter apenas espaços"}),
})

export default function Navbar() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(searchSchema)
    });
    
    const navigate = useNavigate();

    function onSearch(data) {
        const { title } = data;

        navigate(`/search/${title}`);
        reset();
    }

    function goAuth() {
        navigate("/auth");
    }

    return (
        <>
            <Nav>
                <form onSubmit={handleSubmit(onSearch)}>
                    <InputSpace>
                        <button type='submit'>
                            <i>
                                <Search className='icon' size={18} />
                            </i>
                        </button>
                        <input
                            {...register("title")}
                            type="text"
                            placeholder='Pesquisar notícias'
                        />
                    </InputSpace>
                </form>

                <Link to="/">
                    <ImageLogo src={logo} alt="Breaking News" />
                </Link>

                <Button onClick={goAuth}>Entrar</Button>
            </Nav>
            {errors.title && <ErrorSpan>{errors.title.message}</ErrorSpan>}
            <Outlet />
        </>
    );
}