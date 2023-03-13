import ChildDataTable from "../../components/ChildDataTable";
import {Container, Nav} from "react-bootstrap";
import {
    useGetAllChildrenPropertiesDataBySheetQuery,
    useGetAllPropertiesBySheetQuery
} from "../../api/childPropertiesApi";
import Loader from "../../components/Loader";
import {useGetAllSheetsDataByTypeQuery, useGetFirstSheetWithDifferentTypeQuery} from "../../api/sheetApi";
import {useGetAllChildrenDataBySheetQuery} from "../../api/childApi";
import {parsedDataType} from "../../components/ChildDataTable/types";
import {
    IAllChildrenDataBySheetResponse,
    IAllChildrenPropertiesDataBySheetResponse,
    IAllCommentsBySheetIdResponse,
    IAllPropertiesBySheetResponse,
    IChildrenTeachersAndSchoolsBySheetIdResponse,
} from "../../api/apiResponseTypes";
import {ChildDataHeaders, ChildDataHeadersOriginal, CommentHeader} from "../../utils/customHeaders";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {useGetAllChildrenTeachersAndSchoolsBySheetIdQuery} from "../../api/teacherChildrenApi";
import {useGetAllCommentsBySheetIdQuery} from "../../api/commentApi";
import "./css/index.scss"
import {SheetTypeEnums} from "../../utils/enums";

const insertPropertiesData = (parsedData: parsedDataType, dict: IAllChildrenPropertiesDataBySheetResponse) => {
    if (parsedData[dict["child_id"]] === undefined){
        parsedData[dict["child_id"]] = {};
    }

    parsedData[dict["child_id"]][dict["property_id"]] = dict["child_property_value"];
}

const insertCommentData = (parsedData: parsedDataType, dict: IAllChildrenPropertiesDataBySheetResponse, commentData: IAllCommentsBySheetIdResponse[], highestHeaderId: number) => {
    const currentChildComment = commentData.filter(obj => obj.child_id === dict["child_id"]);
    if (parsedData[dict["child_id"]] === undefined){
        parsedData[dict["child_id"]] = {};
    }

    parsedData[dict["child_id"]][highestHeaderId] = currentChildComment[0]?.comment;
}

const insertNullCells = (parsedData: parsedDataType, headers: IAllPropertiesBySheetResponse[]) => {
    Object.entries(parsedData).map((dict) => {
        for(let i = headers[ChildDataHeaders.length]["id"]; i<headers.length + headers[ChildDataHeaders.length]["id"]; i++){
            if(dict[1][i] === undefined){
                dict[1][i] = null;
            }
        }
    })
}

const insertChildrenData = (parsedData: parsedDataType, dict: IAllChildrenPropertiesDataBySheetResponse, highestHeaderId: number, childData: IAllChildrenDataBySheetResponse[], schoolTeachersData: IChildrenTeachersAndSchoolsBySheetIdResponse[]) => {
    const currentChildId = dict["child_id"];
    const currentChildData = childData.filter(obj => obj.id === currentChildId)
    const currentChildTeacherAndSchoolData = schoolTeachersData.filter(obj => obj.child_id === currentChildId)

    parsedData[dict["child_id"]][highestHeaderId + 1] = [currentChildData[0]?.id.toString(), currentChildId.toString()];
    parsedData[dict["child_id"]][highestHeaderId + 2] = [currentChildTeacherAndSchoolData[0]?.school_name, currentChildTeacherAndSchoolData[0]?.school_id.toString()];
    parsedData[dict["child_id"]][highestHeaderId + 3] = [currentChildTeacherAndSchoolData[0]?.teacher_full_name, currentChildTeacherAndSchoolData[0]?.teacher_id.toString()];
    parsedData[dict["child_id"]][highestHeaderId + 4] = currentChildData[0]?.age.toString();
    parsedData[dict["child_id"]][highestHeaderId + 5] = currentChildData[0]?.gender;
    parsedData[dict["child_id"]][highestHeaderId + 6] = currentChildData[0]?.special_need;
}

const addChildHeaders = (headers: IAllPropertiesBySheetResponse[]) => {
    const newHeaders =  JSON.parse(JSON.stringify(headers));

    const currentIndex = headers.length;
    ChildDataHeaders.forEach((childHeader: {id: number, name: string}, index) => {
        const currentHeaderId = ChildDataHeadersOriginal[index]["id"] + 1;
        childHeader["id"] = currentIndex + currentHeaderId;

        newHeaders.unshift(childHeader);
    })

    return newHeaders;
}

const shiftLastCellsFirst = (parsedData: parsedDataType) => {
    Object.entries(parsedData).map((data) => {
        const childId = data[0] as unknown as number;
        const dataArray = Object.entries(data[1]);
        const splicedData = dataArray.splice(dataArray.length - ChildDataHeaders.length, dataArray.length);
        // @ts-ignore
        return parsedData[childId] = [...splicedData, ...dataArray]
    });
}

const getFilterHeaders = (parsedData: parsedDataType) => {
    const filterHeaders: any = {};

    Object.values(parsedData).map((data) => {
        Object.entries(data).map((filteredData) => {
            if (!filterHeaders[filteredData[0]]) {
                filterHeaders[filteredData[0]] = [];
            }

            if (filteredData[1][1]) {
                if ((filterHeaders[filteredData[0]].includes(filteredData[1][1][0]) || filterHeaders[filteredData[0]].includes(filteredData[1][1]))) {
                    return;
                }

                if (filteredData[1][1] && !Array.isArray(filteredData[1][1])) {
                    filterHeaders[filteredData[0]].push(filteredData[1][1]);
                    return;
                }

                filterHeaders[filteredData[0]].push(filteredData[1][1][0]);
            }
        })
    })

    return filterHeaders;
}

const Students = () => {
    const searchValue = useRef("");
    const [searchData, setSearchData] = useState({});
    const [sheetId, setSheetId] = useState(0);
    const currentSheetType = location.pathname.split("/")[2] === "qv" ? SheetTypeEnums.QUANTITATIVE : SheetTypeEnums.QUALITATIVE;
    const parsedParam = parseInt(String(sheetId))
    const sheetsData = useGetAllSheetsDataByTypeQuery({type: currentSheetType});
    const firstDifferentTypeSheet = useGetFirstSheetWithDifferentTypeQuery({type: currentSheetType});
    const childrenPropertiesData = useGetAllChildrenPropertiesDataBySheetQuery({sheetId: parsedParam});
    const childrenData = useGetAllChildrenDataBySheetQuery({sheetId: parsedParam});
    const propsData = useGetAllPropertiesBySheetQuery({sheetId: parsedParam});
    const childrenTeachersAndSchoolsData = useGetAllChildrenTeachersAndSchoolsBySheetIdQuery({sheetId: parsedParam});
    const commentData = useGetAllCommentsBySheetIdQuery({sheetId: parsedParam});

    const handleSearchValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        searchValue.current = event.target.value;
    }

    const handleSearch = () => {
        setSearchData(Object.values(parsedData).filter((data) => {
            return Object.values(data).some(values => values[1] && typeof values[1] !== "string"
                ? (values[1] as string[]).some((value: string) => value.toLowerCase() === searchValue.current.toLowerCase())
                : typeof values[1] === "string" && values[1]
                    ? (values[1] as string).toLowerCase() === searchValue.current.toLowerCase()
                    : false)
        }))
    }

    useEffect(() => {
        if((sheetId === 0 || isNaN(sheetId)) && sheetsData.isSuccess){
            const sheetDataTypeText = currentSheetType === 0 ? "qv" : "ql"
            setSheetId(sheetsData.data[0].id);
            window.history.replaceState(null, null, `/children/${sheetDataTypeText}/${sheetsData.data[0].id}/`)
        }
    }, [sheetsData.isSuccess])

    useEffect(() => {
        const newSheetId = location.pathname.split("/")[3]
        setSheetId(parseInt(newSheetId));
    }, [])

    const parsedData: parsedDataType = {};
    let headers;

    if(childrenPropertiesData.isSuccess && propsData.isSuccess && sheetsData.isSuccess && childrenData.isSuccess && childrenTeachersAndSchoolsData.isSuccess && commentData.isSuccess && firstDifferentTypeSheet.isSuccess) {
        const commentHeaderLength = 1;
        const highestHeaderId = Math.max(...propsData.data.map((o: IAllPropertiesBySheetResponse) => o.id)) + commentHeaderLength
        headers = addChildHeaders(propsData.data);
        headers.push({id: propsData.data.length + commentHeaderLength, name: CommentHeader});

        childrenPropertiesData.data.forEach((dict: IAllChildrenPropertiesDataBySheetResponse) => {
            insertPropertiesData(parsedData, dict);
            insertCommentData(parsedData, dict, commentData.data, highestHeaderId);
            insertChildrenData(parsedData, dict, highestHeaderId, childrenData.data, childrenTeachersAndSchoolsData.data);
        })

        insertNullCells(parsedData, headers);

        shiftLastCellsFirst(parsedData);
    }

    const filterHeaders = getFilterHeaders(Object.keys(searchData)?.length ? searchData : parsedData);

    return (
        <>
            <Container className="background-title-container">
                <h2>Õpilaste andmed</h2>
            </Container>
            {childrenPropertiesData.isSuccess && propsData.isSuccess && sheetsData.isSuccess && childrenData.isSuccess && childrenTeachersAndSchoolsData.isSuccess && commentData.isSuccess && firstDifferentTypeSheet.isSuccess ?
                <>
                    <Container className="background-container-theme">
                        <div className="div-container">
                            <div className="data-type-choice">
                                <Nav className="data-type-choice-nav">
                                    <Nav.Item>
                                        <Nav.Link disabled={currentSheetType === SheetTypeEnums.QUANTITATIVE} href={`/children/qv/${firstDifferentTypeSheet.data[0].id}/`}>
                                            Kvantitatiivsed
                                        </Nav.Link>
                                    </Nav.Item>
                                    |
                                    <Nav.Item>
                                        <Nav.Link disabled={currentSheetType === SheetTypeEnums.QUALITATIVE} href={`/children/ql/${firstDifferentTypeSheet.data[0].id}/`}>
                                            Kvalitatiivsed
                                        </Nav.Link>
                                    </Nav.Item>

                                </Nav>
                            </div>
                            <div className="data-search-field">
                                <p><input type="text" onChange={handleSearchValueChange} placeholder="Sisesta otsingusõna..."></input></p>
                                <button onClick={handleSearch}>Otsi</button>
                            </div>
                        </div>
                        <ChildDataTable
                            headers={headers}
                            data={Object.keys(searchData)?.length ? searchData : parsedData}
                            sheetsData={sheetsData.data}
                            filterHeaders={filterHeaders}
                            currentDataType={currentSheetType === SheetTypeEnums.QUANTITATIVE ? "qv" : "ql"}
                        />
                    </Container>
                </>
                : <Loader></Loader>
            }
        </>
    )
}

export default Students;