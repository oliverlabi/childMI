import ChildDataTable from "../../components/ChildDataTable";
import { Container } from "react-bootstrap";
import {useGetAllChildrenPropertiesDataBySheetQuery, useGetAllPropertiesBySheetQuery} from "../../api/childPropertiesApi";
import Loader from "../../components/Loader";
import {useGetAllSheetsDataQuery} from "../../api/sheetApi";
import {useGetAllChildrenDataBySheetQuery} from "../../api/childApi";
import {parsedDataType} from "../../components/ChildDataTable/types";
import {
    IAllChildrenDataBySheetResponse,
    IAllChildrenPropertiesDataBySheetResponse,
    IAllPropertiesBySheetResponse,
    IAllSheetsDataResponse
} from "../../api/apiResponseTypes";
import {SeasonEnums} from "../../utils/sheetDataMapping";
import {ChildDataHeaders} from "../../utils/customHeaders";
import {useParams} from "react-router-dom";

const insertPropertiesData = (parsedData: parsedDataType, dict: IAllChildrenPropertiesDataBySheetResponse) => {
    if (parsedData[dict["child_id"]] === undefined){
        parsedData[dict["child_id"]] = {};
    }

    parsedData[dict["child_id"]][dict["property_id"]] = dict["child_property_value"];
}

const insertYearlyData = (sheets: IAllSheetsDataResponse[], index: number, parsedData: parsedDataType, dict: IAllChildrenPropertiesDataBySheetResponse, highestHeaderId: number) => {
    const sheet = sheets[index];

    const sheetSeason = sheet && sheet["season"] === SeasonEnums.AUTUMN ? "sügis" : "kevad";

    if(sheet && !parsedData[dict["child_id"]][highestHeaderId + 1]){
        parsedData[dict["child_id"]][highestHeaderId + 1] = `${sheet["year"]} ${sheetSeason}`;
    } else if (parsedData[dict["child_id"]][highestHeaderId + 1] === undefined){
        parsedData[dict["child_id"]][highestHeaderId + 1] = null;
    }
}

const insertNullCells = (parsedData: parsedDataType, headers: IAllPropertiesBySheetResponse[]) => {
    Object.entries(parsedData).map((dict) => {
        for(let i = headers[4]["id"]; i<headers.length + headers[4]["id"]; i++){
            if(dict[1][i] === undefined){
                dict[1][i] = null;
            }
        }
    })
}

const insertChildrenData = (parsedData: parsedDataType, dict: IAllChildrenPropertiesDataBySheetResponse, headersLength: number, childData: IAllChildrenDataBySheetResponse[]) => {
    const currentChildId = dict["child_id"];
    const currentChildData = childData.filter(obj => obj.id === currentChildId)
    parsedData[dict["child_id"]][headersLength + 2] = currentChildData[0] && currentChildData[0].name_code;
    parsedData[dict["child_id"]][headersLength + 3] = currentChildData[0] && currentChildData[0].age.toString();
    parsedData[dict["child_id"]][headersLength + 4] = currentChildData[0] && currentChildData[0].gender;
    parsedData[dict["child_id"]][headersLength + 5] = currentChildData[0] && currentChildData[0].special_need;
}

const addChildHeaders = (headers: IAllPropertiesBySheetResponse[]) => {
    const newHeaders =  JSON.parse(JSON.stringify(headers));

    ChildDataHeaders.forEach((childHeader, index) => {
        const currentIndex = headers.length + index;

        childHeader["id"] = currentIndex + 1;

        newHeaders.unshift(childHeader);
    })

    return newHeaders;
}

const shiftLastCellsFirst = (parsedData: parsedDataType) => {
    Object.entries(parsedData).map((data) => {
        const childId: string = data[0];
        const dataArray = Object.entries(data[1]);
        const splicedData = dataArray.splice(dataArray.length - ChildDataHeaders.length - 1, dataArray.length);
        // @ts-ignore
        return parsedData[childId] = [...splicedData, ...dataArray]
    });
}

const Students = () => {
    const { sheetId = 1 } = useParams();
    const parsedParam = parseInt(String(sheetId))
    const { data: sheetsData, isSuccess: isSheetDataLoaded } = useGetAllSheetsDataQuery();
    const { data: childPropertiesData, isSuccess: isChildPropsDataLoaded } = useGetAllChildrenPropertiesDataBySheetQuery({sheetId: parsedParam});
    const { data: childData, isSuccess: isChildDataLoaded } = useGetAllChildrenDataBySheetQuery({sheetId: parsedParam});
    const { data: propertiesData, isSuccess: isPropsDataLoaded } = useGetAllPropertiesBySheetQuery({sheetId: parsedParam});

    const parsedData: parsedDataType = {};
    let headers;

    if(isChildPropsDataLoaded && isPropsDataLoaded && isSheetDataLoaded && isChildDataLoaded) {
        const highestHeaderId = Math.max(...propertiesData.map((o: IAllPropertiesBySheetResponse) => o.id))
        headers = addChildHeaders(propertiesData);

        childPropertiesData.forEach((dict: IAllChildrenPropertiesDataBySheetResponse, index: number) => {
            insertPropertiesData(parsedData, dict);
            insertYearlyData(sheetsData, index, parsedData, dict, highestHeaderId);
            insertChildrenData(parsedData, dict, highestHeaderId, childData);
        })

        insertNullCells(parsedData, headers);

        shiftLastCellsFirst(parsedData);
    }

    return (
        <>
            <Container className="background-title-container">
                <h2>Õpilaste andmed</h2>
            </Container>
            {isChildPropsDataLoaded && isPropsDataLoaded && isSheetDataLoaded && isChildDataLoaded ?
                <>
                    <Container className="background-container-theme">
                        <p className="data-type-text">Andmed: Kvantitatiivsed | Kvalitatiivsed</p>
                        <ChildDataTable headers={headers} data={parsedData} sheetsData={sheetsData} />
                    </Container>
                </>
                : <Loader></Loader>
            }
        </>
    )
}

export default Students;