import "./css/index.scss";
import {ReactElement} from "react";

type ScrollableListProps = {
    header: string,
    children?: ReactElement,
}

const ScrollableList = ({header, children}: ScrollableListProps) => {
    return (
        <>
            <div className="scrollable-list">
                <p className="scrollable-list-data-header">{header}</p>
                <div className="scrollable-list-data-container">
                    {children}
                </div>
            </div>
        </>
    )
}

export default ScrollableList;