import Table from 'react-bootstrap/Table';
import './css/index.scss';

type DataTableProps = {
    headers: any[],
    data: any[]
}

const DataTable = ({headers, data}: DataTableProps) => {
    console.log(data);

    return (
        <Table responsive>
            <thead>
                <tr className="data-table-header">
                    <th className="data-year-column">Aasta</th>
                    {headers ? headers.map(header => {
                        return <th id={header.id}>{header.name}</th>
                    }) : <th>No headers data</th>}
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="data-year-column">2020 sügis</td>
                </tr>
                <tr>
                    <td className="data-year-column">2021 kevad</td>
                </tr>
                <tr>
                    <td className="data-year-column">2021 sügis</td>
                </tr>
                <tr>
                    <td className="data-year-column">2021 sügis</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default DataTable;