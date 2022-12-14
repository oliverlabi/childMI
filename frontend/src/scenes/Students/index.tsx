import ChildDataTable from "../../components/ChildDataTable";
import { Container } from "react-bootstrap";
import {useGetAllChildrenPropertiesDataBySheetQuery, useGetAllPropertiesBySheetQuery} from "../../api/childPropertiesApi";
import Loader from "../../components/Loader";
import {useGetAllSheetsDataQuery} from "../../api/sheetApi";
import {useGetAllChildrenDataBySheetQuery} from "../../api/childApi";
import {parsedDataType} from "../../components/ChildDataTable/types";
import {
    IAllChildrenDataBySheetResponse,
    IAllChildrenPropertiesDataBySheetResponse, IAllCommentsBySheetIdResponse,
    IAllPropertiesBySheetResponse, IChildrenTeachersAndSchoolsBySheetIdResponse,
} from "../../api/apiResponseTypes";
import {ChildDataHeaders, CommentHeader} from "../../utils/customHeaders";
import {useEffect, useState} from "react";
import {useGetAllChildrenTeachersAndSchoolsBySheetIdQuery} from "../../api/teacherChildrenApi";
import {useGetAllCommentsBySheetIdQuery} from "../../api/commentApi";

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

    parsedData[dict["child_id"]][highestHeaderId] = currentChildComment[0].comment;
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

    parsedData[dict["child_id"]][highestHeaderId + 1] = [currentChildTeacherAndSchoolData[0]?.school_name, currentChildTeacherAndSchoolData[0]?.school_id.toString()];
    parsedData[dict["child_id"]][highestHeaderId + 2] = [currentChildTeacherAndSchoolData[0]?.teacher_full_name, currentChildTeacherAndSchoolData[0]?.teacher_id.toString()];
    parsedData[dict["child_id"]][highestHeaderId + 3] = [currentChildId.toString(), currentChildData[0]?.name_code];
    parsedData[dict["child_id"]][highestHeaderId + 4] = currentChildData[0]?.age.toString();
    parsedData[dict["child_id"]][highestHeaderId + 5] = currentChildData[0]?.gender;
    parsedData[dict["child_id"]][highestHeaderId + 6] = currentChildData[0]?.special_need;
}

const addChildHeaders = (headers: IAllPropertiesBySheetResponse[]) => {
    const newHeaders =  JSON.parse(JSON.stringify(headers));

    ChildDataHeaders.forEach((childHeader, index) => {
        const currentIndex = headers.length + index;

        childHeader["id"] = currentIndex + 1;

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

const Students = () => {
    const [sheetId, setSheetId] = useState(0);
    const parsedParam = parseInt(String(sheetId))
    const sheetsData = useGetAllSheetsDataQuery();
    const childrenPropertiesData = useGetAllChildrenPropertiesDataBySheetQuery({sheetId: parsedParam});
    const childrenData = useGetAllChildrenDataBySheetQuery({sheetId: parsedParam});
    const propsData = useGetAllPropertiesBySheetQuery({sheetId: parsedParam});
    const childrenTeachersAndSchoolsData = useGetAllChildrenTeachersAndSchoolsBySheetIdQuery({sheetId: parsedParam});
    const commentData = useGetAllCommentsBySheetIdQuery({sheetId: parsedParam})

    useEffect(() => {
        if((sheetId === 0 || isNaN(sheetId)) && sheetsData.isSuccess){
            setSheetId(sheetsData.data[0].id);
            window.history.replaceState(null, null, `/children/${sheetsData.data[0].id}`)
        }
    }, [sheetsData.isSuccess])

    useEffect(() => {
        const sheetId = location.pathname.split("/")[2]
        sheetsData && setSheetId(parseInt(sheetId));
    }, [])

    const parsedData: parsedDataType = {};
    let headers;

    if(childrenPropertiesData.isSuccess && propsData.isSuccess && sheetsData.isSuccess && childrenData.isSuccess && childrenTeachersAndSchoolsData.isSuccess) {
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

    return (
        <>
            <Container className="background-title-container">
                <h2>Õpilaste andmed</h2>
            </Container>
            {childrenPropertiesData.isSuccess && propsData.isSuccess && sheetsData.isSuccess && childrenData.isSuccess && childrenTeachersAndSchoolsData.isSuccess ?
                <>
                    <Container className="background-container-theme">
                        <p className="data-type-text">Andmed: Kvantitatiivsed</p>
                        <ChildDataTable headers={headers} data={parsedData} sheetsData={sheetsData.data} />
                    </Container>
                </>
                : <Loader></Loader>
            }
        </>
    )
}

export default Students;