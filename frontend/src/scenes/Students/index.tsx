import ChildDataTable from "../../components/ChildDataTable";
import { Container } from "react-bootstrap";
import {useGetAllChildrenPropertiesDataBySheetQuery, useGetAllPropertiesBySheetQuery} from "../../api/childPropertiesApi";
import Loader from "../../components/Loader";
import {useGetAllSheetsDataQuery} from "../../api/sheetApi";
import {useGetAllChildrenDataBySheetQuery} from "../../api/childApi";

const Students = () => {
    const sheetId = 1;

    const { data: sheetsData, isSuccess: isSheetDataLoaded } = useGetAllSheetsDataQuery();
    const { data: childPropertiesData, isSuccess: isChildPropsDataLoaded } = useGetAllChildrenPropertiesDataBySheetQuery({sheetId: sheetId});
    const { data: childData, isSuccess: isChildDataLoaded } = useGetAllChildrenDataBySheetQuery({sheetId: sheetId});
    const { data: propertiesData, isSuccess: isPropsDataLoaded } = useGetAllPropertiesBySheetQuery({sheetId: sheetId});

    return (
        <>
            <Container className="background-title-container">
                <h2>Õpilaste andmed</h2>
            </Container>
            {isChildPropsDataLoaded && isPropsDataLoaded && isSheetDataLoaded && isChildDataLoaded ?
                <>
                    <Container className="background-container-theme">
                        <p className="data-type-text">Andmed: Kvantitatiivsed | Kvalitatiivsed</p>
                        <ChildDataTable headers={propertiesData} propertiesData={childPropertiesData} childData={childData} sheetsData={sheetsData} />
                    </Container>
                </>
                : <Loader></Loader>
            }
        </>
    )
}

export default Students;