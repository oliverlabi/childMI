import Table from 'react-bootstrap/Table';
import './css/index.scss';
import {ChildDataTableProps} from "./types";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {SeasonEnums} from "../../utils/sheetDataMapping";

const ChildDataTable = ({headers, data, sheetsData}: ChildDataTableProps) => {
    const [sheetId, setSheetId] = useState("0");

    const refreshPage = () => {
        window.location.reload();
    }

    useEffect(() => {
        setSheetId(location.pathname.split("/")[2])
    }, [window.history])

    return (
        <div className="two-tables">
            <div className="table-years">
                <Table responsive>
                    <thead className="table-yearly-column">
                        <tr className="table-header">
                            {sheetsData
                                ? <th className="data-year-column" key="data-year-column">Aasta</th>
                                : <th key="data-year-column">No yearly data</th>
                            }
                        </tr>
                    </thead>
                    <tbody className="table-yearly-column">
                        {Object.entries(sheetsData).map((data) => {
                            const currentId = parseInt(data[0]) + 1
                            const sheetSeason = data && data[1]["season"] === SeasonEnums.AUTUMN ? "sügis" : "kevad";
                            const sheetYear = data && data[1]["year"]

                            if(sheetId === currentId.toString()){
                                return <tr className="data-year-column-active" key={data[0] + data[1]}><td><Link to={`/children/${currentId}/`}>{`${sheetYear} ${sheetSeason}`}</Link></td></tr>
                            }

                            return <tr className="data-year-column" key={data[0] + data[1]} onClick={refreshPage}><td><Link to={`/children/${currentId}/`}>{`${sheetYear} ${sheetSeason}`}</Link></td></tr>
                        })}
                    </tbody>
                </Table>
            </div>
            <div className="table-data">
                <Table responsive>
                    <thead>
                        <tr className="table-header">
                            {headers ? headers.map(header => {
                                return <th id={header.name} key={`${header.id + header.name}`}>{header.name}</th>
                            }) : <th>No headers data</th>}
                        </tr>
                    </thead>
                    <tbody>
                    {Object.entries(data).map((dataDict, index) => {
                        return (
                            <tr className="table-row" key={dataDict[1] as string + index}>
                                {Object.entries(dataDict[1]).map((entry, index) => {

                                    if(index === 0){
                                        return <td className="data-clickable-column" key={entry[0] + entry[1] + index}><Link to={`/schools/${entry[1][1][1]}`}>{entry[1][1][0]}</Link></td>
                                    }

                                    if(index === 1){
                                            return <td className="data-clickable-column" key={entry[0] + entry[1] + index}><Link to={`/teachers/${entry[1][1][2]}/${entry[1][1][1]}`}>{entry[1][1][0]}</Link></td>
                                    }

                                    if(index === 2){
                                        return <td className="data-clickable-column" key={entry[0] + entry[1] + index}><Link to={`/children/${sheetId}/${dataDict[0][0]}`}>{entry[1][1]}</Link></td>
                                    }

                                    return <td key={entry[0] + entry[1] + index}>{entry[1][1]}</td>
                                })}
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ChildDataTable;