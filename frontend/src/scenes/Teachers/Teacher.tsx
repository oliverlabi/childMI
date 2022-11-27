import { Col, Container, Row } from "react-bootstrap";
import { useGetTeacherChildrenQuery, useGetTeacherDataQuery } from "../../api/teacherApi";
import {Link, useParams} from "react-router-dom";
import ScrollableList from "../../components/ScrollableList";
import "./css/Teacher.scss";

type ListDataField = {
    id: number,
    name: string,
}

const Teacher = () => {
    const params = useParams();
    const paramsId = parseInt(params.id);
    const paramsYear = parseInt(params.year);
    const { data: teacher, isLoading: isTeacherDataLoading } = useGetTeacherDataQuery({year: paramsYear, id: paramsId});
    const { data: children, isLoading: isTeacherChildrenDataLoading } = useGetTeacherChildrenQuery({year: paramsYear, id: paramsId});

    const childrenListData = !isTeacherChildrenDataLoading
        ? children.map((childrenObject: any) => (
            {"id": childrenObject.child_id, "name": childrenObject.child_name}
        ))
        : "No data";

    const header = !isTeacherDataLoading && teacher.full_name ? `Õpetaja ${teacher.full_name}` : "Andmeid pole!";
    const teacherName = !isTeacherDataLoading && teacher.full_name ? teacher.full_name : "Puudu";
    const teacherStartYear = !isTeacherDataLoading && teacher.start_year ? teacher.start_year : "Puudu";
    const teacherSchool = !isTeacherDataLoading && teacher.school_name ? teacher.school_name : "Puudu";

    return (
        <>
            {!isTeacherDataLoading && !isTeacherChildrenDataLoading ?
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
                                <Link to={`/schools/${teacher.school_id}`}>{teacherSchool}</Link>
                            </Col>
                            <Col className="container-right-column">
                                <ScrollableList header="Lapse nimetähed">
                                    {
                                        childrenListData ? childrenListData.map((entry: ListDataField) => (
                                            entry.name != ''
                                                ? <div className="scrollable-list-data-row" key={entry.id}><Link to={`${entry.id}`}>{entry.name}</Link></div>
                                                : null
                                        )): <div>Andmed puuduvad</div>
                                    }
                                </ScrollableList>
                            </Col>
                        </Row>
                    </Container>
                </> : <>Loading error!</>
            }
        </>
    )
}

export default Teacher;