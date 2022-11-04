import DataTable from "../../components/DataTable";
import { Container } from "react-bootstrap";

const Students = () => {
    return (
        <>
            <Container id="background-title-container">
                <h1>Õpilaste andmed</h1>
            </Container>
            <Container id="background-container-theme">
                <p>Andmed: Kvantitatiivsed | Kvalitatiivsed</p>
                <DataTable columns={[]} rows={[]} />
            </Container>
        </>
    )
}

export default Students;