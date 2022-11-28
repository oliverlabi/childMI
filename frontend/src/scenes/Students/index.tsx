import DataTable from "../../components/DataTable";
import { Container } from "react-bootstrap";
import { useGetAllChildDataQuery } from "../../api/childPropertiesApi";

const Students = () => {
    const { data: childProperties, isLoading: isChildPropsLoading } = useGetAllChildDataQuery({sheetId: 1});

    console.log(childProperties);

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