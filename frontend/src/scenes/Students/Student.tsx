import {Container, Tabs, Tab} from "react-bootstrap";
import {useGetAllPropertiesByGroupsByChildIdQuery} from "../../api/propertyGroupApi";
import {useParams} from "react-router-dom";
import {IAllPropertiesByGroupsByChildIdResponse} from "../../api/apiResponseTypes";
import Loader from "../../components/Loader";
import "./css/Student.scss";
import {useGetChildDataBySheetAndIdQuery} from "../../api/childApi";
import {ChildDataHeaders, ChildDataPropertyGroup} from "../../utils/customHeaders";


const Student = () => {
    const params = useParams();
    const childId = parseInt(params.id);
    const sheetId = parseInt(params.sheetId);
    const propertiesWithGroupsData = useGetAllPropertiesByGroupsByChildIdQuery({childId: childId})
    const childData = useGetChildDataBySheetAndIdQuery({sheetId: sheetId, childId: childId})

    const propertyGroups: any = [];
    const reversedChildDataHeaders = ChildDataHeaders.slice().reverse();

    propertiesWithGroupsData.isSuccess && childData.isSuccess ?
    propertiesWithGroupsData.data.forEach((data: IAllPropertiesByGroupsByChildIdResponse, index: number) => {
        const propertyGroup: string = data.property_group_name.replace(/['`~!@#$%^&*_|+=;:".<>\[\]\\]/gi, '');
        const propertyName: string = data.property_name.replace(/['`~!@#$%^&*?_|+=;:".<>\[\]\\]/gi, '');
        const propertyValue: string = data.property_value.replace(/['`~!@#$%^&*?_|+=;:".<>\[\]\\]/gi, '');

        if (propertyGroups[ChildDataPropertyGroup] === undefined) {
            propertyGroups[ChildDataPropertyGroup] = {};
        }

        if (index === 0) {
            Object.values(childData.data[0]).map((data, index) => {

                if(index === 0){
                    return;
                }

                // Temporary until I add school and teacher data
                const childHeader = reversedChildDataHeaders[index - 1 + 2]["name"].replace(/['`~!@#$%^&*?_|+=;:".<>\[\]\\]/gi, '');
                propertyGroups[ChildDataPropertyGroup][childHeader] = data ? data : "Andmed puuduvad"
            })
        }

        if (propertyGroups[propertyGroup] === undefined) {
            propertyGroups[propertyGroup] = {};

        }

        if(propertyGroups[propertyGroup][propertyName] === undefined){
            propertyGroups[propertyGroup][propertyName] = propertyValue
        }
    }) : null

    const header = childData.isSuccess && childData.data[0]["name_code"] ? `Õpilase ${childData.data[0]["name_code"]} andmed` : "Õpilase nimi puudub";

    return (
        <>
            {propertiesWithGroupsData.isSuccess && childData.isSuccess ?
                <>
                    <Container className="background-title-container">
                        <h2>{header}</h2>
                    </Container>
                    <Tabs
                        defaultActiveKey={Object.keys(propertyGroups)[0] ? Object.keys(propertyGroups)[0] : "Pole andmeid"}
                        className="background-tabs"
                    >
                        {Object.entries(propertyGroups).map((entry) => {
                            return(
                                <Tab eventKey={entry[0]} title={entry[0]} key={entry[0]}>
                                    <Container className="background-container-theme">
                                        <h5 className="container-title">{entry[0]}</h5>
                                        {Object.entries(entry[1]).map((property) => {
                                            return <p key={property[0]}>{`${property[0]}: ${property[1]}` }</p>
                                        })}
                                    </Container>
                                </Tab>
                            )
                        })}
                    </Tabs>
                </> : <Loader></Loader>
            }
        </>
    )
}

export default Student