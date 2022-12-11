import {
    IAllPropertiesBySheetResponse, IAllSheetsDataResponse
} from "../../api/apiResponseTypes";

export type ChildDataTableProps = {
    headers: IAllPropertiesBySheetResponse[],
    data: parsedDataType,
    sheetsData: IAllSheetsDataResponse[],
}

export type parsedDataType = {
    [id: number]: parsedDataRow
}

export type parsedDataRow = {
    [id: number]: string | string[]
}