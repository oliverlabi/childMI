import Table from 'react-bootstrap/Table';
import './css/index.scss';

type DataTableProps = {
    headers: string[],
    data: string[]
}

const DataTable = ({headers, data}: DataTableProps) => {
    console.log(headers, data);

    return (
        <Table responsive>
            <thead>
                <tr className="data-table-header">
                    <th className="data-year-column">Aasta</th>
                    <th>Õpetaja kood</th>
                    <th>Lapse kodeering</th>
                    <th>Vanus</th>
                    <th>Sugu</th>
                    <th>Erivajadus</th>
                    <th>Kodune keel / keeled</th>
                    <th>Kokkupuude keeltega</th>
                    <th>Mis keeli lapsega kodus räägitakse? (Ema, vanem 1)</th>
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