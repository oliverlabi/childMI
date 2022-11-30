import DataTable from "../../components/DataTable";
import { Container } from "react-bootstrap";
import {useGetAllChildrenDataBySheetQuery, useGetAllPropertiesBySheetQuery} from "../../api/childPropertiesApi";

const Students = () => {
    const { data: childProperties, isSuccess: isChildPropsLoaded, isLoading: isChildPropsLoading } = useGetAllChildrenDataBySheetQuery({sheetId: 2});
    const { data: properties, isSuccess: isPropsLoaded, isLoading: isPropsLoading } = useGetAllPropertiesBySheetQuery({sheetId: 2});

    return (
        <>
            {isChildPropsLoaded && isPropsLoaded ?
                <>
                    <Container className="background-title-container">
                        <h2>Õpilaste andmed</h2>
                    </Container>
                    <Container className="background-container-theme">
                        <p className="data-type-text">Andmed: Kvantitatiivsed | Kvalitatiivsed</p>
                        <DataTable headers={properties} data={childProperties} />
                    </Container>
                </>
                : <>Andmete lugemise viga!</>
            }
        </>
    )
}

export default Students;