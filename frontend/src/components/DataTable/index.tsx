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
                    <td>RH</td>
                    <td>KA</td>
                    <td>7</td>
                    <td>M</td>
                    <td>Ei</td>
                    <td>vene</td>
                    <td>vene, eesti</td>
                    <td>vene</td>
                </tr>
                <tr>
                    <td className="data-year-column">2021 kevad</td>
                    <td>JM</td>
                    <td>DB</td>
                    <td>7</td>
                    <td>N</td>
                    <td>Ei</td>
                    <td>vene, eesti</td>
                    <td>vene, eesti</td>
                    <td>eesti</td>
                </tr>
                <tr>
                    <td className="data-year-column">2021 sügis</td>
                    <td>KK</td>
                    <td>RMB</td>
                    <td>6</td>
                    <td>M</td>
                    <td>Ei</td>
                    <td>eesti</td>
                    <td>eesti</td>
                    <td>eesti</td>
                </tr>
                <tr>
                    <td className="data-year-column">2021 sügis</td>
                    <td>KK</td>
                    <td>RMB</td>
                    <td>6</td>
                    <td>M</td>
                    <td>Ei</td>
                    <td>eesti</td>
                    <td>eesti</td>
                    <td>eesti</td>
                </tr>
            </tbody>
        </Table>
    )
}

export default DataTable;