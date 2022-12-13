import { Col, Container, Row } from "react-bootstrap";
import { useGetTeacherChildrenQuery, useGetTeacherDataQuery } from "../../api/teacherApi";
import {Link, useParams} from "react-router-dom";
import ScrollableList from "../../components/ScrollableList";
import "./css/Teacher.scss";
import Loader from "../../components/Loader";
import {useGetTeacherSchoolsByIdQuery} from "../../api/schoolTeachersApi";
import {ITeacherSchoolsByIdResponse} from "../../api/apiResponseTypes";

type ListDataField = {
    id: number,
    name: string,
    sheet_id?: number,
    year?: number,
}

const Teacher = () => {
    const params = useParams();
    const paramsId = parseInt(params.id);
    const { data: teacher, isSuccess: isTeacherDataLoaded } = useGetTeacherDataQuery({id: paramsId});
    const { data: children, isSuccess: isTeacherChildrenDataLoaded } = useGetTeacherChildrenQuery({id: paramsId});
    const { data: teacherSchools, isSuccess: isTeacherSchoolsDataLoaded } = useGetTeacherSchoolsByIdQuery({id: teacher?.teacher_id})

    console.log(teacherSchools, teacher?.id, teacher)

    const teacherSchoolsArray: string[] = [];
    const childrenListData = isTeacherChildrenDataLoaded
        ? children.map((childrenObject: any) => (
            {"id": childrenObject.child_id, "name": childrenObject.child_name, "sheet_id": childrenObject.sheet_id, "year": childrenObject.year}
        ))
        : "No data";

    const header = isTeacherDataLoaded && teacher.full_name ? `Õpetaja ${teacher.full_name}` : "Andmeid pole!";
    const teacherName = isTeacherDataLoaded && teacher.full_name ? teacher.full_name : "Puudu";

    return (
        <>
            {isTeacherDataLoaded && isTeacherChildrenDataLoaded && isTeacherSchoolsDataLoaded ?
                <>
                    <Container className="background-title-container">
                        <h2>{header}</h2>
                    </Container>
                    <Container className="background-container-theme">
                        <Row>
                            <Col className="container-left-column">
                                <p className="teacher-name">Nimi:</p>
                                <p className="teacher-year">Aastad, mil leidub andmeid:</p>
                                <p className="teacher-school">Kool/Koolid:</p>
                            </Col>
                            <Col className="container-middle-column">
                                <p>{teacherName}</p>
                                <p>undeveloped</p>
                                {
                                    teacherSchools.map((school: ITeacherSchoolsByIdResponse) => {
                                        if(teacherSchoolsArray.includes(school.school_name)) {
                                            return;
                                        }

                                        teacherSchoolsArray.push(school.school_name);
                                        return <Link to={`/schools/${school.school_id}`} key={school.school_name}>{school?.school_name ? school.school_name : "Puudu"}</Link>
                                    })
                                }
                            </Col>
                            <Col className="container-right-column">
                                <ScrollableList header="Lapse nimekoodid">
                                    {
                                        childrenListData ? childrenListData.map((entry: ListDataField) => (
                                            entry.name != ''
                                                ? <div className="scrollable-list-data-row" key={entry.id}><Link to={`/children/${entry.sheet_id}/${entry.id}`}>{entry.name}</Link> ({entry.year})</div>
                                                : null
                                        )) : <div>Andmed puuduvad</div>
                                    }
                                </ScrollableList>
                            </Col>
                        </Row>
                    </Container>
                </> : <Loader></Loader>
            }
        </>
    )
}

export default Teacher;