import { useGetAllTeacherDataQuery } from "../../api/teacherApi";
import ScrollableList from "../../components/ScrollableList";
import { Container } from "react-bootstrap";

type teacherObjectType = {
    full_name: string[]
}


const Teachers = () => {
    const { data: teachers } = useGetAllTeacherDataQuery()
    const teachersData = teachers ? teachers.map((teacherObject: teacherObjectType) => teacherObject.full_name) : null;

    return (
        <>
            <Container className="background-title-container">
                <h1>Õpetajate andmed</h1>
            </Container>
            <Container className="background-container-theme">
                <h3 className="container-title">Õpetajate nimekiri</h3>
                <ScrollableList header="Õpetaja nimi" data={teachersData}></ScrollableList>
            </Container>
        </>
    )
}

export default Teachers;