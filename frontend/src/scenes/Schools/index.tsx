import { useGetAllSchoolDataQuery } from "../../api/schoolApi";
import ScrollableList from "../../components/ScrollableList";
import { Container } from "react-bootstrap";
import {Link} from "react-router-dom";
import Loader from "../../components/Loader";

const Schools = () => {
    const { data: schools, isSuccess: isSuccess } = useGetAllSchoolDataQuery()

    type ListDataField = {
        id: number,
        name: string,
    }

    return (
        <>
            <Container className="background-title-container">
                <h2>Koolid</h2>
            </Container>
            {isSuccess ?
                <Container className="background-container-theme">
                    <h5 className="container-title">Koolide nimekiri</h5>
                    <ScrollableList header="Kooli nimi">
                        {
                            schools ? schools.map((entry: ListDataField) => (
                                entry.name === '' ||
                                <div className="scrollable-list-data-row" key={entry.id}><Link to={`${entry.id}`}>{entry.name}</Link></div>
                            )) : <div>Andmed puuduvad</div>
                        }
                    </ScrollableList>
                </Container>
                : <Loader></Loader>
            }

        </>
    )
}

export default Schools;