export type ChildDataTableProps = {
    headers: headerType[],
    data: dataType[],
    sheets: sheetType[],
}

export type headerType = {
    id: number,
    name: string,
}

export type dataType = {
    child_id: number,
    child_property_value: string,
    property_id: number,
    child_name_code: string,
}

export type sheetType = {
    id: number,
    year: number,
    season: number,
    type: number
}