import DataTable from "../../components/DataTable";
import { Container } from "react-bootstrap";

const Students = () => {
    return (
        <>
            <Container className="background-title-container">
                <h2>Õpilaste andmed</h2>
            </Container>
            <Container className="background-container-theme">
                <p className="data-type-text">Andmed: Kvantitatiivsed | Kvalitatiivsed</p>
                <DataTable columns={[]} rows={[]} />
            </Container>
        </>
    )
}

export default Students;