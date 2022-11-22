import "./css/index.scss";
import { Link } from "react-router-dom";

type ScrollableListProps = {
    header: string,
    data: listDataField[],
}

type listDataField = {
    id: number,
    name: string,
}

const ScrollableList = ({header, data}: ScrollableListProps) => {
    return (
        <>
            <div className="scrollable-list">
                <p className="scrollable-list-data-header">{header}</p>
                <div className="scrollable-list-data-container">
                    {
                        data ? data.map((entry) => (
                            entry.name != ''
                                ? <div className="scrollable-list-data-row" key={entry.id}><Link to={`${entry.id}`}>{entry.name}</Link></div>
                                : null
                        )): <div>Andmed puuduvad</div>
                    }
                </div>
            </div>
        </>
    )
}

export default ScrollableList;