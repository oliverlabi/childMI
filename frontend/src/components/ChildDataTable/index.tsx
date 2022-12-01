import Table from 'react-bootstrap/Table';
import {ChildDataTableProps, dataType} from "./types";
import './css/index.scss';

const ChildDataTable = ({headers, data, sheets}: ChildDataTableProps) => {
    const parsedData: any = {};

    console.log(sheets);

    data.forEach((dict: dataType) => {
        if (parsedData[dict["child_id"]] === undefined){
            parsedData[dict["child_id"]] = {};
        }

        parsedData[dict["child_id"]][dict["property_id"]] = dict["child_property_value"]
    })

    Object.entries(parsedData).map((dict: any) => {
        for(let i = headers[0]["id"]; i<headers.length + headers[0]["id"]; i++){
            if(dict[1][i] === undefined){
                dict[1][i] = null;
            }
        }
    })

    return (
        <Table responsive>
            <thead>
                <tr className="data-table-header">
                    <th className="data-year-column">Aasta</th>
                    {headers ? headers.map(header => {
                        return <th id={header.name} key={`${header.id + header.name}`}>{header.name}</th>
                    }) : <th>No headers data</th>}
                </tr>
            </thead>
            <tbody>
                {Object.values(parsedData).map((dataDict) => {
                    return (
                        <tr className="data-table-body">
                            <td className="data-year-column">2020</td>
                            {Object.entries(dataDict).map((entry, index) => {
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