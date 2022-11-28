import DataTable from "../../components/DataTable";
import { Container } from "react-bootstrap";
import {useGetAllChildrenDataBySheetQuery, useGetAllPropertiesBySheetQuery} from "../../api/childPropertiesApi";

const Students = () => {
    const { data: childProperties, isLoading: isChildPropsLoading } = useGetAllChildrenDataBySheetQuery({sheetId: 1});
    const { data: properties, isLoading: isPropsLoading } = useGetAllPropertiesBySheetQuery({sheetId: 1});

    console.log(childProperties, properties);

    return (
        <>
            <Container className="background-title-container">
                <h2>Õpilaste andmed</h2>
            </Container>
            <Container className="background-container-theme">
                <p className="data-type-text">Andmed: Kvantitatiivsed | Kvalitatiivsed</p>
                <DataTable headers={[]} data={[]} />
            </Container>
        </>
    )
}

export default Students;