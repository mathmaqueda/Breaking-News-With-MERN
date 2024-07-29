import { zodResolver } from '@hookform/resolvers/zod';
import Cookies from 'js-cookie';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import logo from '../assets/img/LogoBN.png';
import { searchSchema } from '../Schemas/searchSchema.js';
import { userLogged } from '../services/user.services.js';
import Button from './Button.jsx';
import { ErrorSpan, ImageLogo, InputSpace, Nav, UserLoggedSpace } from './Navbar.styled.jsx';
import { LogOut } from 'lucide-react';

export default function Navbar() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: zodResolver(searchSchema)
    });

    const navigate = useNavigate();

    const [user, setUser] = useState({});

    function onSearch(data) {
        const { title } = data;

        navigate(`/search/${title}`);
        reset();
    }

    async function findUserLogged() {
        try {
            const res = await userLogged()
            setUser(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    function signout() {
        Cookies.remove('token');
        Cookies.remove('userId');
        setUser(undefined);
        navigate("/");
    }

    useEffect(() => {
        if (Cookies.get('token')) {
            findUserLogged();
        }
    }, [])

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

                {user ? (
                    <UserLoggedSpace>
                        <Link to="/profile">
                            <h2>{user.name}</h2>
                        </Link>
                        <i onClick={signout}><LogOut/></i>
                    </UserLoggedSpace>
                ) : (
                    <Link to="/auth">
                        <Button type="button" text="Entrar" />
                    </Link>
                )}

            </Nav>
            {errors.title && <ErrorSpan>{errors.title.message}</ErrorSpan>}
            <Outlet />
        </>
    );
}