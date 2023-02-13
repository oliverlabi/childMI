import Table from 'react-bootstrap/Table';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import './css/index.scss';
import {ChildDataTableProps, parsedDataType} from "./types";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {SeasonEnums} from "../../utils/sheetDataMapping";
import SortDescLogo from '../../images/sort-desc.svg';
import SortAscLogo from '../../images/sort-asc.svg';
import SortDefLogo from '../../images/sort-def.svg'

const ChildDataTable = ({headers, data, sheetsData}: ChildDataTableProps) => {
    const [sheetId, setSheetId] = useState("0");
    const [sortedData, setSortedData] = useState<parsedDataType>([])
    const [sortingState] = useState({
        currentIndex: 0,
        direction: "desc",
    })

    const refreshPage = () => {
        window.location.reload();
    }

    const handleSortClick = (headerIndex: number) => {
        if(sortingState.currentIndex === headerIndex) {
            sortingState.direction = sortingState.direction === "desc" ? "asc" : "desc";
            setSortedData(Object.values(sortedData).reverse());
            return;
        }

        setSortedData(Object.values(sortedData).sort(((a, b) => {
            sortingState.currentIndex = headerIndex;
            sortingState.direction = "desc";

            if(!a[headerIndex][1]){
                return 0;
            }

            if(typeof a[headerIndex][1] !== "string"){
                if(isNumeric(a[headerIndex][1][0])){
                    const firstNumber = parseInt(a[headerIndex][1][0]);
                    const secondNumber = parseInt(b[headerIndex][1][0])

                    if(firstNumber > secondNumber) {
                        return -1;
                    }

                    if(secondNumber > firstNumber) {
                        return 1;
                    }

                    return 0;
                }

                return a[headerIndex][1][0].localeCompare(b[headerIndex][1][0])
            }

            if(isNumeric(a[headerIndex][1])){
                const firstNumber = parseInt(a[headerIndex][1]);
                const secondNumber = parseInt(b[headerIndex][1])

                if(firstNumber > secondNumber) {
                    return 1;
                }

                if(secondNumber > firstNumber) {
                    return -1;
                }

                return 0;
            }

            return a[headerIndex][1].localeCompare(b[headerIndex][1])
        })));
    }

    const popover = (
        <Popover id="popover">
            <Popover.Header as="h3">Filter</Popover.Header>
            <Popover.Body>
                And here's some <strong>amazing</strong> content. It's very engaging.
                right?
            </Popover.Body>
        </Popover>
    );

    const isNumeric = (value: string): boolean => {
        return /^-?\d+$/.test(value);
    }

    const showLogo = (): string => {
        if (sortingState.direction === null) {
            return "";
        }

        if (sortingState.direction === "asc") {
            return SortAscLogo;
        }

        return SortDescLogo;
    }

    useEffect(() => {
        setSheetId(location.pathname.split("/")[2])
    }, [window.history]);

    useEffect(() => {
        setSortedData(data);
        sortingState.direction = "desc";
        sortingState.currentIndex = 0;
    }, [data]);

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

                            return <tr className="data-year-column" key={data[0] + data[1]}><td onClick={refreshPage}><Link to={`/children/${currentId}/`}>{`${sheetYear} ${sheetSeason}`}</Link></td></tr>
                        })}
                    </tbody>
                </Table>
            </div>
            <div className="table-data">
                <Table responsive>
                    <thead>
                        <tr className="table-header">
                            {headers ? headers.map((header, index) => {
                                return <th id={header.name} key={`${header.id + header.name}`}>
                                    {header.name} {index === sortingState.currentIndex
                                    ? <img src={showLogo()} onClick={() => handleSortClick(index)} alt={null} className="sort-logo"/>
                                    : <img src={SortDefLogo} onClick={() => handleSortClick(index)} alt={null} className="sort-logo"/>}
                                    {
                                        <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                                            <div>Filter</div>
                                        </OverlayTrigger>
                                    }
                                </th>
                            }) : <th>No headers data</th>}
                        </tr>
                    </thead>
                    <tbody>
                    {Object.entries(Object.values(sortedData)?.length ? sortedData : data).map((dataDict, index) => {
                        return (
                            <tr className="table-row" key={dataDict[1] as string + index}>
                                {Object.entries(dataDict[1]).map((entry, index) => {
                                    if(index === 0){
                                        return <td className="data-clickable-column" key={entry[0] + entry[1] + index}><Link to={`/children/${sheetId}/${entry[1][1][1]}`}>{entry[1][1][0]}</Link></td>
                                    }

                                    if(index === 1){
                                        return <td className="data-clickable-column" key={entry[0] + entry[1] + index}><Link to={`/schools/${entry[1][1][1]}`}>{entry[1][1][0]}</Link></td>
                                    }

                                    if(index === 2){
                                            return <td className="data-clickable-column" key={entry[0] + entry[1] + index}><Link to={`/teachers/${entry[1][1][1]}`}>{entry[1][1][0]}</Link></td>
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