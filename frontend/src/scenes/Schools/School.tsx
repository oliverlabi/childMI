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
    const usedTeacherNames: string[] = [];

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
                                        schoolTeachersData ? schoolTeachersData.map((entry: any) => {
                                            if (entry?.teacher_full_name == '' || !entry) {
                                                return;
                                            }

                                            if (usedTeacherNames.includes(entry.teacher_full_name)) {
                                                return;
                                            }

                                            usedTeacherNames.push(entry.teacher_full_name);

                                            return (<div className="scrollable-list-data-row" key={"t" + entry.teacher_id}>
                                                    <Link
                                                        to={`/teachers/${entry.teacher_id}`}>{entry.teacher_full_name}</Link>
                                                    </div>)
                                        }): <div>Andmed puuduvad</div>
                                    }
                                </ScrollableList>
                            </Col>
                            <Col className="container-right-column">
                                <p className="scrollable-list-subheader">Laste nimekiri</p>
                                <ScrollableList header="Õpilaste identifikaatorid">
                                    {
                                        schoolChildrenData ? schoolChildrenData.map((entry: any) => (
                                            entry?.child_id != ''
                                                ? <div className="scrollable-list-data-row" key={"c" + entry.child_id}><Link to={`/children/${entry.sheet_id}/${entry.child_id}`}>{entry.child_id}</Link></div>
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