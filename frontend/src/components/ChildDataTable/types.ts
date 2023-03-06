import {
    IAllPropertiesBySheetResponse, IAllSheetsDataResponse
} from "../../api/apiResponseTypes";

export type ChildDataTableProps = {
    headers: IAllPropertiesBySheetResponse[],
    data: parsedDataType,
    sheetsData: IAllSheetsDataResponse[],
    filterHeaders: parsedDataType,
}

export type filterDataType = {
    label: string | string[],
    indexes: string
}

export type parsedDataType = {
    [id: number]: parsedDataRow
}

export type parsedDataRow = {
    [id: number]: string | string[]
}