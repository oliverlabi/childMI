import { useGetAllSchoolDataQuery } from "../../api/schoolApi";
import ScrollableList from "../../components/ScrollableList";
import { Container } from "react-bootstrap";
import {Link} from "react-router-dom";

const Schools = () => {
    const { data: schools } = useGetAllSchoolDataQuery()

    type ListDataField = {
        id: number,
        name: string,
    }

    return (
        <>
            <Container className="background-title-container">
                <h2>Koolid</h2>
            </Container>
            <Container className="background-container-theme">
                <h3 className="container-title">Koolide nimekiri</h3>
                <ScrollableList header="Kooli nimi">
                    {
                        schools ? schools.map((entry: ListDataField) => (
                            entry.name != ''
                                ? <div className="scrollable-list-data-row" key={entry.id}><Link to={`${entry.id}`}>{entry.name}</Link></div>
                                : null
                        )): <div>Andmed puuduvad</div>
                    }
                </ScrollableList>
            </Container>
        </>
    )
}

export default Schools;