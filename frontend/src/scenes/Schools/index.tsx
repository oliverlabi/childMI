import { useGetAllSchoolDataQuery } from "../../api/schoolApi";
import ScrollableList from "../../components/ScrollableList";
import { Container } from "react-bootstrap";

const Schools = () => {
    const { data: schools } = useGetAllSchoolDataQuery()

    return (
        <>
            <Container className="background-title-container">
                <h2>Koolid</h2>
            </Container>
            <Container className="background-container-theme">
                <h3 className="container-title">Koolide nimekiri</h3>
                <ScrollableList header="Kooli nimi" data={schools}></ScrollableList>
            </Container>
        </>
    )
}

export default Schools;