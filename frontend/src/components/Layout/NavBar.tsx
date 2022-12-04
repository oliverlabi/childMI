import './css/NavBar.scss';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import {useLocation} from "react-router-dom";

const NavBar = () => {
    const { pathname } = useLocation();
    const splitPath = `/${pathname.split("/")[1]}`;

    return (
        <>
            <Navbar expand="md">
                <Navbar.Brand>Lastekeele korpuse haldusliides</Navbar.Brand>
                <Navbar.Toggle className="navbar-toggle"></Navbar.Toggle>
                <Navbar.Collapse role={undefined}>
                    <Nav className="justify-content-end" activeKey={splitPath}>
                        <Nav.Link href="/children">Õpilased</Nav.Link>
                        <Nav.Link href="/teachers">Õpetajad</Nav.Link>
                        <Nav.Link href="/schools">Koolid</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </>
    )
}

export default NavBar;