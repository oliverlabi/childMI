import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import './css/index.scss';
import { Container } from "react-bootstrap";

const Layout = () => {
    return (
        <>
            <NavBar />
            <Container className="background">
                <Outlet />
            </Container>
        </>
    )
}

export default Layout;