import {
    useGetAllTeacherDataQuery,
} from "../../api/teacherApi";
import ScrollableList from "../../components/ScrollableList";
import { Container, Tab, Tabs } from "react-bootstrap";
import "./css/index.scss";
import {Link} from "react-router-dom";
import Loader from "../../components/Loader";

export type ListDataType = {
    id: number,
    full_name: string,
    start_year?: number,
}

const Teachers = () => {
    const { data: yearData, isSuccess: isSuccess } = useGetAllTeacherDataQuery();
    const years: number[] = [];

    !isSuccess ||
            yearData.forEach((data: any) => {
                if (!years.includes(data.start_year)){
                    years.push(data.start_year);
                }
            })

    return (
        <>
            <Container className="background-title-container">
                <h2>Õpetajate andmed</h2>
            </Container>
            {isSuccess
                ?
                    <Tabs
                        defaultActiveKey={yearData[0] ? yearData[0].start_year : "Pole andmeid"}
                        className="background-year-tabs"
                    >
                        {years.map(((year: number) => {
                            const startYear = year;

                            return(
                                <Tab eventKey={startYear} title={startYear} key={startYear}>
                                    <Container className="background-container-theme">
                                        <h5 className="container-title">{startYear} aasta andmetega õpetajad</h5>
                                        <ScrollableList header="Õpetaja nimi">
                                            {
                                                yearData ? yearData.map((entry: ListDataType) => (
                                                    entry.full_name != '' && entry.start_year == startYear
                                                        ? <div className="scrollable-list-data-row" key={entry.id}><Link to={`${entry.start_year}/${entry.id}`}>{entry.full_name}</Link></div>
                                                        : null
                                                )): <div>Andmed puuduvad</div>
                                            }
                                        </ScrollableList>
                                    </Container>
                                </Tab>
                            )
                        }))}
                    </Tabs>
                :
                <Loader></Loader>
            }

        </>
    )
}

export default Teachers;