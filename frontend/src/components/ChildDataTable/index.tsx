import Table from 'react-bootstrap/Table';
import {ChildDataTableProps, dataType, headerType, parsedDataType, sheetType} from "./types";
import './css/index.scss';
import {SeasonEnums} from "../../utils/sheetDataMapping";

const insertPropertiesData = (parsedData: parsedDataType, dict: dataType) => {
    if (parsedData[dict["child_id"]] === undefined){
        parsedData[dict["child_id"]] = {};
    }

    parsedData[dict["child_id"]][dict["property_id"]] = dict["child_property_value"];
}

const insertYearlyData = (sheets: sheetType[], index: number, parsedData: parsedDataType, dict: dataType) => {
    const sheet = sheets[index];

    const sheetSeason = sheet && sheet["season"] === SeasonEnums.AUTUMN ? "sügis" : "kevad";

    if(sheet && !parsedData[dict["child_id"]][0]){
        parsedData[dict["child_id"]][0] = `${sheet["year"]} ${sheetSeason}`;
    } else if (parsedData[dict["child_id"]][0] === undefined){
        parsedData[dict["child_id"]][0] = null;
    }
}

const insertNullCells = (parsedData: parsedDataType, headers: headerType[]) => {
    Object.entries(parsedData).map((dict) => {
        for(let i = headers[0]["id"]; i<headers.length + headers[0]["id"]; i++){
            if(dict[1][i] === undefined){
                dict[1][i] = null;
            }
        }
    })
}

const ChildDataTable = ({headers, data, sheets}: ChildDataTableProps) => {
    const parsedData: parsedDataType = {};

    data.forEach((dict: dataType, index) => {
        insertPropertiesData(parsedData, dict);
        insertYearlyData(sheets, index, parsedData, dict);
    })

    insertNullCells(parsedData, headers);

    return (
        <Table responsive>
            <thead>
                <tr className="data-table-header">
                    {sheets
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