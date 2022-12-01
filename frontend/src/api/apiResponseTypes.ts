export interface IAllChildrenDataBySheetResponse {
    child_id: number,
    child_name_code: string,
    property_group_name: string,
    property_id: number,
    child_property_value: string
}

export interface IAllPropertiesBySheetResponse {
    id: number,
    name: string
}

export interface IAllChildPropertiesBySheetIdAndChildIdResponse {
    child_name_code: string,
    property_group_name: string,
    property_id: number,
    child_property_value: string
}

export interface IAllSheetsDataResponse {
    id: number,
    year: number,
    season: number,
    type: number
}

export interface IAllSchoolDataResponse {
    id: number,
    name: string
}

export interface ISchoolTeachersByIdResponse {
    teacher_id: number,
    start_year: number,
    teacher_full_name: string,
    school_id: number,
    school_name: string
}

export interface ISchoolChildrenByIdResponse {
    child_id: number,
    name_code: string,
    school_id: number
}

export interface IAllTeacherDataResponse {
    id: number,
    full_name: string,
    start_year: number
}

export interface IAllTeachersByYearResponse {
    id: number,
    full_name: string,
    start_year?: number
}

export interface ITeacherDataResponse {
    id: number,
    full_name: string,
    start_year: number,
    school_id: number,
    school_name: string
}

export interface ITeacherChildrenResponse {
    child_name: string,
    child_id: string
}

export interface IAllTeacherYearsResponse {
    start_year: number
}