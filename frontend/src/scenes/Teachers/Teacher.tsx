import { Col, Container, Row } from "react-bootstrap";
import { useGetTeacherChildrenQuery, useGetTeacherDataQuery } from "../../api/teacherApi";
import { useParams } from "react-router-dom";
import { ITeacherChildrenResponse, ITeacherResponse } from "../../store/types";
import ScrollableList from "../../components/ScrollableList";

const Teacher = () => {
    const params = useParams();
    const paramsId = parseInt(params.id);
    const { data: teacher, error: teacherDataError, isLoading: isTeacherDataLoading } = useGetTeacherDataQuery(paramsId);
    const { data: children, error: teacherChildrenDataError, isLoading: isTeacherChildrenDataLoading } = useGetTeacherChildrenQuery(paramsId);

    const childrenListData = children
        ? children.map((childrenObject: ITeacherChildrenResponse) => (
            {"id": childrenObject.child_id, "name": childrenObject.child_name}
        ))
        : null;

    console.log(teacher)
    const header = teacher ? `Õpetaja ${teacher.full_name}` : "Õpetaja andmed";

    return (
        <>
            <Container className="background-title-container">
                <h2>{header}</h2>
            </Container>
            <Container className="background-container-theme">
                <Row>
                    <Col>
                        <p className="container-title">Õpetaja</p>
                    </Col>
                    <Col>
                        <ScrollableList header="Lapse nimetähed" data={childrenListData}></ScrollableList>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Teacher;