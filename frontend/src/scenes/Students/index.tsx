import ChildDataTable from "../../components/ChildDataTable";
import { Container } from "react-bootstrap";
import {useGetAllChildrenDataBySheetQuery, useGetAllPropertiesBySheetQuery} from "../../api/childPropertiesApi";
import Loader from "../../components/Loader";
import {useGetAllSheetsDataQuery} from "../../api/sheetApi";

const Students = () => {
    const { data: sheets, isSuccess: isSheetDataLoaded } = useGetAllSheetsDataQuery();
    const { data: childProperties, isSuccess: isChildPropsLoaded } = useGetAllChildrenDataBySheetQuery({sheetId: 1});
    const { data: properties, isSuccess: isPropsLoaded } = useGetAllPropertiesBySheetQuery({sheetId: 1});

    return (
        <>
            <Container className="background-title-container">
                <h2>Õpilaste andmed</h2>
            </Container>
            {isChildPropsLoaded && isPropsLoaded && isSheetDataLoaded ?
                <>
                    <Container className="background-container-theme">
                        <p className="data-type-text">Andmed: Kvantitatiivsed | Kvalitatiivsed</p>
                        <ChildDataTable headers={properties} data={childProperties} sheets={sheets} />
                    </Container>
                </>
                : <Loader></Loader>
            }
        </>
    )
}

export default Students;