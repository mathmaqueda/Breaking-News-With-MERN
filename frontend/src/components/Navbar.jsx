import {Button, Nav, InputSpace, ImageLogo} from './Navbar.styled.jsx';
import logo from '../assets/img/LogoBN.png';
import { Search } from 'lucide-react';
import { Outlet } from 'react-router-dom';

export default function Navbar() {
    return (
        <>
            <Nav>
                <InputSpace>
                    <i>
                        <Search className='icon' size={18} />
                    </i>
                    <input type="text" placeholder='Pesquisar notícias' />
                </InputSpace>
                <ImageLogo src={logo} alt="Breaking News" />
                <Button>Entrar</Button>
            </Nav>
            <Outlet/>
        </>
    );
}