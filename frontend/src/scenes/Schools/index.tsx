import { useGetAllSchoolDataQuery } from "../../api/schoolApi";
import ScrollableList from "../../components/ScrollableList";
import {Container} from "react-bootstrap";

type schoolObjectType = {
    name: string[]
}

const Schools = () => {
    const { data: schools } = useGetAllSchoolDataQuery()
    const schoolData = schools ? schools.map((schoolObject: schoolObjectType) => schoolObject.name) : null;

    return (
        <>
            <Container className="background-title-container">
                <h1>Koolid</h1>
            </Container>
            <Container className="background-container-theme">
                <h3 className="container-title">Koolide nimekiri</h3>
                <ScrollableList header="Kooli nimi" data={schoolData}></ScrollableList>
            </Container>
        </>
    )
}

export default Schools;