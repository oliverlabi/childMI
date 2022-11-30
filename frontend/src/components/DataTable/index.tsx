import Table from 'react-bootstrap/Table';
import './css/index.scss';

type DataTableProps = {
    headers: any[],
    data: any[]
}

const DataTable = ({headers, data}: DataTableProps) => {
    const parsedData: any = {};

    data.forEach((dict) => {
        if (parsedData[dict["child_id"]] === undefined){
            parsedData[dict["child_id"]] = {};
        }

        parsedData[dict["child_id"]][dict["property_id"]] = dict["child_property_value"]
    })

    return (
        <Table responsive>
            <thead>
                <tr className="data-table-header">
                    {headers ? headers.map(header => {
                        return <th id={header.id} key={`${header.id + header.name}`}>{header.name}</th>
                    }) : <th>No headers data</th>}
                </tr>
            </thead>
            <tbody>
                {Object.values(parsedData).map((dataDict) => {
                    return (
                        <tr>
                            {Object.entries(dataDict).map((entry) => {
                                return <td headers={entry[0]} key={entry[0] + entry[1]}>{entry[1]}</td>
                            })}
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    )
}

export default DataTable;