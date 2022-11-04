import './css/NavBar.scss';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
    return (
        <>
            <Navbar>
                    <Navbar.Brand>Lastekeele korpuse haldusliides</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/students">Õpilased</Nav.Link>
                        <Nav.Link href="/teachers">Õpetajad</Nav.Link>
                        <Nav.Link href="/schools">Koolid</Nav.Link>
                    </Nav>
            </Navbar>
        </>
    )
}

export default NavBar;