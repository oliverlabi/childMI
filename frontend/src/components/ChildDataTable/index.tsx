import Table from 'react-bootstrap/Table';
import './css/index.scss';
import {ChildDataTableProps} from "./types";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const ChildDataTable = ({headers, data, sheetsData}: ChildDataTableProps) => {
    const [sheetId, setSheetId] = useState("0");

    const refreshPage = () => {
        window.location.reload();
    }

    useEffect(() => {
        setSheetId(location.pathname.split("/")[2])
    }, [window.history])

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
                {Object.entries(data).map((dataDict, index) => {
                    return (
                        <tr className="data-table-body" key={dataDict[1] as string + index}>
                            {Object.entries(dataDict[1]).map((entry, index) => {
                                if(entry[0] === "0"){
                                    if(sheetId === dataDict[0]){
                                        return <td className="data-year-column-active" key={entry[0] + entry[1] + index}><Link to={`/children/${dataDict[index]}/`}>{entry[1][1]}</Link></td>
                                    }

                                    return <td className="data-year-column" key={entry[0] + entry[1] + index} onClick={refreshPage}><Link to={`/children/${dataDict[index]}/`}>{entry[1][1]}</Link></td>
                                }

                                if(index === 1){
                                    return <td className="data-clickable-column" key={entry[0] + entry[1] + index}><Link to={`/children/${sheetId}/${dataDict[0]}`}>{entry[1][1]}</Link></td>
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