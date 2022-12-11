import {Link, useParams} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {useGetSchoolChildrenByIdQuery, useGetSchoolTeachersByIdQuery} from "../../api/schoolTeachersApi";
import ScrollableList from "../../components/ScrollableList";
import "./css/School.scss"
import Loader from "../../components/Loader";

const School = () => {
    const params = useParams();
    const paramsId = parseInt(params.id);
    const { data: schoolTeachersData, isSuccess: isSchoolTeachersDataLoaded } = useGetSchoolTeachersByIdQuery({id: paramsId});
    const { data: schoolChildrenData, isSuccess: isSchoolChildrenDataLoaded } = useGetSchoolChildrenByIdQuery({id: paramsId});

    const header = isSchoolTeachersDataLoaded && schoolTeachersData ? `${schoolTeachersData[0].school_name}` : "Andmeid pole!";

    return (
        <>
            {isSchoolChildrenDataLoaded && isSchoolTeachersDataLoaded
                ?
                <>
                    <Container className="background-title-container">
                        <h2>{header}</h2>
                    </Container>
                    <Container className="background-container-theme">
                        <Row>
                            <Col className="container-left-column">
                                <p className="scrollable-list-subheader">Õpetajate nimekiri</p>
                                <ScrollableList header="Õpetajate nimed">
                                    {
                                        schoolTeachersData ? schoolTeachersData.map((entry: any) => (
                                            entry?.teacher_full_name != ''
                                                ? <div className="scrollable-list-data-row" key={"t" + entry.teacher_id}><Link to={`/teachers/${entry.start_year}/${entry.teacher_id}`}>{entry.teacher_full_name}</Link></div>
                                                : null
                                        )): <div>Andmed puuduvad</div>
                                    }
                                </ScrollableList>
                            </Col>
                            <Col className="container-right-column">
                                <p className="scrollable-list-subheader">Laste nimekiri</p>
                                <ScrollableList header="Lapse nimetähed">
                                    {
                                        schoolChildrenData ? schoolChildrenData.map((entry: any) => (
                                            entry?.name_code != ''
                                                ? <div className="scrollable-list-data-row" key={"c" + entry.child_id}><Link to={`/children/${entry.sheet_id}/${entry.child_id}`}>{entry.name_code}</Link></div>
                                                : null
                                        )): <div>Andmed puuduvad</div>
                                    }
                                </ScrollableList>
                            </Col>
                        </Row>
                    </Container>
                </>
                : <Loader></Loader>
            }
        </>
    )
}

export default School;