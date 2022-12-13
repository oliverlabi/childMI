import {
    useGetAllTeacherDataQuery,
} from "../../api/teacherApi";
import ScrollableList from "../../components/ScrollableList";
import { Container, Tab, Tabs } from "react-bootstrap";
import "./css/index.scss";
import {Link} from "react-router-dom";
import Loader from "../../components/Loader";
import {IAllTeacherYearsResponse} from "../../api/apiResponseTypes";

export type ListDataType = {
    id: number,
    full_name: string,
    year?: number,
}

const Teachers = () => {
    const { data: yearData, isSuccess: isSuccess } = useGetAllTeacherDataQuery();
    const years: number[] = [];

    !isSuccess ||
            yearData.forEach((data: IAllTeacherYearsResponse) => {
                if (!years.includes(data.year)){
                    years.push(data.year);
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
                        defaultActiveKey={yearData[0] ? yearData[0].year : "Pole andmeid"}
                        className="background-tabs"
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
                                                    entry.full_name != '' && entry.year == startYear
                                                        ? <div className="scrollable-list-data-row" key={entry.id}><Link to={`${entry.id}`}>{entry.full_name}</Link></div>
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