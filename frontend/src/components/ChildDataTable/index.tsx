import Table from 'react-bootstrap/Table';
import './css/index.scss';
import {ChildDataTableProps, parsedDataType} from "./types";
import {SeasonEnums} from "../../utils/sheetDataMapping";
import {
    IAllChildrenDataBySheetResponse,
    IAllChildrenPropertiesDataBySheetResponse,
    IAllPropertiesBySheetResponse,
    IAllSheetsDataResponse
} from "../../api/apiResponseTypes";
import {ChildDataHeaders} from "../../utils/customHeaders";

const insertPropertiesData = (parsedData: parsedDataType, dict: IAllChildrenPropertiesDataBySheetResponse) => {
    if (parsedData[dict["child_id"]] === undefined){
        parsedData[dict["child_id"]] = {};
    }

    parsedData[dict["child_id"]][dict["property_id"]] = dict["child_property_value"];
}

const insertYearlyData = (sheets: IAllSheetsDataResponse[], index: number, parsedData: parsedDataType, dict: IAllChildrenPropertiesDataBySheetResponse) => {
    const sheet = sheets[index];

    const sheetSeason = sheet && sheet["season"] === SeasonEnums.AUTUMN ? "sügis" : "kevad";

    if(sheet && !parsedData[dict["child_id"]][0]){
        parsedData[dict["child_id"]][0] = `${sheet["year"]} ${sheetSeason}`;
    } else if (parsedData[dict["child_id"]][0] === undefined){
        parsedData[dict["child_id"]][0] = null;
    }
}

const insertNullCells = (parsedData: parsedDataType, headers: IAllPropertiesBySheetResponse[]) => {
    Object.entries(parsedData).map((dict) => {
        for(let i = headers[0]["id"]; i<headers.length + headers[0]["id"]; i++){
            if(dict[1][i] === undefined){
                dict[1][i] = null;
            }
        }
    })
}

const insertChildrenData = (parsedData: parsedDataType, dict: IAllChildrenPropertiesDataBySheetResponse, headersLength: number, childData: IAllChildrenDataBySheetResponse[]) => {
    const currentChildId = dict["child_id"];
    const currentChildData = childData.filter(obj => obj.id === currentChildId)
    parsedData[dict["child_id"]][headersLength + 1] = currentChildData[0].name_code;
    parsedData[dict["child_id"]][headersLength + 2] = currentChildData[0].age.toString();
    parsedData[dict["child_id"]][headersLength + 3] = currentChildData[0].gender;
    parsedData[dict["child_id"]][headersLength + 4] = currentChildData[0].special_need === 0 ? "Ei" : "Jah";
}

const addChildHeaders = (headers: IAllPropertiesBySheetResponse[]) => {
    const newHeaders =  JSON.parse(JSON.stringify(headers));

    ChildDataHeaders.forEach((childHeader, index) => {
        const currentIndex = headers.length + index;

        childHeader["id"] = currentIndex + 1;

        newHeaders[currentIndex] = childHeader;
    })

    return newHeaders;
}

const ChildDataTable = ({headers, propertiesData, childData, sheetsData}: ChildDataTableProps) => {
    const parsedData: parsedDataType = {};

    const highestHeaderId = Math.max(...headers.map(o => o.id))
    headers = addChildHeaders(headers);

    propertiesData.forEach((dict: IAllChildrenPropertiesDataBySheetResponse, index) => {
        insertPropertiesData(parsedData, dict);
        insertYearlyData(sheetsData, index, parsedData, dict);
        insertChildrenData(parsedData, dict, highestHeaderId, childData);
    })

    insertNullCells(parsedData, headers);

    return (
        <Table responsive>
            <thead>
                <tr className="data-table-header">
                    {sheetsData
                        ? <th className="data-year-column" key="data-year-column">Aasta</th>
                        : <th key="data-year-column">No yearly data</th>
                    }
                    {headers ? headers.map(header => {
                        return <th id={header.name} key={`${header.id + header.name}`}>{header.name}</th>
                    }) : <th>No headers data</th>}
                </tr>
            </thead>
            <tbody>
                {Object.values(parsedData).map((dataDict, index) => {
                    return (
                        <tr className="data-table-body" key={dataDict as string + index}>
                            {Object.entries(dataDict).map((entry, index) => {
                                if(entry[0] === "0"){
                                    return <td className="data-year-column" key={entry[0] + entry[1] + index}>{entry[1]}</td>
                                }

                                return <td key={entry[0] + entry[1] + index}>{entry[1]}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default ChildDataTable;