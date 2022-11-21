import './css/index.scss';

type ScrollableListProps = {
    header: string,
    data: any[]
}

const ScrollableList = ({header, data}: ScrollableListProps) => {
    return (
        <>
            <div className="scrollable-list">
                <p className="scrollable-list-data-header">{header}</p>
                <div className="scrollable-list-data-container">
                    {
                        data ? data.map((value) => (
                            value != ''
                                ? <div className="scrollable-list-data-row" key={value}>{value}</div>
                                : null
                        )): <div>Andmeid puuduvad</div>
                    }
                </div>
            </div>
        </>
    )
}

export default ScrollableList;