import Table from 'react-bootstrap/Table';
import './css/index.scss';
import {ChildDataTableProps, filterDataType, parsedDataRow, parsedDataType} from "./types";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {SeasonEnums} from "../../utils/enums";
import SortDescLogo from '../../images/sort-desc.svg';
import SortAscLogo from '../../images/sort-asc.svg';
import SortDefLogo from '../../images/sort-def.svg'
import {Dropdown, Form} from "react-bootstrap";


const ChildDataTable = ({headers, data, sheetsData, filterHeaders, currentDataType}: ChildDataTableProps) => {
    const [sheetId, setSheetId] = useState("0");
    const [sortedData, setSortedData] = useState<parsedDataType>([]);
    const [filteredData, setFilteredData] = useState<parsedDataType>([]);
    const [currentFilters, setCurrentFilters] = useState<filterDataType[]>([]);
    const [sortingState] = useState({
        currentIndex: 0,
        direction: "desc",
    })

    const invalidFilters = currentFilters.length && Array.isArray(filteredData) && !filteredData.length;

    const refreshPage = () => {
        window.location.reload();
    }

    const handleSortClick = (headerIndex: number) => {
        if (sortingState.currentIndex === headerIndex) {
            sortingState.direction = sortingState.direction === "desc" ? "asc" : "desc";
            setSortedData(Object.values(sortedData).reverse());
            return;
        }

        setSortedData(Object.values(sortedData).sort(((a, b) => {
            sortingState.currentIndex = headerIndex;
            sortingState.direction = "desc";

            if (!a[headerIndex][1]) {
                return 0;
            }

            const isStringArray = typeof a[headerIndex][1] !== "string";

            if (isStringArray) {
                if (isNumeric(a[headerIndex][1][0])) {
                    const firstNumber = parseInt(a[headerIndex][1][0]);
                    const secondNumber = parseInt(b[headerIndex][1][0])

                    if (firstNumber > secondNumber) {
                        return -1;
                    }

                    if (secondNumber > firstNumber) {
                        return 1;
                    }

                    return 0;
                }

                return a[headerIndex][1][0].localeCompare(b[headerIndex][1][0])
            }

            if (isNumeric(a[headerIndex][1])) {
                const firstNumber = parseInt(a[headerIndex][1]);
                const secondNumber = parseInt(b[headerIndex][1])

                if (firstNumber > secondNumber) {
                    return 1;
                }

                if (secondNumber > firstNumber) {
                    return -1;
                }

                return 0;
            }

            return a[headerIndex][1].localeCompare(b[headerIndex][1])
        })));
    }

    const handleFilterClick = (dropdownIndexCode: string, dropdownLabel: string | string[]) => {
        const newFilterData = {label: dropdownLabel, indexes: dropdownIndexCode};
        const contains = currentFilters.some(elem => {
            return JSON.stringify(newFilterData) === JSON.stringify(elem);
        });

        if (contains) {
            const arrayWithoutFilter = currentFilters.filter(elem => {
                return JSON.stringify(newFilterData) !== JSON.stringify(elem);
            })

            setCurrentFilters(arrayWithoutFilter);
            return;
        }

        setCurrentFilters([...currentFilters, newFilterData]);
    }

    const handleFilterLogic = () => {
        let allFilteredDataRows: parsedDataType;

        allFilteredDataRows = Object.values(data).filter((originalData => {
            return filterLogic(originalData);
        }));

        setFilteredData(allFilteredDataRows);
    }

    type categoryCheckType = {
        [id: number]: boolean[];
    }

    const filterLogic = (row: parsedDataRow) => {
        const currentBooleans: categoryCheckType = {};

        currentFilters.forEach(filter => {
            let rowLabel;

            const filterIndexes = filter.indexes.split("-");
            const categoryIndex = parseInt(filterIndexes[0]);

            const isArray = Array.isArray(Object.values(row[categoryIndex])[1]);

            if (!isArray) {
                rowLabel = Object.values(row[categoryIndex])[1];
            } else {
                rowLabel = Object.values(row[categoryIndex])[1][0];
            }

            if (!currentBooleans[categoryIndex]) {
                currentBooleans[categoryIndex] = [];
            }

            if (filter.label !== rowLabel) {
                currentBooleans[categoryIndex].push(false);
            } else {
                currentBooleans[categoryIndex].push(true);
            }
        })

        for (const value in currentBooleans) {
            if (currentBooleans[value].includes(true)) {
                continue;
            }

            return false;
        }

        return true;
    }

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
        setSheetId(location.pathname.split("/")[3])
    }, [window.history]);

    useEffect(() => {
        setSortedData(Array.isArray(filteredData) && filteredData.length ? filteredData : data);
        sortingState.direction = "desc";
        sortingState.currentIndex = 0;
    }, [data, filteredData]);

    useEffect(() => {
        handleFilterLogic();
    }, [currentFilters, data])

    return (
        <>
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
                            const currentId = data && data[1]["id"];
                            const sheetSeason = data && data[1]["season"] === SeasonEnums.AUTUMN ? "sügis" : "kevad";
                            const sheetYear = data && data[1]["year"];
                            const sheetStartingYears = data && data[1]["starting_years"];
                            if (sheetId === currentId.toString()) {
                                return <tr className="data-year-column-active" key={data[0] + data[1]}>
                                    <td><Link to={`/children/${currentDataType}/${currentId}/`}>{`${sheetYear} ${sheetSeason} \n (${sheetStartingYears})`}</Link></td>
                                </tr>
                            }

                            return <tr className="data-year-column" key={data[0] + data[1]}>
                                <td onClick={refreshPage}><Link
                                    to={`/children/${currentDataType}/${currentId}/`}>{`${sheetYear} ${sheetSeason} \n (${sheetStartingYears})`}</Link></td>
                            </tr>
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
                                    ? <img src={showLogo()} onClick={() => handleSortClick(index)} alt={null}
                                           className="sort-logo"/>
                                    : <img src={SortDefLogo} onClick={() => handleSortClick(index)} alt={null}
                                           className="sort-logo"/>}
                                    {
                                        <Dropdown autoClose="outside">
                                            <Dropdown.Toggle className="filter-dropdown-toggle"
                                                             bsPrefix="custom-toggle">
                                                Filtreeri &#x25bd;
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="filter-dropdown-menu">
                                                {
                                                    Object.entries(filterHeaders).map((entry) => {
                                                        if (parseInt(entry[0]) === index) {
                                                            return Object.values(entry[1]).map((values, valueIndex) => {
                                                                return (
                                                                    <Form.Check
                                                                        id={`${index}-${valueIndex}`}
                                                                        key={`dropdown-form-check-${values}-${valueIndex}`}
                                                                        onClick={() => handleFilterClick(`${index}-${valueIndex}`, values)}
                                                                        label={values}
                                                                    />
                                                                )
                                                            })
                                                        }
                                                    })
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    }
                                </th>
                            }) : <th>No headers data</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {invalidFilters
                            ?
                            <td colSpan={headers.length} className="data-filter-error">
                                Andmed filtritega puuduvad!
                            </td>
                            : Object.entries(sortedData).map((dataDict, index) => {
                                return (
                                    <tr className="table-row" key={dataDict[1] as string + index}>
                                        {Object.entries(dataDict[1]).map((entry, index) => {
                                            if (index === 0) {
                                                return <td className="data-clickable-column"
                                                           key={entry[0] + entry[1] + index}><Link
                                                    to={`/children/${currentDataType}/${sheetId}/${entry[1][1][1]}`}>{entry[1][1][0]}</Link>
                                                </td>
                                            }

                                            if (index === 1) {
                                                return <td className="data-clickable-column"
                                                           key={entry[0] + entry[1] + index}><Link
                                                    to={`/schools/${entry[1][1][1]}`}>{entry[1][1][0]}</Link></td>
                                            }

                                            if (index === 2) {
                                                return <td className="data-clickable-column"
                                                           key={entry[0] + entry[1] + index}><Link
                                                    to={`/teachers/${entry[1][1][1]}`}>{entry[1][1][0]}</Link></td>
                                            }

                                            return <td key={entry[0] + entry[1] + index}>{entry[1][1]}</td>
                                        })}
                                    </tr>
                                )
                            })
                        }
                        </tbody>
                    </Table>
                </div>
            </div>
            <div className="student-counter">
                <p>
                    Andmeridade arv: {
                    invalidFilters
                        ? 0
                        : Object.keys(sortedData)?.length
                    }
                </p>
            </div>
        </>
    )
}

export default ChildDataTable;