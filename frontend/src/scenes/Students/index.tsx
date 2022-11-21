import DataTable from "../../components/DataTable";
import { Container } from "react-bootstrap";
import { useGetAllChildDataQuery } from "../../api/childPropertiesApi";

const Students = () => {
    const { data: students } = useGetAllChildDataQuery()
    return (
        <>
            <Container className="background-title-container">
                <h1>Õpilaste andmed</h1>
            </Container>
            <Container className="background-container-theme">
                <p className="data-type-text">Andmed: Kvantitatiivsed | Kvalitatiivsed</p>
                <DataTable columns={[]} rows={[]} />
            </Container>
        </>
    )
}

export default Students;