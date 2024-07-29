import { zodResolver } from '@hookform/resolvers/zod';
import { Search } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/img/LogoBN.png';
import { ErrorSpan, ImageLogo, InputSpace, Nav } from './Navbar.styled.jsx';
import Button from './Button.jsx';
import { searchSchema } from '../Schemas/searchSchema.js';

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

                <Link to="/auth">
                    <Button type="button" text="Entrar" />
                </Link>
            </Nav>
            {errors.title && <ErrorSpan>{errors.title.message}</ErrorSpan>}
            <Outlet />
        </>
    );
}