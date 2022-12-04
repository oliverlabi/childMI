import Table from 'react-bootstrap/Table';
import './css/index.scss';
import {ChildDataTableProps} from "./types";

const ChildDataTable = ({headers, data, sheetsData}: ChildDataTableProps) => {
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
                {Object.values(data).map((dataDict, index) => {
                    return (
                        <tr className="data-table-body" key={dataDict as string + index}>
                            {Object.entries(dataDict).map((entry, index) => {
                                if(entry[0] === "0"){
                                    return <td className="data-year-column" key={entry[0] + entry[1] + index}>{entry[1][1]}</td>
                                }

                                return <td key={entry[0] + entry[1] + index}>{entry[1][1]}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default ChildDataTable;