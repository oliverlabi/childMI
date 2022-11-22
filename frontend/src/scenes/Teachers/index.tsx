import { useGetAllTeacherDataQuery } from "../../api/teacherApi";
import ScrollableList from "../../components/ScrollableList";
import { Container } from "react-bootstrap";
import { ITeacherResponse } from "../../store/types";


const Teachers = () => {
    const { data: teachers } = useGetAllTeacherDataQuery()
    const teacherListData = teachers
        ? teachers.map((teacherObject: ITeacherResponse) => (
            {"id": teacherObject.id, "name": teacherObject.full_name}
        ))
        : null;

    return (
        <>
            <Container className="background-title-container">
                <h2>Õpetajate andmed</h2>
            </Container>
            <Container className="background-container-theme">
                <h3 className="container-title">Õpetajate nimekiri</h3>
                <ScrollableList header="Õpetaja nimi" data={teacherListData}></ScrollableList>
            </Container>
        </>
    )
}

export default Teachers;