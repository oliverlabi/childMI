import {
    IAllChildrenDataBySheetResponse,
    IAllChildrenPropertiesDataBySheetResponse,
    IAllPropertiesBySheetResponse, IAllSheetsDataResponse
} from "../../api/apiResponseTypes";

export type ChildDataTableProps = {
    headers: IAllPropertiesBySheetResponse[],
    propertiesData: IAllChildrenPropertiesDataBySheetResponse[],
    childData: IAllChildrenDataBySheetResponse[],
    sheetsData: IAllSheetsDataResponse[],
}

export type parsedDataType = {
    [id: number]: parsedDataRow
}

export type parsedDataRow = {
    [id: number]: string
}