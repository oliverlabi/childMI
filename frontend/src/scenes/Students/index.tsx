import DataTable from "../../components/DataTable";
import { Container } from "react-bootstrap";
import {useGetAllChildrenDataBySheetQuery, useGetAllPropertiesBySheetQuery} from "../../api/childPropertiesApi";
import Loader from "../../components/Loader";

const Students = () => {
    const { data: childProperties, isSuccess: isChildPropsLoaded } = useGetAllChildrenDataBySheetQuery({sheetId: 2});
    const { data: properties, isSuccess: isPropsLoaded } = useGetAllPropertiesBySheetQuery({sheetId: 2});

    return (
        <>
            <Container className="background-title-container">
                <h2>Õpilaste andmed</h2>
            </Container>
            {isChildPropsLoaded && isPropsLoaded ?
                <>
                    <Container className="background-container-theme">
                        <p className="data-type-text">Andmed: Kvantitatiivsed | Kvalitatiivsed</p>
                        <DataTable headers={properties} data={childProperties} />
                    </Container>
                </>
                : <Loader></Loader>
            }
        </>
    )
}

export default Students;