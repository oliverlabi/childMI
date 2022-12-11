import { Col, Container, Row } from "react-bootstrap";
import { useGetTeacherChildrenQuery, useGetTeacherDataQuery } from "../../api/teacherApi";
import {Link, useParams} from "react-router-dom";
import ScrollableList from "../../components/ScrollableList";
import "./css/Teacher.scss";
import Loader from "../../components/Loader";
import {useGetTeacherSchoolsByFullNameQuery} from "../../api/schoolTeachersApi";
import {ITeacherSchoolsByFullNameResponse} from "../../api/apiResponseTypes";

type ListDataField = {
    id: number,
    name: string,
}

const Teacher = () => {
    const params = useParams();
    const paramsId = parseInt(params.id);
    const paramsYear = parseInt(params.year);
    const { data: teacher, isSuccess: isTeacherDataLoaded } = useGetTeacherDataQuery({year: paramsYear, id: paramsId});
    const { data: children, isSuccess: isTeacherChildrenDataLoaded } = useGetTeacherChildrenQuery({year: paramsYear, id: paramsId});
    const { data: teacherSchools, isSuccess: isTeacherSchoolsDataLoaded } = useGetTeacherSchoolsByFullNameQuery({fullName: teacher?.full_name.replace(" ", "")})

    const teacherSchoolsArray: string[] = [];
    const childrenListData = isTeacherChildrenDataLoaded
        ? children.map((childrenObject: any) => (
            {"id": childrenObject.child_id, "name": childrenObject.child_name}
        ))
        : "No data";

    const header = isTeacherDataLoaded && teacher.full_name ? `Õpetaja ${teacher.full_name}` : "Andmeid pole!";
    const teacherName = isTeacherDataLoaded && teacher.full_name ? teacher.full_name : "Puudu";
    const teacherStartYear = isTeacherDataLoaded && teacher.start_year ? teacher.start_year : "Puudu";

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
                                <p className="teacher-start-year">Alustusaasta:</p>
                                <p className="teacher-school">Kool/Koolid:</p>
                            </Col>
                            <Col className="container-middle-column">
                                <p>{teacherName}</p>
                                <p>{teacherStartYear}</p>
                                {
                                    teacherSchools.map((school: ITeacherSchoolsByFullNameResponse) => {
                                        if(teacherSchoolsArray.includes(school.school_name)) {
                                            return;
                                        }

                                        teacherSchoolsArray.push(school.school_name);
                                        return <Link to={`/schools/${school.school_id}`} key={school.school_name}>{school?.school_name ? school.school_name : "Puudu"}</Link>
                                    })
                                }
                            </Col>
                            <Col className="container-right-column">
                                <ScrollableList header="Lapse nimetähed">
                                    {
                                        childrenListData ? childrenListData.map((entry: ListDataField) => (
                                            entry.name != ''
                                                ? <div className="scrollable-list-data-row" key={entry.id}><Link to={`${entry.id}`}>{entry.name}</Link></div>
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