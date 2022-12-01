import {Spinner} from "react-bootstrap";
import "./css/index.scss";

const Loader = () => {
    return (
        <Spinner animation="border" role="status" className="loader">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}

export default Loader;